import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsContextPaddingsComponent } from './as-context-paddings.component';

describe('AsContextPaddingsComponent', () => {
  let component: AsContextPaddingsComponent;
  let fixture: ComponentFixture<AsContextPaddingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsContextPaddingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsContextPaddingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
