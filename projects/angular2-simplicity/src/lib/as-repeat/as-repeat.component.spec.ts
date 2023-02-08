import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsRepeatComponent } from './as-repeat.component';

describe('AsRepeatComponent', () => {
  let component: AsRepeatComponent;
  let fixture: ComponentFixture<AsRepeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsRepeatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsRepeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
