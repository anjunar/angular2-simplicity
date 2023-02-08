import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAdvancedComponent } from './app-advanced.component';

describe('AppAdvancedComponent', () => {
  let component: AppAdvancedComponent;
  let fixture: ComponentFixture<AppAdvancedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppAdvancedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppAdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
