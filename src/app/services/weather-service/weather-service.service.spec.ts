import { TestBed } from "@angular/core/testing";
import { WeatherService } from "./weather-service.service";

import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { HttpClientModule } from "@angular/common/http";

describe("WeatherService", () => {
  let httpTestingController: HttpTestingController;
  let service: WeatherService;
  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [WeatherService]
    });
    httpTestingController = TestBed.get(HttpTestingController);

    service = TestBed.get(WeatherService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should be created", () => {
    const service: WeatherService = TestBed.get(WeatherService);
    expect(service).toBeTruthy();
  });

  it("should return weather data", () => {
    service.getWeatherData(3.4, 20).subscribe(data => {
      console.log(data);
      expect(data.timezone).toEqual("Africa/Kinshasa");
      // done();
    });

    const req = httpTestingController.expectOne(
      `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/bd6a76a6e2b4a085e42473e17703c0fd/3.4731080999999997,-76.4941796`
    );
    expect(req.request.method).toBe("GET");

    httpTestingController.verify();
  });
});
