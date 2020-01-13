import { TestBed, async } from "@angular/core/testing";
import { WeatherService } from "./weather-service.service";

import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

describe("WeatherService", () => {
  let httpTestingController: HttpTestingController;
  let service: WeatherService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
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

  it("should get the correct weather data", async(() => {
    service.getWeatherData(3.4, 20).subscribe(data => {
      expect(data.timezone).toEqual("Africa/Kinshasa");
    });

    const req = httpTestingController.expectOne(request => {
      return (
        request.url ===
        "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/bd6a76a6e2b4a085e42473e17703c0fd/3.4,20"
      );
    });

    expect(req.request.method).toEqual("GET");
  }));
});
