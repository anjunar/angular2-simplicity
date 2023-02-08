import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsContextComponent } from './as-context.component';

describe('AsContextComponent', () => {
  let component: AsContextComponent;
  let fixture: ComponentFixture<AsContextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsContextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
