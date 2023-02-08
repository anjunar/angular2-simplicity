import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsImageUploadComponent } from './as-image-upload.component';

describe('AsUploadComponent', () => {
  let component: AsImageUploadComponent;
  let fixture: ComponentFixture<AsImageUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsImageUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
