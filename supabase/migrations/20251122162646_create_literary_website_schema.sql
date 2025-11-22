/*
  # Literary Website Database Schema

  ## Overview
  Creates the complete database structure for a minimalist literary personal website
  with support for articles, categories, tags, and contact form submissions.

  ## New Tables

  ### `categories`
  - `id` (uuid, primary key) - Unique category identifier
  - `name` (text, unique) - Category name (e.g., "Essays", "Poetry", "Notes")
  - `slug` (text, unique) - URL-friendly version of name
  - `description` (text, nullable) - Category description
  - `display_order` (integer) - Order for displaying categories
  - `created_at` (timestamptz) - Timestamp of creation

  ### `tags`
  - `id` (uuid, primary key) - Unique tag identifier
  - `name` (text, unique) - Tag name (e.g., "night", "city", "memory")
  - `slug` (text, unique) - URL-friendly version of name
  - `created_at` (timestamptz) - Timestamp of creation

  ### `articles`
  - `id` (uuid, primary key) - Unique article identifier
  - `title` (text) - Article title
  - `subtitle` (text, nullable) - Optional subtitle or preface
  - `slug` (text, unique) - URL-friendly version of title
  - `content` (text) - Main article content
  - `excerpt` (text, nullable) - Short preview/teaser text
  - `author_notes` (text, nullable) - Additional author commentary
  - `category_id` (uuid, foreign key) - Links to categories table
  - `featured` (boolean) - Whether article appears on homepage
  - `published` (boolean) - Publication status
  - `published_at` (timestamptz, nullable) - Publication date
  - `reading_time` (integer) - Estimated reading time in minutes
  - `view_count` (integer) - Number of views
  - `cover_image_url` (text, nullable) - Cover image URL
  - `meta_title` (text, nullable) - SEO meta title
  - `meta_description` (text, nullable) - SEO meta description
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `article_tags`
  - `article_id` (uuid, foreign key) - Links to articles table
  - `tag_id` (uuid, foreign key) - Links to tags table
  - Primary key on (article_id, tag_id)

  ### `contact_submissions`
  - `id` (uuid, primary key) - Unique submission identifier
  - `name` (text) - Sender's name
  - `email` (text) - Sender's email
  - `subject` (text, nullable) - Message subject
  - `message` (text) - Message content
  - `inquiry_type` (text, nullable) - Type of inquiry (collaboration, media, general)
  - `created_at` (timestamptz) - Submission timestamp

  ## Security
  - All tables have RLS enabled
  - Public read access for published content
  - Authenticated-only write access for content management
  - Public can submit contact forms
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text,
  author_notes text,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  featured boolean DEFAULT false,
  published boolean DEFAULT false,
  published_at timestamptz,
  reading_time integer DEFAULT 5,
  view_count integer DEFAULT 0,
  cover_image_url text,
  meta_title text,
  meta_description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS article_tags (
  article_id uuid REFERENCES articles(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, tag_id)
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  inquiry_type text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON articles(featured, published);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can view tags"
  ON tags FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can view published articles"
  ON articles FOR SELECT
  TO public
  USING (published = true);

CREATE POLICY "Anyone can view article tags for published articles"
  ON article_tags FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM articles
      WHERE articles.id = article_tags.article_id
      AND articles.published = true
    )
  );

CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage categories"
  ON categories FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage tags"
  ON tags FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage articles"
  ON articles FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage article tags"
  ON article_tags FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact submissions"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (true);