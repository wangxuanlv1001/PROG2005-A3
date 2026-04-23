import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { Category, InventoryItem, StockStatus } from '../../models/item.model';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
  standalone: false
})
export class AddPage implements OnInit {
  itemForm!: FormGroup;
  featuredItems: InventoryItem[] = [];
  submitting = false;
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
    this.loadFeaturedItems();
  }

  ionViewWillEnter(): void {
    this.animateIn = false;

    setTimeout(() => {
      this.animateIn = true;
    }, 30);

    this.loadFeaturedItems();
  }

  initForm(): void {
    this.itemForm = this.fb.group({
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

  loadFeaturedItems(): void {
    this.inventoryService.getFeaturedItems().subscribe({
      next: (data) => {
        this.featuredItems = data;
      },
      error: () => {
        this.presentToast('Failed to load featured items.');
      }
    });
  }

  submitForm(): void {
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      this.presentToast('Please complete all required fields correctly.');
      return;
    }

    this.submitting = true;

    const formValue = this.itemForm.value;

    const newItem: InventoryItem = {
      itemName: formValue.itemName.trim(),
      category: formValue.category,
      quantity: Number(formValue.quantity),
      price: Number(formValue.price),
      supplierName: formValue.supplierName.trim(),
      stockStatus: formValue.stockStatus,
      featuredItem: formValue.featuredToggle ? 1 : 0,
      specialNote: formValue.specialNote?.trim() || ''
    };

    this.inventoryService.addItem(newItem).subscribe({
      next: (message) => {
        this.submitting = false;
        this.presentToast(message || 'Item added successfully.');

        this.itemForm.reset({
          itemName: '',
          category: '',
          quantity: 0,
          price: 0,
          supplierName: '',
          stockStatus: '',
          featuredToggle: false,
          specialNote: ''
        });

        this.loadFeaturedItems();
      },
      error: (err) => {
        this.submitting = false;
        console.error('ADD ERROR:', err);

        const message =
          typeof err?.error === 'string'
            ? err.error
            : err?.error?.error || 'Failed to add item. Check uniqueness and field values.';

        this.presentToast(message);
      }
    });
  }

  async showHelp(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Help',
      message:
        'Use this page to add a new inventory item. Required fields must be completed before submission. Featured items are listed below the form.',
      cssClass: 'glass-help-alert',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 2400,
      position: 'bottom'
    });

    await toast.present();
  }

  isInvalid(controlName: string): boolean {
    const control = this.itemForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }
}