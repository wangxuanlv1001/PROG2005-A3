export type Category =
  | 'Electronics'
  | 'Furniture'
  | 'Clothing'
  | 'Tools'
  | 'Miscellaneous';

export type StockStatus =
  | 'In Stock'
  | 'Low Stock'
  | 'Out of Stock';

export interface InventoryItem {
  id?: number;
  itemName: string;
  category: Category;
  quantity: number;
  price: number;
  supplierName: string;
  stockStatus: StockStatus;
  featuredItem: number;
  specialNote?: string;
}