import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { AdmobFreeService } from '../admobfree.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.page.html',
  styleUrls: ['./confirm-modal.page.scss'],
})
export class ConfirmModalPage implements OnInit {

  data; 
  ss;


  constructor(
    private navParams: NavParams,
    private emailComposer: EmailComposer,
    private screenshot: Screenshot,
    private modalController: ModalController,
    private admobFreeService: AdmobFreeService,
  ) { }

  ngOnInit() {
    this.data = this.navParams.get('data');
    this.takeScreenshot();
  }

  async confirm(){
    await this.admobFreeService.RewardVideoAd()
    if(this.ss){
      let email = {
        to: 'info@sujangainju.com.np',
        attachments: [
          'file://'+this.ss
        ],
        subject: 'RPS withdraw request',
        body: 'RPS withdraw request',
        isHtml: true
      }
      this.emailComposer.isAvailable().then(async (available: boolean) =>{
        if(available) {
          //Now we know we can send
          this.emailComposer.open(email);
          await this.modalController.dismiss('success');
        }
        else{
          console.log('Email COmposer not available')
        }
       });
    }
    else{
      console.log('Could not take screenshot')
    }
  }

  takeScreenshot(){
    this.screenshot.save('png', 80, 'rpsscreenshot').then(
      (data)=>{
        console.log(data.filePath)
        this.ss = data.filePath;
      },
      (error) => {
        console.log(error)
        alert('Could not take screenshot');
        return;
      }
    );
    // this.screenshot.URI(80).then(
    //   (data)=>{
    //     console.log(data.URI)
    //     this.ss = data.URI;
    //   },
    //   (error) => {
    //     console.log(error)
    //     alert('Could not take screenshot');
    //     return;
    //   }
    // );
  }

}
