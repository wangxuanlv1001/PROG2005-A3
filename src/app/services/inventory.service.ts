import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Category, InventoryItem, StockStatus } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private readonly baseUrl = 'https://prog2005.it.scu.edu.au/ArtGalley';

  constructor(private http: HttpClient) {}

  getAllItems(): Observable<InventoryItem[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      tap((data) => console.log('GET ALL RAW RESPONSE:', data)),
      map((items) => (items || []).map((item) => this.normalizeItem(item))),
      map((items) => this.deduplicateItems(items))
    );
  }

  getItemByName(name: string): Observable<InventoryItem> {
    return this.http.get<any>(`${this.baseUrl}/${encodeURIComponent(name)}`).pipe(
      tap((data) => console.log('GET ONE RAW RESPONSE:', data)),
      map((item) => {
        const rawItem = Array.isArray(item) ? item[0] : item;
        return this.normalizeItem(rawItem);
      })
    );
  }

  addItem(item: InventoryItem): Observable<string> {
    return this.http.post(
      this.baseUrl,
      this.toApiPayload(item),
      { responseType: 'text' }
    );
  }

  updateItem(name: string, item: InventoryItem): Observable<string> {
    return this.http.put(
      `${this.baseUrl}/${encodeURIComponent(name)}`,
      this.toApiPayload(item),
      { responseType: 'text' }
    );
  }

  deleteItem(name: string): Observable<string> {
    return this.http.delete(
      `${this.baseUrl}/${encodeURIComponent(name)}`,
      { responseType: 'text' }
    );
  }

  getFeaturedItems(): Observable<InventoryItem[]> {
    return this.getAllItems().pipe(
      map((items) => items.filter((item) => Number(item.featuredItem) === 1))
    );
  }

  private normalizeItem(item: any): InventoryItem {
    return {
      itemId: this.toNumber(
        item?.itemId ??
        item?.item_id ??
        item?.ItemID ??
        item?.id
      ),
      itemName: String(
        item?.itemName ??
        item?.item_name ??
        item?.ItemName ??
        item?.name ??
        item?.Name ??
        'Unnamed Item'
      ),
      category: this.normalizeCategory(
        item?.category ??
        item?.Category
      ),
      quantity: this.toNumber(
        item?.quantity ??
        item?.Quantity ??
        item?.qty
      ),
      price: this.toNumber(
        item?.price ??
        item?.Price
      ),
      supplierName: String(
        item?.supplierName ??
        item?.supplier_name ??
        item?.SupplierName ??
        item?.supplier ??
        'Unknown Supplier'
      ),
      stockStatus: this.normalizeStockStatus(
        item?.stockStatus ??
        item?.stock_status ??
        item?.StockStatus ??
        item?.status
      ),
      featuredItem: this.toNumber(
        item?.featuredItem ??
        item?.featured_item ??
        item?.FeaturedItem ??
        item?.featured ??
        0
      ),
      specialNote: String(
        item?.specialNote ??
        item?.special_note ??
        item?.SpecialNote ??
        item?.note ??
        ''
      )
    };
  }

  private normalizeCategory(value: any): Category {
    const normalized = String(value ?? '').trim().toLowerCase();

    switch (normalized) {
      case 'electronics':
        return Category.Electronics;
      case 'furniture':
        return Category.Furniture;
      case 'clothing':
        return Category.Clothing;
      case 'tools':
        return Category.Tools;
      default:
        return Category.Miscellaneous;
    }
  }

  private normalizeStockStatus(value: any): StockStatus {
    const normalized = String(value ?? '').trim().toLowerCase();

    switch (normalized) {
      case 'in stock':
      case 'instock':
        return StockStatus.InStock;
      case 'low stock':
      case 'lowstock':
        return StockStatus.LowStock;
      case 'out of stock':
      case 'outofstock':
        return StockStatus.OutOfStock;
      default:
        return StockStatus.InStock;
    }
  }

  private deduplicateItems(items: InventoryItem[]): InventoryItem[] {
    const uniqueMap = new Map<string, InventoryItem>();

    for (const item of items) {
      const key = (item.itemName || '').trim().toLowerCase();
      if (!key) {
        continue;
      }
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, item);
      }
    }

    return Array.from(uniqueMap.values());
  }

  private toApiPayload(item: InventoryItem): any {
    return {
      item_id: item.itemId ?? undefined,
      item_name: item.itemName.trim(),
      category: item.category,
      quantity: Number(item.quantity),
      price: Number(item.price),
      supplier_name: item.supplierName.trim(),
      stock_status: item.stockStatus,
      featured_item: Number(item.featuredItem),
      special_note: item.specialNote?.trim() || ''
    };
  }

  private toNumber(value: unknown): number {
    const num = Number(value);
    return Number.isNaN(num) ? 0 : num;
  }
}