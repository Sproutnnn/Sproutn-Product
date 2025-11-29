import { supabase } from '../lib/supabase';
import type { Tables, TablesInsert } from '../types/database.types';

export type SiteVisitor = Tables<'site_visitors'>;
export type SiteSession = Tables<'site_sessions'>;
export type SitePageView = Tables<'site_page_views'>;

export type SiteVisitorInsert = TablesInsert<'site_visitors'>;
export type SiteSessionInsert = TablesInsert<'site_sessions'>;
export type SitePageViewInsert = TablesInsert<'site_page_views'>;

// Date range for dashboard queries
export interface DateRange {
  startDate: string;
  endDate: string;
}

// Dashboard response types
export interface OverviewStats {
  totalVisits: number;
  uniqueVisitors: number;
  newVisitors: number;
  returningVisitors: number;
  bounceRate: number;
  avgSessionDuration: number;
  avgPagesPerSession: number;
}

export interface TrafficSource {
  source: string;
  visits: number;
  percentage: number;
}

export interface DailyTraffic {
  date: string;
  visits: number;
  newVisitors: number;
  returningVisitors: number;
}

// Tracking context from client
export interface TrackingContext {
  visitorCookieId: string;
  sessionCookieId: string;
  userId?: string;
  pagePath: string;
  pageUrl: string;
  pageTitle?: string;
  previousPagePath?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  deviceType?: string;
  browser?: string;
  os?: string;
  screenResolution?: string;
  isNewSession: boolean;
}

export const analyticsService = {
  // ==========================================
  // TRACKING FUNCTIONS
  // ==========================================

  /**
   * Get or create a visitor record
   */
  async getOrCreateVisitor(
    cookieId: string,
    context: Partial<TrackingContext>
  ): Promise<SiteVisitor> {
    // Try to find existing visitor
    const { data: existingVisitor } = await supabase
      .from('site_visitors')
      .select('*')
      .eq('visitor_cookie_id', cookieId)
      .single();

    if (existingVisitor) {
      // Update last_seen_at and increment visit count
      const { data: updatedVisitor, error } = await supabase
        .from('site_visitors')
        .update({
          last_seen_at: new Date().toISOString(),
          total_visits: existingVisitor.total_visits + 1
        })
        .eq('id', existingVisitor.id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return updatedVisitor;
    }

    // Create new visitor
    const newVisitor: SiteVisitorInsert = {
      visitor_cookie_id: cookieId,
      first_referrer: context.referrer || null,
      first_utm_source: context.utmSource || null,
      first_utm_medium: context.utmMedium || null,
      first_utm_campaign: context.utmCampaign || null,
      first_utm_term: context.utmTerm || null,
      first_utm_content: context.utmContent || null,
      first_landing_page: context.pagePath || null
    };

    const { data: createdVisitor, error } = await supabase
      .from('site_visitors')
      .insert(newVisitor)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return createdVisitor;
  },

  /**
   * Create a new session
   */
  async createSession(
    visitorId: string,
    context: TrackingContext
  ): Promise<SiteSession> {
    const referrerDomain = context.referrer
      ? this.extractDomain(context.referrer)
      : null;

    const newSession: SiteSessionInsert = {
      session_cookie_id: context.sessionCookieId,
      visitor_id: visitorId,
      user_id: context.userId || null,
      referrer: context.referrer || null,
      referrer_domain: referrerDomain,
      utm_source: context.utmSource || null,
      utm_medium: context.utmMedium || null,
      utm_campaign: context.utmCampaign || null,
      utm_term: context.utmTerm || null,
      utm_content: context.utmContent || null,
      landing_page: context.pagePath,
      device_type: context.deviceType || null,
      browser: context.browser || null,
      os: context.os || null,
      screen_resolution: context.screenResolution || null
    };

    const { data: createdSession, error } = await supabase
      .from('site_sessions')
      .insert(newSession)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return createdSession;
  },

  /**
   * Get existing session by cookie ID
   */
  async getSessionByCookieId(sessionCookieId: string): Promise<SiteSession | null> {
    const { data, error } = await supabase
      .from('site_sessions')
      .select('*')
      .eq('session_cookie_id', sessionCookieId)
      .single();

    if (error) return null;
    return data;
  },

  /**
   * Update session page count and exit page
   */
  async updateSession(sessionId: string, exitPage: string): Promise<void> {
    const { data: session } = await supabase
      .from('site_sessions')
      .select('page_view_count')
      .eq('id', sessionId)
      .single();

    if (session) {
      await supabase
        .from('site_sessions')
        .update({
          page_view_count: session.page_view_count + 1,
          exit_page: exitPage,
          is_bounce: false
        })
        .eq('id', sessionId);
    }
  },

  /**
   * Record a page view
   */
  async recordPageView(context: TrackingContext): Promise<void> {
    try {
      // Get or create visitor
      const visitor = await this.getOrCreateVisitor(context.visitorCookieId, context);

      let session: SiteSession | null = null;

      if (context.isNewSession) {
        // Create new session
        session = await this.createSession(visitor.id, context);
      } else {
        // Get existing session
        session = await this.getSessionByCookieId(context.sessionCookieId);

        if (session) {
          // Update session with new page
          await this.updateSession(session.id, context.pagePath);
        } else {
          // Session not found, create new one
          session = await this.createSession(visitor.id, context);
        }
      }

      // Create page view record
      const pageView: SitePageViewInsert = {
        session_id: session.id,
        visitor_id: visitor.id,
        user_id: context.userId || null,
        page_path: context.pagePath,
        page_url: context.pageUrl,
        page_title: context.pageTitle || null,
        previous_page_path: context.previousPagePath || null
      };

      await supabase.from('site_page_views').insert(pageView);
    } catch (error) {
      console.error('[Analytics] Failed to record page view:', error);
    }
  },

  /**
   * Link anonymous visitor to authenticated user
   */
  async linkVisitorToUser(visitorCookieId: string, userId: string): Promise<void> {
    try {
      // Update visitor record
      await supabase
        .from('site_visitors')
        .update({ user_id: userId })
        .eq('visitor_cookie_id', visitorCookieId);

      // Get visitor ID
      const { data: visitor } = await supabase
        .from('site_visitors')
        .select('id')
        .eq('visitor_cookie_id', visitorCookieId)
        .single();

      if (visitor) {
        // Update all sessions for this visitor
        await supabase
          .from('site_sessions')
          .update({ user_id: userId })
          .eq('visitor_id', visitor.id);

        // Update all page views for this visitor
        await supabase
          .from('site_page_views')
          .update({ user_id: userId })
          .eq('visitor_id', visitor.id);
      }
    } catch (error) {
      console.error('[Analytics] Failed to link visitor to user:', error);
    }
  },

  // ==========================================
  // DASHBOARD QUERY FUNCTIONS (Admin Only)
  // ==========================================

  /**
   * Get overview statistics for date range
   */
  async getOverviewStats(dateRange: DateRange): Promise<OverviewStats> {
    const startDate = `${dateRange.startDate}T00:00:00`;
    const endDate = `${dateRange.endDate}T23:59:59`;

    // Get all sessions in date range
    const { data: sessions, error } = await supabase
      .from('site_sessions')
      .select('id, visitor_id, is_bounce, duration_seconds, page_view_count')
      .gte('started_at', startDate)
      .lte('started_at', endDate);

    if (error) throw new Error(error.message);
    if (!sessions || sessions.length === 0) {
      return {
        totalVisits: 0,
        uniqueVisitors: 0,
        newVisitors: 0,
        returningVisitors: 0,
        bounceRate: 0,
        avgSessionDuration: 0,
        avgPagesPerSession: 0
      };
    }

    const totalVisits = sessions.length;
    const uniqueVisitorIds = new Set(sessions.map(s => s.visitor_id));
    const uniqueVisitors = uniqueVisitorIds.size;

    // Calculate bounce rate (sessions with only 1 page view)
    const bouncedSessions = sessions.filter(s => s.is_bounce === true || s.page_view_count === 1);
    const bounceRate = (bouncedSessions.length / totalVisits) * 100;

    // Calculate averages
    const totalDuration = sessions.reduce((sum, s) => sum + (s.duration_seconds || 0), 0);
    const totalPages = sessions.reduce((sum, s) => sum + (s.page_view_count || 1), 0);
    const avgSessionDuration = totalDuration / totalVisits;
    const avgPagesPerSession = totalPages / totalVisits;

    // Get new visitors (first seen in this date range)
    const { data: newVisitorData } = await supabase
      .from('site_visitors')
      .select('id')
      .in('id', Array.from(uniqueVisitorIds))
      .gte('first_seen_at', startDate)
      .lte('first_seen_at', endDate);

    const newVisitors = newVisitorData?.length || 0;
    const returningVisitors = uniqueVisitors - newVisitors;

    return {
      totalVisits,
      uniqueVisitors,
      newVisitors,
      returningVisitors,
      bounceRate: Math.round(bounceRate * 10) / 10,
      avgSessionDuration: Math.round(avgSessionDuration),
      avgPagesPerSession: Math.round(avgPagesPerSession * 10) / 10
    };
  },

  /**
   * Get traffic source breakdown
   */
  async getTrafficSourceBreakdown(dateRange: DateRange): Promise<TrafficSource[]> {
    const startDate = `${dateRange.startDate}T00:00:00`;
    const endDate = `${dateRange.endDate}T23:59:59`;

    const { data: sessions, error } = await supabase
      .from('site_sessions')
      .select('utm_source, utm_medium, referrer_domain')
      .gte('started_at', startDate)
      .lte('started_at', endDate);

    if (error) throw new Error(error.message);
    if (!sessions || sessions.length === 0) return [];

    // Categorize traffic sources
    const sourceMap = new Map<string, number>();

    sessions.forEach(session => {
      let source = 'Direct';

      if (session.utm_source) {
        source = session.utm_source;
      } else if (session.referrer_domain) {
        if (this.isSearchEngine(session.referrer_domain)) {
          source = 'Organic Search';
        } else if (this.isSocialNetwork(session.referrer_domain)) {
          source = 'Social';
        } else {
          source = 'Referral';
        }
      }

      sourceMap.set(source, (sourceMap.get(source) || 0) + 1);
    });

    const total = sessions.length;
    return Array.from(sourceMap.entries())
      .map(([source, visits]) => ({
        source,
        visits,
        percentage: Math.round((visits / total) * 1000) / 10
      }))
      .sort((a, b) => b.visits - a.visits);
  },

  /**
   * Get daily traffic trend
   */
  async getDailyTraffic(dateRange: DateRange): Promise<DailyTraffic[]> {
    const startDate = `${dateRange.startDate}T00:00:00`;
    const endDate = `${dateRange.endDate}T23:59:59`;

    // Get all sessions
    const { data: sessions, error } = await supabase
      .from('site_sessions')
      .select('started_at, visitor_id')
      .gte('started_at', startDate)
      .lte('started_at', endDate);

    if (error) throw new Error(error.message);
    if (!sessions || sessions.length === 0) return [];

    // Get visitor first seen dates
    const visitorIds = [...new Set(sessions.map(s => s.visitor_id))];
    const { data: visitors } = await supabase
      .from('site_visitors')
      .select('id, first_seen_at')
      .in('id', visitorIds);

    const visitorFirstSeen = new Map(
      visitors?.map(v => [v.id, v.first_seen_at.split('T')[0]]) || []
    );

    // Group by date
    const dailyMap = new Map<string, { visits: number; newVisitors: Set<string>; returningVisitors: Set<string> }>();

    sessions.forEach(session => {
      const date = session.started_at.split('T')[0];

      if (!dailyMap.has(date)) {
        dailyMap.set(date, { visits: 0, newVisitors: new Set(), returningVisitors: new Set() });
      }

      const day = dailyMap.get(date)!;
      day.visits++;

      // Check if new or returning
      const firstSeenDate = visitorFirstSeen.get(session.visitor_id);
      if (firstSeenDate === date) {
        day.newVisitors.add(session.visitor_id);
      } else {
        day.returningVisitors.add(session.visitor_id);
      }
    });

    // Convert to array sorted by date
    return Array.from(dailyMap.entries())
      .map(([date, data]) => ({
        date,
        visits: data.visits,
        newVisitors: data.newVisitors.size,
        returningVisitors: data.returningVisitors.size
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  },

  /**
   * Get top pages by views
   */
  async getTopPages(dateRange: DateRange, limit: number = 10): Promise<Array<{ page: string; views: number }>> {
    const startDate = `${dateRange.startDate}T00:00:00`;
    const endDate = `${dateRange.endDate}T23:59:59`;

    const { data: pageViews, error } = await supabase
      .from('site_page_views')
      .select('page_path')
      .gte('viewed_at', startDate)
      .lte('viewed_at', endDate);

    if (error) throw new Error(error.message);
    if (!pageViews || pageViews.length === 0) return [];

    // Count views per page
    const pageMap = new Map<string, number>();
    pageViews.forEach(pv => {
      pageMap.set(pv.page_path, (pageMap.get(pv.page_path) || 0) + 1);
    });

    return Array.from(pageMap.entries())
      .map(([page, views]) => ({ page, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, limit);
  },

  // ==========================================
  // UTILITY FUNCTIONS
  // ==========================================

  /**
   * Extract domain from URL
   */
  extractDomain(url: string): string | null {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace('www.', '');
    } catch {
      return null;
    }
  },

  /**
   * Check if domain is a search engine
   */
  isSearchEngine(domain: string): boolean {
    const searchEngines = ['google', 'bing', 'yahoo', 'duckduckgo', 'baidu', 'yandex'];
    return searchEngines.some(se => domain.toLowerCase().includes(se));
  },

  /**
   * Check if domain is a social network
   */
  isSocialNetwork(domain: string): boolean {
    const socialNetworks = ['facebook', 'twitter', 'linkedin', 'instagram', 'pinterest', 'tiktok', 'reddit', 'x.com'];
    return socialNetworks.some(sn => domain.toLowerCase().includes(sn));
  }
};
