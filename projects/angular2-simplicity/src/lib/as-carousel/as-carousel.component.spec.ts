import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsCarouselComponent } from './as-carousel.component';

describe('AsCarouselComponent', () => {
  let component: AsCarouselComponent;
  let fixture: ComponentFixture<AsCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
