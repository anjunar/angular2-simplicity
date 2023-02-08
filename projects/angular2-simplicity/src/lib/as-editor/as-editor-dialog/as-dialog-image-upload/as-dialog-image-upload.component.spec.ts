import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsDialogImageUploadComponent } from './as-dialog-image-upload.component';

describe('AsDialogImageUploadComponent', () => {
  let component: AsDialogImageUploadComponent;
  let fixture: ComponentFixture<AsDialogImageUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsDialogImageUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsDialogImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
