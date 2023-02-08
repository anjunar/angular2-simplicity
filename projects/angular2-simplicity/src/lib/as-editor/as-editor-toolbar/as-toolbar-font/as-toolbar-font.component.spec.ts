import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsToolbarFontComponent } from './as-toolbar-font.component';

describe('AsToolbarFontComponent', () => {
  let component: AsToolbarFontComponent;
  let fixture: ComponentFixture<AsToolbarFontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsToolbarFontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsToolbarFontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
