import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-featured',
  templateUrl: './add-featured.page.html',
  styleUrls: ['./add-featured.page.scss'],
})
export class AddFeaturedPage {
  constructor(private alertCtrl: AlertController) {}

  async showHelp(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Help',
      message: 'Use this page to add a new inventory item and view featured items.',
      buttons: ['OK'],
    });

    await alert.present();
  }
}