import { Component, OnInit, OnDestroy } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Subject, Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { WeatherService } from "src/app/services/weather-service/weather-service.service";
import {
  style,
  state,
  animate,
  transition,
  trigger
} from "@angular/animations";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
  animations: [
    trigger("fadeInOut", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class HomePage implements OnInit {
  public lat: Number;
  public long: Number;
  public data$: Observable<any>;
  public err: any;

  constructor(
    private geolocation: Geolocation,
    private weatherService: WeatherService
  ) {}

  public ngOnInit() {
    this.getData();
  }

  public async getData() {
    await this.getCoordinates();
    this.data$ = this.weatherService.getWeatherData(this.lat, this.long);
  }

  public getCoordinates() {
    return this.geolocation
      .getCurrentPosition()
      .then(resp => {
        this.lat = resp.coords.latitude;
        this.long = resp.coords.longitude;
      })
      .catch(error => {
        this.err = error;
        console.log("Error getting location", error);
      });
  }

  public refresh() {
    this.getData();
  }
}
