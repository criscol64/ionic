import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { ModalController } from '@ionic/angular';
import { ReservationPage } from './reservation/reservation.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: 'home',
      icon: 'home'
    },
    {
      title: 'About Us',
      url: 'about',
      icon: 'information-circle'
    },
    {
      title: 'Menu',
      url: 'menu',
      icon: 'book'
    },
    {
      title: 'Contact Us',
      url: 'contact',
      icon: 'mail'
    },
    {
      title: 'MyFavorites',
      url: 'favorites',
      icon: 'heart'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public modalcontroller: ModalController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {

  }

  async openReserve() {
    const modal = await this.modalcontroller.create({
      component: ReservationPage
    });
    await modal.present();
  }
}
