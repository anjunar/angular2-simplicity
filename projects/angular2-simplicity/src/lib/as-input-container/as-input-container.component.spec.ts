import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsInputContainerComponent } from './as-input-container.component';

describe('AsInputContainerComponent', () => {
  let component: AsInputContainerComponent;
  let fixture: ComponentFixture<AsInputContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsInputContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsInputContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
