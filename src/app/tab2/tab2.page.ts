import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { InventoryItem } from '../services/item.model';
import { addIcons } from 'ionicons';
import { helpCircleOutline, starOutline } from 'ionicons/icons';
import { ApiService } from '../services/api';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Tab2Page implements OnInit {
  // 用于绑定表单的数据模型
  newItem: InventoryItem = {
    item_name: '',
    category: 'Electronics',
    quantity: 0,
    price: 0,
    supplier_name: '',
    stock_status: 'In Stock',
    featured_item: 0, // 0 默认不是特色商品，1 是特色商品
    special_note: ''
  };

  // 存放特色商品的数组
  featuredItems: InventoryItem[] = [];

  constructor(
    private apiService: ApiService,
    private alertController: AlertController,
    private toastController: ToastController // 用于底部弹出成功提示
  ) {
    addIcons({ helpCircleOutline, starOutline });
  }

  // 每次进入页面时加载特色商品
  ngOnInit() {
    this.loadFeaturedItems();
  }

  // 获取数据，并过滤出 featured_item == 1 的商品
  loadFeaturedItems() {
    this.apiService.getAllItems().subscribe({
      next: (data: InventoryItem[]) => {
        this.featuredItems = data.filter(item => item.featured_item === 1 || item.featured_item === true as any);
      },
      error: (err: any) => {
        console.error('获取特色商品失败', err);
      }
    });
  }

  // 添加新商品
  addItem() {
    // 简单的表单验证（作业要求：名字为文本，数量和价格不能小于0）
    if (!this.newItem.item_name.trim() || !this.newItem.supplier_name.trim()) {
      this.showAlert('Validation Error', 'Item Name and Supplier Name are required!');
      return;
    }
    if (this.newItem.quantity < 0 || this.newItem.price < 0) {
      this.showAlert('Validation Error', 'Quantity and Price cannot be negative numbers!');
      return;
    }

    // 调用 API 保存数据
    this.apiService.addItem(this.newItem).subscribe({
      next: async (res: any) => {
        await this.showToast('Item added successfully!');
        this.resetForm();
        this.loadFeaturedItems(); // 刷新特色商品列表
      },
      error: async (err: any) => {
        this.showAlert('Error', 'Failed to add item. Ensure the item name is unique.');
      }
    });
  }

  // 重置表单
  resetForm() {
    this.newItem = {
      item_name: '',
      category: 'Electronics',
      quantity: 0,
      price: 0,
      supplier_name: '',
      stock_status: 'In Stock',
      featured_item: 0,
      special_note: ''
    };
  }

  // 帮助按钮提示
  async showHelp() {
    const alert = await this.alertController.create({
      header: 'Help',
      message: 'Fill out the form to add a new item. Ensure unique item names. Below the form, you can see a list of all featured items.',
      buttons: ['OK']
    });
    await alert.present();
  }

  // 错误弹窗
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // 成功提示(Toast)
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
    await toast.present();
  }
}