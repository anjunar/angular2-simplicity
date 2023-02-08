import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsPagesComponent } from './as-pages.component';

describe('AsPagesComponent', () => {
  let component: AsPagesComponent;
  let fixture: ComponentFixture<AsPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
