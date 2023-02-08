import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsWindowComponent } from './as-window.component';

describe('AsWindowComponent', () => {
  let component: AsWindowComponent;
  let fixture: ComponentFixture<AsWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
