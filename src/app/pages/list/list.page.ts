import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { InventoryItem } from '../../models/item.model';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: false
})
export class ListPage implements OnInit {
  items: InventoryItem[] = [];
  selectedItem: InventoryItem | null = null;
  searchName = '';
  loading = false;
  animateIn = false;

  constructor(
    private inventoryService: InventoryService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    this.loadAllItems();
  }

  ionViewWillEnter(): void {
    this.animateIn = false;

    setTimeout(() => {
      this.animateIn = true;
    }, 30);

    this.loadAllItems();
  }

  loadAllItems(): void {
    this.loading = true;
    this.selectedItem = null;

    this.inventoryService.getAllItems().subscribe({
      next: (data) => {
        console.log('NORMALIZED ITEMS:', data);
        this.items = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.presentToast('Failed to load inventory items.');
      }
    });
  }

  handleRefresh(event: any): void {
    this.inventoryService.getAllItems().subscribe({
      next: (data) => {
        this.items = data;
        this.selectedItem = null;
        this.loading = false;
        event.target.complete();
      },
      error: () => {
        this.loading = false;
        event.target.complete();
        this.presentToast('Failed to refresh inventory items.');
      }
    });
  }

  searchItem(): void {
    const name = this.searchName.trim();

    if (!name) {
      this.presentToast('Please enter an item name.');
      return;
    }

    this.loading = true;

    this.inventoryService.getItemByName(name).subscribe({
      next: (data) => {
        this.selectedItem = data;
        this.loading = false;
      },
      error: () => {
        this.selectedItem = null;
        this.loading = false;
        this.presentToast('Item not found.');
      }
    });
  }

  clearSearch(): void {
    this.searchName = '';
    this.selectedItem = null;
    this.loadAllItems();
  }

  trackByItemName(index: number, item: InventoryItem): string {
    return item.itemName || String(index);
  }

  async showHelp(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Help',
      message:
        'This page displays all inventory records. You can search a single item by name or refresh the list to load the latest records.',
      cssClass: 'glass-help-alert',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 2200,
      position: 'bottom'
    });

    await toast.present();
  }
}