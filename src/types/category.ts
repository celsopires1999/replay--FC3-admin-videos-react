export interface Category {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Results {
  data: Category[];
  links: Links;
  meta: Meta;
}

export interface Result {
  data: Category;
}
export interface Links {
  first: string;
  last: string;
  prev: null;
  next: string;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}
export interface CategoryParams {
  page?: number;
  per_page?: number;
  search?: string;
  is_active?: boolean;
}
