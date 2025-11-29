-- Site Traffic Analytics Tables
-- Migration: 011_create_analytics_tables.sql

-- 1. Site Visitors - Persistent visitor identity
CREATE TABLE site_visitors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_cookie_id VARCHAR(64) NOT NULL UNIQUE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  first_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  total_visits INTEGER NOT NULL DEFAULT 1,
  first_referrer TEXT,
  first_utm_source VARCHAR(255),
  first_utm_medium VARCHAR(255),
  first_utm_campaign VARCHAR(255),
  first_utm_term VARCHAR(255),
  first_utm_content VARCHAR(255),
  first_landing_page TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Site Sessions - Session tracking for bounce rate and journeys
CREATE TABLE site_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_cookie_id VARCHAR(64) NOT NULL UNIQUE,
  visitor_id UUID NOT NULL REFERENCES site_visitors(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  duration_seconds INTEGER,
  page_view_count INTEGER NOT NULL DEFAULT 1,
  is_bounce BOOLEAN,
  referrer TEXT,
  referrer_domain VARCHAR(255),
  utm_source VARCHAR(255),
  utm_medium VARCHAR(255),
  utm_campaign VARCHAR(255),
  utm_term VARCHAR(255),
  utm_content VARCHAR(255),
  landing_page TEXT NOT NULL,
  exit_page TEXT,
  device_type VARCHAR(20),
  browser VARCHAR(50),
  os VARCHAR(50),
  screen_resolution VARCHAR(20),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Site Page Views - Individual page tracking
CREATE TABLE site_page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES site_sessions(id) ON DELETE CASCADE,
  visitor_id UUID NOT NULL REFERENCES site_visitors(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  page_path VARCHAR(500) NOT NULL,
  page_url TEXT,
  page_title VARCHAR(500),
  previous_page_path VARCHAR(500),
  time_on_page_seconds INTEGER,
  viewed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for query performance

-- Visitor lookups
CREATE INDEX idx_site_visitors_cookie_id ON site_visitors(visitor_cookie_id);
CREATE INDEX idx_site_visitors_user_id ON site_visitors(user_id);
CREATE INDEX idx_site_visitors_first_seen ON site_visitors(first_seen_at);

-- Session queries
CREATE INDEX idx_site_sessions_cookie_id ON site_sessions(session_cookie_id);
CREATE INDEX idx_site_sessions_visitor_id ON site_sessions(visitor_id);
CREATE INDEX idx_site_sessions_started_at ON site_sessions(started_at);
CREATE INDEX idx_site_sessions_is_bounce ON site_sessions(is_bounce) WHERE is_bounce IS NOT NULL;
CREATE INDEX idx_site_sessions_utm_source ON site_sessions(utm_source);
CREATE INDEX idx_site_sessions_referrer_domain ON site_sessions(referrer_domain);

-- Page view queries
CREATE INDEX idx_site_page_views_session_id ON site_page_views(session_id);
CREATE INDEX idx_site_page_views_visitor_id ON site_page_views(visitor_id);
CREATE INDEX idx_site_page_views_viewed_at ON site_page_views(viewed_at);
CREATE INDEX idx_site_page_views_page_path ON site_page_views(page_path);

-- Composite indexes for dashboard queries
CREATE INDEX idx_site_sessions_date_source ON site_sessions(started_at, utm_source);
CREATE INDEX idx_site_sessions_date_bounce ON site_sessions(started_at, is_bounce);
