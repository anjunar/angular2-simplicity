import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsScrollAreaComponent } from './as-scroll-area.component';

describe('AsScrollAreaComponent', () => {
  let component: AsScrollAreaComponent;
  let fixture: ComponentFixture<AsScrollAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsScrollAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsScrollAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
