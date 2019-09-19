import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AprendizLayoutComponent } from "./aprendiz-layout.component";

describe("AprendizLayoutComponent", () => {
  let component: AprendizLayoutComponent;
  let fixture: ComponentFixture<AprendizLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AprendizLayoutComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AprendizLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
