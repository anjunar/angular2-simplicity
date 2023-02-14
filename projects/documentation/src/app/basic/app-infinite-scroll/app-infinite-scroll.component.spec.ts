import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInfiniteScrollComponent } from './app-infinite-scroll.component';

describe('AppInfinityScrollComponent', () => {
  let component: AppInfiniteScrollComponent;
  let fixture: ComponentFixture<AppInfiniteScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppInfiniteScrollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppInfiniteScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
