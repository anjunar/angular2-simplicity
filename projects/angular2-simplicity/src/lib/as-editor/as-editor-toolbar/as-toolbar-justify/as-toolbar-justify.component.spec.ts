import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsToolbarJustifyComponent } from './as-toolbar-justify.component';

describe('AsToolbarJustifyComponent', () => {
  let component: AsToolbarJustifyComponent;
  let fixture: ComponentFixture<AsToolbarJustifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsToolbarJustifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsToolbarJustifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
