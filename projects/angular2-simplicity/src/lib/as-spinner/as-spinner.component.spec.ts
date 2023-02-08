import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsSpinnerComponent } from './as-spinner.component';

describe('AsSpinnerComponent', () => {
  let component: AsSpinnerComponent;
  let fixture: ComponentFixture<AsSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsSpinnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
