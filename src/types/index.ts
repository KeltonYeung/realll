export type Page = 'home' | 'about' | 'writing' | 'article' | 'contact' | 'dashboard';

export interface NavigationState {
  currentPage: Page;
  articleSlug?: string;
  categoryFilter?: string;
  tagFilter?: string;
  dashboardTab?: string;
}
