import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppImageBackgroundComponent } from './app-image-background.component';

describe('AppImageBackgroundComponent', () => {
  let component: AppImageBackgroundComponent;
  let fixture: ComponentFixture<AppImageBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppImageBackgroundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppImageBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
