import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsTabComponent } from './as-tab.component';

describe('AsTabComponent', () => {
  let component: AsTabComponent;
  let fixture: ComponentFixture<AsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
