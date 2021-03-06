import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { InstructorLayoutComponent } from "./instructor-layout.component";

describe("AprendizLayoutComponent", () => {
  let component: InstructorLayoutComponent;
  let fixture: ComponentFixture<InstructorLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorLayoutComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
