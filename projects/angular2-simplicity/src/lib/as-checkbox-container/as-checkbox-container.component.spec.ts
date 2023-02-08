import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsCheckboxContainerComponent } from './as-checkbox-container.component';

describe('AsCheckboxContainerComponent', () => {
  let component: AsCheckboxContainerComponent;
  let fixture: ComponentFixture<AsCheckboxContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsCheckboxContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsCheckboxContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
