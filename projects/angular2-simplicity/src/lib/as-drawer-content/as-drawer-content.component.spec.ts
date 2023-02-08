import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsDrawerContentComponent } from './as-drawer-content.component';

describe('AsDrawerContentComponent', () => {
  let component: AsDrawerContentComponent;
  let fixture: ComponentFixture<AsDrawerContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsDrawerContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsDrawerContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
