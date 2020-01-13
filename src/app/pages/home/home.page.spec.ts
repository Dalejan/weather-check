import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";
import { SkyconsModule } from "ngx-skycons";
import { IconNamePipe } from "src/app/pipes/icon-name/icon-name.pipe";

import { HomePage } from "./home.page";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { LocationAccuracy } from "@ionic-native/location-accuracy/ngx";
import { By } from "@angular/platform-browser";

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
  }));

  // it("should call getData once HomePage have been loaded", async(() => {
  //   spyOn(component, "getData");

  //   fixture.detectChanges();
  //   expect(component.getData).toHaveBeenCalled();
  // }));

  it("should call getData after onClick in refresh button", async(() => {
    spyOn(component, "getData");

    let button = fixture.debugElement.query(By.css("#refresh")).nativeElement;
    button.click();

    fixture.whenStable().then(() => {
      expect(component.getData).toHaveBeenCalled();
    });
  }));
});
