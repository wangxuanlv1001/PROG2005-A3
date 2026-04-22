import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { listOutline, addCircleOutline, createOutline, shieldCheckmarkOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class TabsPage {
  constructor() {
    // 显式注册我们需要的图标
    addIcons({ listOutline, addCircleOutline, createOutline, shieldCheckmarkOutline });
  }
}