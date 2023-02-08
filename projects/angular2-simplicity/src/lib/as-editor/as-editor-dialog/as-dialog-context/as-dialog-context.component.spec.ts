import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsDialogContextComponent } from './as-dialog-context.component';

describe('AsDialogContextComponent', () => {
  let component: AsDialogContextComponent;
  let fixture: ComponentFixture<AsDialogContextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsDialogContextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsDialogContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
