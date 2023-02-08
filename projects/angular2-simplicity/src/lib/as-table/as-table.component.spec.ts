import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsTableComponent } from './as-table.component';

describe('AsTableComponent', () => {
  let component: AsTableComponent;
  let fixture: ComponentFixture<AsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
