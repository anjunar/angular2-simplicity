import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsTableConfigurationComponent } from './as-table-configuration.component';

describe('AsTableConfigurationComponent', () => {
  let component: AsTableConfigurationComponent;
  let fixture: ComponentFixture<AsTableConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsTableConfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsTableConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
