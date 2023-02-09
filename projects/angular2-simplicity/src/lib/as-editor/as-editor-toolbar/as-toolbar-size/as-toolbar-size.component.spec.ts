import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsToolbarSizeComponent } from './as-toolbar-size.component';

describe('AsToolbarSizeComponent', () => {
  let component: AsToolbarSizeComponent;
  let fixture: ComponentFixture<AsToolbarSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsToolbarSizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsToolbarSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
