import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsContextMarginsComponent } from './as-context-margins.component';

describe('AsContextMarginsComponent', () => {
  let component: AsContextMarginsComponent;
  let fixture: ComponentFixture<AsContextMarginsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsContextMarginsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsContextMarginsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
