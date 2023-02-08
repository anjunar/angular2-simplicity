import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsScrollbarHorizontalComponent } from './as-scrollbar-horizontal.component';

describe('AsScrollbarHorizontalComponent', () => {
  let component: AsScrollbarHorizontalComponent;
  let fixture: ComponentFixture<AsScrollbarHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsScrollbarHorizontalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsScrollbarHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
