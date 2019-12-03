import { Injectable } from "@angular/core";
import {
  AdMobFree,
  AdMobFreeBannerConfig,
  AdMobFreeInterstitialConfig,
  AdMobFreeRewardVideoConfig
} from '@ionic-native/admob-free/ngx';
import { Platform } from '@ionic/angular';


@Injectable()
export class AdmobFreeService {

  //Interstitial Ad's Configurations
  interstitialConfig: AdMobFreeInterstitialConfig = {
    // add your config here
    // for the sake of this example we will just use the test config
    isTesting: false,
    autoShow: false,
    id: "ca-app-pub-9000154121468885/3029595393"
  };

  //Reward Video Ad's Configurations
  RewardVideoConfig: AdMobFreeRewardVideoConfig = {
    isTesting: false, // Remove in production
    autoShow: false,
    id: "ca-app-pub-9000154121468885/2337656059"
  };

  constructor(
    private admobFree: AdMobFree,
    public platform: Platform
  ) {

    platform.ready().then(() => {

      // Load ad configuration
      this.admobFree.interstitial.config(this.interstitialConfig);
      //Prepare Ad to Show
      this.admobFree.interstitial.prepare()
        .then(() => {
          // alert(1);
        }).catch(e => console.log(e));


      // Load ad configuration
      this.admobFree.rewardVideo.config(this.RewardVideoConfig);
      //Prepare Ad to Show
      this.admobFree.rewardVideo.prepare()
        .then(() => {
          // alert(2);
        }).catch(e => console.log(e));

    });

    //Handle interstitial's close event to Prepare Ad again
    this.admobFree.on('admob.interstitial.events.CLOSE').subscribe(() => {
      this.admobFree.interstitial.prepare()
        .then(() => {
          console.log("Interstitial CLOSE");
        }).catch(e => console.log(e));
    });
    //Handle Reward's close event to Prepare Ad again
    this.admobFree.on('admob.rewardvideo.events.CLOSE').subscribe(() => {
      this.admobFree.rewardVideo.prepare()
        .then(() => {
          console.log("Reward Video CLOSE");
        }).catch(e => console.log(e));
    });
  }


  BannerAd() {
    let bannerConfig: AdMobFreeBannerConfig = {
      isTesting: false, // Remove in production
      autoShow: true,
      id: "ca-app-pub-9000154121468885/2510720646",
    };
    this.admobFree.banner.config(bannerConfig);

    this.admobFree.banner.prepare().then(() => {
      // success
    }).catch(e => console.log(e));
  }

  InterstitialAd() {
    //Check if Ad is loaded
    this.admobFree.interstitial.isReady().then(() => {
      //Will show prepared Ad
      this.admobFree.interstitial.show().then(() => {
      })
        .catch(e => console.log("show " + e));
    })
      .catch(e => console.log("isReady " + e));
  }

  RewardVideoAd() {
    //Check if Ad is loaded
    this.admobFree.rewardVideo.isReady().then(() => {
      //Will show prepared Ad
      this.admobFree.rewardVideo.show().then(() => {
      })
        .catch(e => console.log("show " + e));
    })
      .catch(e => console.log("isReady " + e));
  }


}
