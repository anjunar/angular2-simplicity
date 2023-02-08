import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsDialogComponent } from './as-dialog.component';

describe('AsDialogComponent', () => {
  let component: AsDialogComponent;
  let fixture: ComponentFixture<AsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
