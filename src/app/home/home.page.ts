import { Component } from '@angular/core';
import { AdmobFreeService } from '../admobfree.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  scores = [0, 0]; // store the scores. index 0 is you. index 1 is player 2.
  weapons = [
    'rock',
    'paper',
    'scissors'
  ];
  playerSelected = -1;
  enemySelected = -1;
  loading = false; // we're going to show a loading spinner when waiting for the enemy pick.
  isResultShow = false;
  // theResult -  0 winner
  //              1 lose
  //              2 tie
  theResult = 0

  randomSelected = 0;

  collectedPoint = 0;
  clicks = 0;

  constructor(
    private admobFreeService: AdmobFreeService,
  ) {
    this.getTotaoCOllectedPoints();
    this.randomSelectedItemInit();
    this.admobFreeService.BannerAd();
  }

  getTotaoCOllectedPoints() {
    this.collectedPoint = localStorage.getItem('collectedPoint') ? parseInt(localStorage.getItem('collectedPoint')) : 0;
  }

  ionViewWillEnter(){
    if(!localStorage.getItem('collectedPoint')){
      localStorage.setItem('collectedPoint', '0');
    }
    this.collectedPoint = parseInt(localStorage.getItem('collectedPoint')) 
  }


  setTotaoCOllectedPoints(operation) {
    if(operation == 'win'){
      this.collectedPoint = this.collectedPoint + 1;
    }else{
      this.collectedPoint = this.collectedPoint - 1;
    }
    if(this.collectedPoint < 0){
      this.collectedPoint = 0
    }
    localStorage.setItem('collectedPoint', this.collectedPoint.toString());
  }

  randomSelectedItemInit() {
    this.randomSelected = Math.floor(Math.random() * 3);
  }

  randomSelectedItem() {
    let interval = setInterval(() => {
      this.randomSelected = Math.floor(Math.random() * 3);
      if (this.playerSelected != -1) {
        setTimeout(() => {
          clearInterval(interval)
        }, Math.floor(Math.random() * 3500) + 3500)
      }
    }, 100)
  }



  async pick(weapon: number): Promise<void> {
    this.enemySelected = -1
    // return immediately when still loading. You don't want
    // the user to spam the button.
    if (this.loading) return;
    this.loading = true;
    this.playerSelected = weapon;

    await this.randomSelectedItem()
    //create a delay to simulate enemy's turn.
    setTimeout(() => {
      this.clicks = this.clicks + 1;
      if(this.clicks % 8 == 0){
        this.admobFreeService.InterstitialAd()
      }
      if(this.clicks % 15 == 0){
        this.admobFreeService.RewardVideoAd()
      }
      this.loading = false;
      // generate a number from 0 -2 
      const randomNum = Math.floor(Math.random() * 3);
      this.enemySelected = randomNum;
      this.checkResult();
      this.isResultShow = true;
    }, Math.floor(Math.random() * 1000) + 2000);
  }

  reset(): void {
    this.scores = [0, 0];
  }

  checkResult(): void {
    const playerPick = this.playerSelected;
    const enemyPick = this.enemySelected;
    // if you and the enemy have the same weapon, then it is a tie.
    if (playerPick == enemyPick) {
      this.theResult = 2;
    }
    // let's say you picked rock ( 0 ) 
    // and the enemy picked paper ( 1 )
    // you lose because ( 0 - 1 + 3 ) % 3  is equal to 2.
    // when you picked rock ( 0 )
    // and the enemy picked scissor ( 2 )
    // you win because ( 0 - 2 + 3) % 3 is equal to 1.
    // when you picked scissor ( 2 )
    // and the enemy picked paper ( 1 )
    // you win because ( 2 - 1 + 3 ) % 3 is equal to 1. 4 % 3 is 1.
    // Hope you get the picture.
    else if ((playerPick - enemyPick + 3) % 3 == 1) {
      // YOU WIN
      this.theResult = 0;
      this.scores[0] = this.scores[0] + 1;
      this.setTotaoCOllectedPoints('win');
    }
    else {
      // YOU LOSE
      this.theResult = 1;
      this.scores[1] = this.scores[1] + 1;
      this.setTotaoCOllectedPoints('loss');
    }
  }

}
