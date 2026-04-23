import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-privacy-security',
  templateUrl: './privacy-security.page.html',
  styleUrls: ['./privacy-security.page.scss'],
})
export class PrivacySecurityPage {
  constructor(private alertCtrl: AlertController) {}

  async showHelp(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Help',
      message: 'This page explains privacy and security requirements for the mobile inventory app.',
      buttons: ['OK'],
    });

    await alert.present();
  }
}