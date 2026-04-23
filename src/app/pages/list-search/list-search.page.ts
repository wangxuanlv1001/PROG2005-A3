import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-list-search',
  templateUrl: './list-search.page.html',
  styleUrls: ['./list-search.page.scss'],
})
export class ListSearchPage {
  constructor(private alertCtrl: AlertController) {}

  async showHelp(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Help',
      message: 'Use this page to list all inventory items and search for a single item by name.',
      buttons: ['OK'],
    });

    await alert.present();
  }
}