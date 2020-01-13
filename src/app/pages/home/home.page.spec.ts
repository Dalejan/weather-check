import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";
import { SkyconsModule } from "ngx-skycons";
import { IconNamePipe } from "src/app/pipes/icon-name/icon-name.pipe";

import { HomePage } from "./home.page";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { LocationAccuracy } from "@ionic-native/location-accuracy/ngx";
import { By } from "@angular/platform-browser";
import { map } from "rxjs/operators";

describe("HomePage", () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage, IconNamePipe],
      imports: [IonicModule.forRoot(), SkyconsModule, HttpClientTestingModule],
      providers: [Geolocation, LocationAccuracy]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call all the methods in order to get coordinates and weather data", async(() => {
    spyOn(component, "getCurrentLocation");
    component.getData();
    expect(component.getCurrentLocation).toHaveBeenCalled();
    fixture.whenStable().then(async () => {
      expect(
        await component.data$.pipe(map(data => data.temperature))
      ).not.toBeNull();
    });
  }));

  it("should call getData once HomePage have been created", async(() => {
    spyOn(component, "getData");
    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.getData).toHaveBeenCalled();
    });
  }));

  it("should call getData after onClick in refresh button, and set correct values to the coordinates", async(() => {
    spyOn(component, "getData");

    let button = fixture.debugElement.query(By.css("#refresh")).nativeElement;
    button.click();

    fixture.whenStable().then(() => {
      expect(component.getData).toHaveBeenCalled();

      expect(component.lat).toEqual(jasmine.any(Number));
      expect(component.lat).not.toEqual(0);
      expect(component.long).toEqual(jasmine.any(Number));
      expect(component.long).not.toEqual(0);
    });
  }));
});
