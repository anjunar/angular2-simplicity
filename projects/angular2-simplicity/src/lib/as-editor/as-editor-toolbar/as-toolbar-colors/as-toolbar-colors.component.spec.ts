import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsToolbarColorsComponent } from './as-toolbar-colors.component';

describe('AsToolbarColorsComponent', () => {
  let component: AsToolbarColorsComponent;
  let fixture: ComponentFixture<AsToolbarColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsToolbarColorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsToolbarColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
