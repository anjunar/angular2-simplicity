import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsTaskbarComponent } from './as-taskbar.component';

describe('AsTaskbarComponent', () => {
  let component: AsTaskbarComponent;
  let fixture: ComponentFixture<AsTaskbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsTaskbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsTaskbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
