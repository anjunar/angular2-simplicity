import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsCodeComponent } from './as-code.component';

describe('AsCodeComponent', () => {
  let component: AsCodeComponent;
  let fixture: ComponentFixture<AsCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
