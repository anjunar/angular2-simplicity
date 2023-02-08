import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsProgressBarComponent } from './as-progress-bar.component';

describe('AsProgressBarComponent', () => {
  let component: AsProgressBarComponent;
  let fixture: ComponentFixture<AsProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsProgressBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
