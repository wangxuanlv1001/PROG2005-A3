import { Component } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { helpCircleOutline, shieldCheckmarkOutline, lockClosedOutline, eyeOffOutline, serverOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class Tab4Page {

  constructor(private alertController: AlertController) {
    // 引入一些看起来很“安全”的图标，让页面更专业
    addIcons({ helpCircleOutline, shieldCheckmarkOutline, lockClosedOutline, eyeOffOutline, serverOutline });
  }

  // 每个页面必须有的帮助按钮
  async showHelp() {
    const alert = await this.alertController.create({
      header: 'Help',
      message: 'This page explains the privacy and security measures implemented and required for this mobile inventory management system.',
      buttons: ['OK']
    });
    await alert.present();
  }
}