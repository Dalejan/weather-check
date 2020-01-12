/*
 *home.page.ts
 *Archivo principal de lógica, encargado de manejar acciones y eventos de la pantalla principal
 */
import { Component } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { LocationAccuracy } from "@ionic-native/location-accuracy/ngx";
import { Observable } from "rxjs";
import { WeatherService } from "src/app/services/weather-service/weather-service.service";
import { style, animate, transition, trigger } from "@angular/animations";
import { Platform } from "@ionic/angular";

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

/**
 * Componente encargado de manejar la lógica prncipal de la aplicación
 */
export class HomePage {
  /**
   * Latitud de la ubicación actual del dispositivo
   */
  public lat: Number;

  /**
   * Longitud de la ubicación actual del dispositivo
   */
  public long: Number;

  /**
   * Datos de respuesta al consumo del api de darksky
   */
  public data$: Observable<any>;

  /**
   * Objeto de error por permisos de geolocalización
   */
  public err: any;

  constructor(
    private geolocation: Geolocation,
    private locationAccuracy: LocationAccuracy,
    public platform: Platform,
    private weatherService: WeatherService
  ) {
    this.platform.ready().then(() => this.getData());
  }

  /**
   * Método encargado de obtener los datos desde el api de darksky con base en las coordenadas
   * del dispositivo
   */
  public async getData() {
    this.err = null;
    this.data$ = null;
    await this.getCoordinates();
    this.data$ = this.weatherService.getWeatherData(this.lat, this.long);
  }

  /**
   * Método encargado de obtener latitud y longitud dependiendo del dispositivo
   */
  public getCoordinates(): Promise<any> {
    if (
      this.platform.platforms().includes("android") ||
      this.platform.platforms().includes("ios")
    ) {
      // Verifica que el usuario haya otorgado permisos de ubicación
      return this.locationAccuracy.canRequest().then(() => {
        return this.locationAccuracy
          .request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
          .then(
            () => {
              return this.getCurrentLocation();
            },
            error => {
              this.err = error;
              console.log("Error requesting location permissions", error);
            }
          );
      });
    }
    return this.getCurrentLocation();
  }

  /**
   * Método encargado de obtener la latitud y longtud esperando 10seg por una respuesta
   */
  public getCurrentLocation(): Promise<any> {
    return this.geolocation
      .getCurrentPosition({ timeout: 10000, enableHighAccuracy: true })
      .then(resp => {
        this.lat = resp.coords.latitude;
        this.long = resp.coords.longitude;
      })
      .catch(error => {
        this.err = error;
        alert(error.message);
        console.log("Error getting location", error);
      });
  }
}
