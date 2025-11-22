import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  display_order: number;
  created_at: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface Article {
  id: string;
  title: string;
  subtitle: string | null;
  slug: string;
  content: string;
  excerpt: string | null;
  author_notes: string | null;
  category_id: string | null;
  featured: boolean;
  published: boolean;
  published_at: string | null;
  reading_time: number;
  view_count: number;
  cover_image_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
  category?: Category;
  tags?: Tag[];
}

export interface ContactSubmission {
  name: string;
  email: string;
  subject?: string;
  message: string;
  inquiry_type?: string;
}
