export interface FilterItem {
  field: string;

  value: string;
}

export interface ListFilterRequest {
  filter: FilterItem[];

  sort_direction: string;

  sort?: string[];

  page_index: number;

  page_size: number;
}
