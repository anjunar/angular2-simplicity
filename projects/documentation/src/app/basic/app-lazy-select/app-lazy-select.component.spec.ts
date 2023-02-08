import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLazySelectComponent } from './app-lazy-select.component';

describe('AppLazySelectComponent', () => {
  let component: AppLazySelectComponent;
  let fixture: ComponentFixture<AppLazySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppLazySelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppLazySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
