import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsToolbarComponent } from './as-toolbar.component';

describe('AsToolbarComponent', () => {
  let component: AsToolbarComponent;
  let fixture: ComponentFixture<AsToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsToolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
