import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppVideoUploadComponent } from './app-video-upload.component';

describe('AppVideoUploadComponent', () => {
  let component: AppVideoUploadComponent;
  let fixture: ComponentFixture<AppVideoUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppVideoUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppVideoUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
