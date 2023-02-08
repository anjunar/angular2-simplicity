import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsContextFlexBoxComponent } from './as-context-flex-box.component';

describe('AsContextFlexBoxComponent', () => {
  let component: AsContextFlexBoxComponent;
  let fixture: ComponentFixture<AsContextFlexBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsContextFlexBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsContextFlexBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
