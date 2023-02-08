import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsViewportComponent } from './as-viewport.component';

describe('AsViewportComponent', () => {
  let component: AsViewportComponent;
  let fixture: ComponentFixture<AsViewportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsViewportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsViewportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
