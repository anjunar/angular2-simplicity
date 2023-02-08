import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMetaFormLayoutComponent } from './app-meta-form-layout.component';

describe('AppMetaFormLayoutComponent', () => {
  let component: AppMetaFormLayoutComponent;
  let fixture: ComponentFixture<AppMetaFormLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppMetaFormLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppMetaFormLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
