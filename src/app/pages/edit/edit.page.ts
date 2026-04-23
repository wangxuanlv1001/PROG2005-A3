import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { Category, InventoryItem, StockStatus } from '../../models/item.model';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
  standalone: false
})
export class EditPage implements OnInit {
  searchName = '';
  itemForm!: FormGroup;
  itemLoaded = false;
  originalItemName = '';
  processing = false;
  animateIn = false;

  categories = Object.values(Category);
  stockStatuses = Object.values(StockStatus);

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  ionViewWillEnter(): void {
    this.animateIn = false;

    setTimeout(() => {
      this.animateIn = true;
    }, 30);
  }

  initForm(): void {
    this.itemForm = this.fb.group({
      itemId: [{ value: '', disabled: true }],
      itemName: ['', [Validators.required, Validators.maxLength(100)]],
      category: ['', [Validators.required]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]],
      supplierName: ['', [Validators.required, Validators.maxLength(100)]],
      stockStatus: ['', [Validators.required]],
      featuredToggle: [false],
      specialNote: ['', [Validators.maxLength(300)]]
    });
  }

  searchItem(): void {
    const name = this.searchName.trim();

    if (!name) {
      this.presentToast('Please enter an item name to search.');
      return;
    }

    this.loadItemByName(name, true);
  }

  private loadItemByName(name: string, showSuccessToast: boolean): void {
    this.processing = true;

    this.inventoryService.getItemByName(name).subscribe({
      next: (item) => {
        this.processing = false;
        this.itemLoaded = true;
        this.originalItemName = item.itemName;
        this.searchName = item.itemName;

        this.itemForm.patchValue({
          itemId: item.itemId ?? '',
          itemName: item.itemName,
          category: item.category,
          quantity: item.quantity,
          price: item.price,
          supplierName: item.supplierName,
          stockStatus: item.stockStatus,
          featuredToggle: Number(item.featuredItem) === 1,
          specialNote: item.specialNote || ''
        });

        if (showSuccessToast) {
          this.presentToast('Item loaded successfully.');
        }
      },
      error: (err) => {
        this.processing = false;
        this.itemLoaded = false;
        console.error('SEARCH ERROR:', err);

        const message =
          typeof err?.error === 'string'
            ? err.error
            : err?.error?.error || 'Item not found.';

        this.presentToast(message);
      }
    });
  }

  updateItem(): void {
    if (!this.itemLoaded) {
      this.presentToast('Please search for an item first.');
      return;
    }

    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      this.presentToast('Please fix validation errors before updating.');
      return;
    }

    this.processing = true;

    const formValue = this.itemForm.getRawValue();

    const updatedItem: InventoryItem = {
      itemId: formValue.itemId ? Number(formValue.itemId) : undefined,
      itemName: formValue.itemName.trim(),
      category: formValue.category,
      quantity: Number(formValue.quantity),
      price: Number(formValue.price),
      supplierName: formValue.supplierName.trim(),
      stockStatus: formValue.stockStatus,
      featuredItem: formValue.featuredToggle ? 1 : 0,
      specialNote: formValue.specialNote?.trim() || ''
    };

    const oldName = this.originalItemName.trim();
    const newName = updatedItem.itemName.trim();

    this.inventoryService.updateItem(oldName, updatedItem).subscribe({
      next: (message) => {
        this.processing = false;
        this.originalItemName = newName;
        this.searchName = newName;
        this.presentToast(message || 'Item updated successfully.');

        this.loadItemByName(newName, false);
      },
      error: (err) => {
        this.processing = false;
        console.error('UPDATE ERROR:', err);

        const message =
          typeof err?.error === 'string'
            ? err.error
            : err?.error?.error || 'Failed to update item.';

        this.presentToast(message);
      }
    });
  }

  async deleteItem(): Promise<void> {
    if (!this.itemLoaded) {
      this.presentToast('Please search for an item first.');
      return;
    }

    const currentName = this.itemForm.getRawValue().itemName?.trim();

    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: `Are you sure you want to delete "${currentName}"?`,
      cssClass: 'glass-help-alert',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            if (currentName === 'Laptop') {
              this.presentToast('Laptop cannot be deleted according to the server rule.');
              return;
            }

            this.processing = true;

            this.inventoryService.deleteItem(this.originalItemName).subscribe({
              next: (message) => {
                this.processing = false;
                this.presentToast(message || 'Item deleted successfully.');
                this.resetFormState();
              },
              error: (err) => {
                this.processing = false;
                console.error('DELETE ERROR:', err);

                const message =
                  typeof err?.error === 'string'
                    ? err.error
                    : err?.error?.error || 'Failed to delete item.';

                this.presentToast(message);
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

  resetFormState(): void {
    this.itemLoaded = false;
    this.originalItemName = '';
    this.searchName = '';
    this.itemForm.reset({
      itemId: '',
      itemName: '',
      category: '',
      quantity: 0,
      price: 0,
      supplierName: '',
      stockStatus: '',
      featuredToggle: false,
      specialNote: ''
    });
  }

  async showHelp(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Help',
      message:
        'Search an item by name, then update the item information. Item ID remains read-only, while the other fields can be edited.',
      cssClass: 'glass-help-alert',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 2600,
      position: 'bottom'
    });

    await toast.present();
  }

  isInvalid(controlName: string): boolean {
    const control = this.itemForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }
}