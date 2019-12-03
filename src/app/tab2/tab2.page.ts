import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConfirmModalPage } from '../confirm-modal/confirm-modal.page';
import { AdmobFreeService } from '../admobfree.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  collectedPoint = 0;
  pointsToCash = 0;
  minPointsToCash = 0.5;

  method;
  address;

  success = false;

  constructor(
    private modalController: ModalController,
    private admobFreeService: AdmobFreeService,
  ) { }

  ngOnInit() {
    this.getTotaoCOllectedPoints()
    this.admobFreeService.BannerAd();
  }

  ionViewWillEnter(){
    this.getTotaoCOllectedPoints()
    this.success = false;
  }

  getTotaoCOllectedPoints() {
    this.collectedPoint = localStorage.getItem('collectedPoint') ? parseInt(localStorage.getItem('collectedPoint')) : 0;
    this.pointsToCash = this.collectedPoint/100;
  }

  async openModal() {
    if(!this.address|| !this.method){
      alert('Enter payment details to redeem');
      return;
    }

    if(this.pointsToCash < this.minPointsToCash){
      alert('Minimum points to Cash of  $'+this.minPointsToCash+' is needed to redeem.');
      return;
    }

    let data = {
      collectedPoint: this.pointsToCash,
      method: this.method,
      address: this.address
    }
    const modal = await this.modalController.create({
      component: ConfirmModalPage,
      componentProps: {
        "data": data,
      },
      cssClass: 'my-modal'
    });
 
    modal.onDidDismiss().then((data) => {
      if(data.role != "backdrop"){
        this.success = true;
        localStorage.removeItem('collectedPoint')
        this.collectedPoint = 0
        this.pointsToCash = 0
      }
    });
 
    return await modal.present();
  }

}
