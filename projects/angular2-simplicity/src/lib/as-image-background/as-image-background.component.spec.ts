import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsImageBackgroundComponent } from './as-image-background.component';

describe('AsImageBackgroundComponent', () => {
  let component: AsImageBackgroundComponent;
  let fixture: ComponentFixture<AsImageBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsImageBackgroundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsImageBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
