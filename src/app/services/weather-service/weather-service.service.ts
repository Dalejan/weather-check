/**
 * WeatherService.ts
 * Maneja peticiones http para obtener datos del api https://darksky.net/dev
 */
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class WeatherService {
  private apiKey = "bd6a76a6e2b4a085e42473e17703c0fd";
  private apiUrl = "https://api.darksky.net/forecast/";
  constructor(private http: HttpClient) {}

  /**
   *
   * @param lat latitud de la geolocalización del dispositivo
   * @param long longitud de la geolocalización del dispositivo
   */
  public getWeatherData(lat: Number, long: Number): Observable<any> {
    // Usa cors-anywhere debido a que la configuración proxy de ionic no funcionó
    return this.http
      .get(
        `https://cors-anywhere.herokuapp.com/${this.apiUrl}/${this.apiKey}/${lat},${long}`
      )
      .pipe(
        map((data: any) => {
          console.log(data);
          return {
            timezone: data.timezone,
            summary: data.currently.summary,
            icon: data.currently.icon,
            precipProbability: data.currently.precipProbability,
            temperature: data.currently.temperature,
            humidity: data.currently.humidity
          };
        })
      );
  }
}
