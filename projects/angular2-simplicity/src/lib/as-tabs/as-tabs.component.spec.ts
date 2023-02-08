import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsTabsComponent } from './as-tabs.component';

describe('AsTabsComponent', () => {
  let component: AsTabsComponent;
  let fixture: ComponentFixture<AsTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
