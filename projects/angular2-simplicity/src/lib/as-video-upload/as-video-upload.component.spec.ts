import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsVideoUploadComponent } from './as-video-upload.component';

describe('AsVideoUploadComponent', () => {
  let component: AsVideoUploadComponent;
  let fixture: ComponentFixture<AsVideoUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsVideoUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsVideoUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
