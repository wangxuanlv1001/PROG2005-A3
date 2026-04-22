export interface InventoryItem {
  item_id?: number; 
  item_name: string;
  category: 'Electronics' | 'Furniture' | 'Clothing' | 'Tools' | 'Miscellaneous';
  quantity: number;
  price: number;
  supplier_name: string;
  stock_status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  featured_item: number; // 数据库是 tinyint，这里用 0 或 1
  special_note?: string; // 选填
}