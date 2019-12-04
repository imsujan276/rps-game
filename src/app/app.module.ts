import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Screenshot } from '@ionic-native/screenshot/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { AdmobFreeService } from './admobfree.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Screenshot,
    EmailComposer,
    AdMobFree,
    AdmobFreeService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
