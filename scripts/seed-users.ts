import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabaseUrl = 'https://yrzrwhihkpmjniugczka.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyenJ3aGloa3Btam5pdWdjemthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwMzc4NjYsImV4cCI6MjA3NTYxMzg2Nn0.zLOPXKGK_8L2E3a4LUEfYiNkFQZTIREZ292q4LUk4sk';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seedUsers() {
  console.log('🌱 Seeding users...');

  // Hash passwords
  const adminPasswordHash = await bcrypt.hash('admin123', 10);
  const customerPasswordHash = await bcrypt.hash('customer123', 10);

  // Create admin user
  const { data: admin, error: adminError } = await supabase
    .from('users')
    .upsert({
      email: 'admin@sproutn.com',
      name: 'Admin User',
      password_hash: adminPasswordHash,
      role: 'admin'
    }, { onConflict: 'email' })
    .select()
    .single();

  if (adminError) {
    console.error('❌ Error creating admin:', adminError);
  } else {
    console.log('✅ Admin user created:', admin);
  }

  // Create customer user
  const { data: customer, error: customerError } = await supabase
    .from('users')
    .upsert({
      email: 'customer@example.com',
      name: 'Demo Customer',
      password_hash: customerPasswordHash,
      role: 'customer',
      company_name: 'Demo Company'
    }, { onConflict: 'email' })
    .select()
    .single();

  if (customerError) {
    console.error('❌ Error creating customer:', customerError);
  } else {
    console.log('✅ Customer user created:', customer);
  }

  console.log('✨ Seeding complete!');
}

seedUsers().catch(console.error);
