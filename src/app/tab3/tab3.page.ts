import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { InventoryItem } from '../services/item.model';
import { addIcons } from 'ionicons';
import { helpCircleOutline, searchOutline, trashOutline, saveOutline } from 'ionicons/icons';
import { ApiService } from '../services/api';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Tab3Page {
  searchQuery: string = '';
  // selectedItem 用于保存搜索出来的商品，修改它就是更新数据
  selectedItem: InventoryItem | null = null;
  // 原始名称（因为更新是依靠原名作为 URL 参数的，如果用户连名字都改了，我们需要用旧名字发起 PUT 请求）
  originalName: string = '';

  constructor(
    private apiService: ApiService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    addIcons({ helpCircleOutline, searchOutline, trashOutline, saveOutline });
  }

  // 1. 搜索需要修改或删除的物品
  searchForEdit() {
    if (this.searchQuery.trim() === '') {
      this.selectedItem = null;
      return;
    }
    
    this.apiService.getItemByName(this.searchQuery).subscribe({
      next: (data: any) => {
        const item = Array.isArray(data) ? data[0] : data;
        if (item) {
          this.selectedItem = item;
          this.originalName = item.item_name; // 记住它原来的名字
        } else {
          this.selectedItem = null;
          this.showToast('Item not found.', 'warning');
        }
      },
      error: (err: any) => {
        this.selectedItem = null;
        this.showToast('Item not found.', 'danger');
      }
    });
  }

  // 2. 提交更新 (PUT 请求)
  updateItem() {
    if (!this.selectedItem) return;

    // 表单基础验证
    if (!this.selectedItem.item_name.trim()) {
      this.showAlert('Validation Error', 'Item Name cannot be empty.');
      return;
    }
    if (this.selectedItem.quantity < 0 || this.selectedItem.price < 0) {
      this.showAlert('Validation Error', 'Quantity and Price cannot be negative.');
      return;
    }

    this.apiService.updateItem(this.originalName, this.selectedItem).subscribe({
      next: async () => {
        await this.showToast('Item updated successfully!', 'success');
        this.originalName = this.selectedItem!.item_name; // 更新成功后，当前名字变成了"新"的原名
      },
      error: async (err: any) => {
        this.showAlert('Update Failed', 'An error occurred while updating the item.');
      }
    });
  }

  // 3. 删除记录 (DELETE 请求，需处理 Laptop 报错)
  async deleteItem() {
    if (!this.selectedItem) return;

    // 删除前弹窗让用户再次确认
    const alert = await this.alertController.create({
      header: 'Confirm Deletion',
      message: `Are you sure you want to delete "${this.selectedItem.item_name}"?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { 
          text: 'Delete', 
          role: 'destructive',
          handler: () => {
            // 用户点击确认后，发送 DELETE 请求
            this.apiService.deleteItem(this.originalName).subscribe({
              next: () => {
                this.showToast('Item deleted successfully.', 'success');
                this.selectedItem = null; // 清空界面
                this.searchQuery = '';
              },
              error: (err: any) => {
                // 【核心要求】处理无法删除的报错 (特别是 Laptop)
                this.showAlert('Deletion Failed', 'You cannot delete this item. Note: Deletion of "Laptop" is strictly forbidden by the server.');
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  // 帮助按钮提示
  async showHelp() {
    const alert = await this.alertController.create({
      header: 'Help',
      message: 'First, search for an item by its exact name. Once loaded, you can modify its details and save, or permanently delete it. Note: "Laptop" cannot be deleted.',
      buttons: ['OK']
    });
    await alert.present();
  }

  // 辅助弹窗
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header, message, buttons: ['OK']
    });
    await alert.present();
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message, duration: 2500, color, position: 'top'
    });
    await toast.present();
  }
}