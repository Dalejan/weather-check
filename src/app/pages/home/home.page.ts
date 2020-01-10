import { Component, OnInit, OnDestroy } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Subject, Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { WeatherService } from "src/app/services/weather-service/weather-service.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  public lat: Number;
  public long: Number;
  public data$: Observable<any>;
  constructor(
    private geolocation: Geolocation,
    private weatherService: WeatherService
  ) {}

  public async ngOnInit() {
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
        console.log("Error getting location", error);
      });
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // Icons
  /**
   * clear-day,
   * clear-night,
   * rain,
   * snow,
   * sleet,
   * wind,
   * fog,
   * cloudy,
   * partly-cloudy-day,
   * partly-cloudy-night
   */
}
