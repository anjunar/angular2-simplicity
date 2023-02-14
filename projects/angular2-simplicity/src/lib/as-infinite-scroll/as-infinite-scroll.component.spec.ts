import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsInfiniteScrollComponent } from './as-infinite-scroll.component';

describe('AsInfinityScrollComponent', () => {
  let component: AsInfiniteScrollComponent;
  let fixture: ComponentFixture<AsInfiniteScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsInfiniteScrollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsInfiniteScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
