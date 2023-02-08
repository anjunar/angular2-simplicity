import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsScrollbarVerticalComponent } from './as-scrollbar-vertical.component';

describe('AsScrollbarVerticalComponent', () => {
  let component: AsScrollbarVerticalComponent;
  let fixture: ComponentFixture<AsScrollbarVerticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsScrollbarVerticalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsScrollbarVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
