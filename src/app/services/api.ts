import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryItem } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // 老师指定的 API 地址
  private baseUrl = 'https://prog2005.it.scu.edu.au/ArtGalley';

  constructor(private http: HttpClient) { }

  // 1. 获取所有物品
  getAllItems(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.baseUrl);
  }

  // 2. 根据名称搜索物品
  getItemByName(name: string): Observable<InventoryItem> {
    return this.http.get<InventoryItem>(`${this.baseUrl}/${name}`);
  }

  // 3. 添加新物品
  addItem(item: InventoryItem): Observable<any> {
    return this.http.post(this.baseUrl, item);
  }

  // 4. 更新现有物品
  updateItem(name: string, item: InventoryItem): Observable<any> {
    return this.http.put(`${this.baseUrl}/${name}`, item);
  }

  // 5. 删除物品 (删除 Laptop 会报错，需在 UI 层处理)
  deleteItem(name: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${name}`, { responseType: 'text' });
  }
}