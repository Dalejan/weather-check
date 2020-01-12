/*
 *home.page.ts
 *Archivo principal de lógica, encargado de manejar acciones y eventos de la pantalla principal
 */
import { Component, OnInit } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Observable } from "rxjs";
import { WeatherService } from "src/app/services/weather-service/weather-service.service";
import { style, animate, transition, trigger } from "@angular/animations";

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
export class HomePage implements OnInit {
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
    private weatherService: WeatherService
  ) {}

  public ngOnInit() {
    this.getData();
  }

  /**
   * Método encargado de obtener los datos desde el api de darksky con base en las coordenadas
   * del dispositivo
   */
  public async getData() {
    await this.getCoordinates();
    this.data$ = this.weatherService.getWeatherData(this.lat, this.long);
  }

  /**
   * Método encargado de obtener latitud y longitud del dispositivo
   */
  public getCoordinates(): Promise<any> {
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
}
