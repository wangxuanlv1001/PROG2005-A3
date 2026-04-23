import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-update-delete',
  templateUrl: './update-delete.page.html',
  styleUrls: ['./update-delete.page.scss'],
})
export class UpdateDeletePage {
  constructor(private alertCtrl: AlertController) {}

  async showHelp(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Help',
      message: 'Use this page to update or delete an item by its name.',
      buttons: ['OK'],
    });

    await alert.present();
  }
}