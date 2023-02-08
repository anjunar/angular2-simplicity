import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsDrawerComponent } from './as-drawer.component';

describe('AsDrawerComponent', () => {
  let component: AsDrawerComponent;
  let fixture: ComponentFixture<AsDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsDrawerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
