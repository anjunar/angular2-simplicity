import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBasicComponent } from './app-basic.component';

describe('AppBasicComponent', () => {
  let component: AppBasicComponent;
  let fixture: ComponentFixture<AppBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppBasicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
