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
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
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

  // it("should return weather data", async(() => {
  //   service.getWeatherData(3.4, 20).subscribe(data => {
  //     expect(data.timezone).toEqual("Africa/Kinshasa");
  //   });
  // }));
});
