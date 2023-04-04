import { Category } from './category';
import { Warehouse } from './warehouse';
import { Producer } from './producer';
import { ReviewRequest } from './review-request';

export interface Product {
  id?: number;
  description?: string;
  weight?: number;
  discount?: number;
  price?: number;
  count?: number;
  unit?: string;
  title?: string;

  reviews?: ReviewRequest[];
  warehouse?: Warehouse;
  photos?: Array<{
    glowne?: string;
    url?: string;
  }>;
  category: Category;
  warehouse_count?: number;
  producer: Producer;
  html_title?: string;
  vat_rate?: number;
  delivery?: string;
  producer_code?: string | null;
  product_symbol?: string | null;
}
