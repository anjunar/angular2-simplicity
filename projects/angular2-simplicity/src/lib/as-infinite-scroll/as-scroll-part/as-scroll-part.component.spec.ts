import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsScrollPartComponent } from './as-scroll-part.component';

describe('AsScrollPartComponent', () => {
  let component: AsScrollPartComponent;
  let fixture: ComponentFixture<AsScrollPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsScrollPartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsScrollPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
