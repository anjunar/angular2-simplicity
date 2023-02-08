import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsLazySelectComponent } from './as-lazy-select.component';

describe('AsLazySelectComponent', () => {
  let component: AsLazySelectComponent;
  let fixture: ComponentFixture<AsLazySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsLazySelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsLazySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
