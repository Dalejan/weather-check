import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";

import { HomePage } from "./home.page";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { SkyconsModule } from "ngx-skycons";
import { IconNamePipe } from "src/app/pipes/icon-name/icon-name.pipe";
import { LocationAccuracy } from "@ionic-native/location-accuracy/ngx";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SkyconsModule,
    RouterModule.forChild([
      {
        path: "",
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, IconNamePipe],
  providers: [Geolocation, LocationAccuracy]
})
export class HomePageModule {}
