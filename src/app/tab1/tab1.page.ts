import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // 必须引入，为了用 *ngIf 和 *ngFor
import { FormsModule } from '@angular/forms';   // 必须引入，为了用 ngModel 绑定搜索框
import { IonicModule, AlertController } from '@ionic/angular';
import { InventoryItem } from '../services/item.model';
import { addIcons } from 'ionicons';
import { helpCircleOutline } from 'ionicons/icons';
import { ApiService } from '../services/api';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  // 必须把 FormsModule 和 CommonModule 放在 imports 里！
  imports: [IonicModule, CommonModule, FormsModule], 
})
export class Tab1Page {
  items: InventoryItem[] = [];
  searchQuery: string = '';
  searchedItem: InventoryItem | null = null;

  constructor(
    private apiService: ApiService,
    private alertController: AlertController
  ) {
    // 注册帮助图标
    addIcons({ helpCircleOutline });
  }

  // 页面初始化时，自动去服务器获取所有数据
  ionViewWillEnter() {
  this.loadItems();
  }

  // 获取所有商品 (对应 GET /)
  loadItems() {
    this.apiService.getAllItems().subscribe({
      next: (data: InventoryItem[]) => { 
        this.items = data;
      },
      error: (err: any) => { 
        console.error('获取数据失败', err);
      }
    });
  }

  // 根据名字搜索 (对应 GET /name)
  searchItem() {
    if (this.searchQuery.trim() === '') {
      this.searchedItem = null;
      return;
    }
    
    this.apiService.getItemByName(this.searchQuery).subscribe({
      next: (data: any) => { 
        this.searchedItem = Array.isArray(data) ? data[0] : data;
      },
      error: (err: any) => { 
        this.searchedItem = null;
      }
    });
  }
  // 清空搜索
  clearSearch() {
    this.searchQuery = '';
    this.searchedItem = null;
  }

  // 作业要求：每个页面必须有一个 Help Widget (弹窗说明)
  async showHelp() {
    const alert = await this.alertController.create({
      header: 'Help',
      message: 'Here you can view all inventory items. Use the search bar to find a specific item by its exact name.',
      buttons: ['OK']
    });
    await alert.present();
  }
}