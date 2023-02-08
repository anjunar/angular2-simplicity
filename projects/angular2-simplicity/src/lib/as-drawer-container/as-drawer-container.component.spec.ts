import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsDrawerContainerComponent } from './as-drawer-container.component';

describe('AsDrawerContainerComponent', () => {
  let component: AsDrawerContainerComponent;
  let fixture: ComponentFixture<AsDrawerContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsDrawerContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsDrawerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
