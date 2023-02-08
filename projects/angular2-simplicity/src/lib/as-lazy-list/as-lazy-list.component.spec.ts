import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsLazyListComponent } from './as-lazy-list.component';

describe('AsListComponent', () => {
  let component: AsLazyListComponent;
  let fixture: ComponentFixture<AsLazyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsLazyListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsLazyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
