import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
  standalone: false
})
export class PrivacyPage {
  animateIn = false;

  constructor(private alertController: AlertController) {}

  ionViewWillEnter(): void {
    this.animateIn = false;

    setTimeout(() => {
      this.animateIn = true;
    }, 30);
  }

  async showHelp(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Help',
      message:
        'This page explains the privacy and security considerations of the mobile inventory application, including validation, safer transmission, and responsible data handling.',
      cssClass: 'glass-help-alert',
      buttons: ['OK']
    });

    await alert.present();
  }
}