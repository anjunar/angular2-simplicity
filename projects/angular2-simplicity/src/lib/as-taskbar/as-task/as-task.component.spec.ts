import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsTaskComponent } from './as-task.component';

describe('AsTaskComponent', () => {
  let component: AsTaskComponent;
  let fixture: ComponentFixture<AsTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
