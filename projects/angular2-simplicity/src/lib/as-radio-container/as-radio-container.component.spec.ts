import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsRadioContainerComponent } from './as-radio-container.component';

describe('AsRadioContainerComponent', () => {
  let component: AsRadioContainerComponent;
  let fixture: ComponentFixture<AsRadioContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsRadioContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsRadioContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
