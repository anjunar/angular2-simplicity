import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsContextSizingComponent } from './as-context-sizing.component';

describe('AsContextSizingComponent', () => {
  let component: AsContextSizingComponent;
  let fixture: ComponentFixture<AsContextSizingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsContextSizingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsContextSizingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
