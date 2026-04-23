import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryItem } from '../models/inventory-item';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private baseUrl = 'https://prog2005.it.scu.edu.au/ArtGalley';

  constructor(private http: HttpClient) {}

  getAllItems(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(`${this.baseUrl}/`);
  }

  getItemByName(name: string): Observable<InventoryItem> {
    return this.http.get<InventoryItem>(`${this.baseUrl}/${encodeURIComponent(name)}`);
  }

  addItem(item: InventoryItem): Observable<InventoryItem> {
    return this.http.post<InventoryItem>(`${this.baseUrl}/`, item);
  }

  updateItem(name: string, item: InventoryItem): Observable<any> {
    return this.http.put(`${this.baseUrl}/${encodeURIComponent(name)}`, item);
  }

  deleteItem(name: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${encodeURIComponent(name)}`);
  }
}