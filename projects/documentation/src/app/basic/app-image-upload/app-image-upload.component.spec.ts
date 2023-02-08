import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppImageUploadComponent } from './app-image-upload.component';

describe('AppImageUploadComponent', () => {
  let component: AppImageUploadComponent;
  let fixture: ComponentFixture<AppImageUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppImageUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
