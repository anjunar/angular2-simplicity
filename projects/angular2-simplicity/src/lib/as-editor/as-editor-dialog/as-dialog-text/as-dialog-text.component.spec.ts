import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsDialogTextComponent } from './as-dialog-text.component';

describe('AsDialogTextComponent', () => {
  let component: AsDialogTextComponent;
  let fixture: ComponentFixture<AsDialogTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsDialogTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsDialogTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
