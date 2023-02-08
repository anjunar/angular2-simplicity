import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsFilterComponent } from './as-filter.component';

describe('AsFilterComponent', () => {
  let component: AsFilterComponent;
  let fixture: ComponentFixture<AsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
