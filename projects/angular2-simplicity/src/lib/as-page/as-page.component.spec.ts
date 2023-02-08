import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsPageComponent } from './as-page.component';

describe('AsPageComponent', () => {
  let component: AsPageComponent;
  let fixture: ComponentFixture<AsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
