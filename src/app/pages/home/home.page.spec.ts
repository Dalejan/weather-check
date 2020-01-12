import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";
import { SkyconsModule } from "ngx-skycons";
import { IconNamePipe } from "src/app/pipes/icon-name/icon-name.pipe";

import { HomePage } from "./home.page";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("HomePage", () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage, IconNamePipe],
      imports: [IonicModule.forRoot(), SkyconsModule, HttpClientTestingModule],
      providers: [Geolocation]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
