import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsMetaTableComponent } from './as-meta-table.component';

describe('AsMetaTableComponent', () => {
  let component: AsMetaTableComponent;
  let fixture: ComponentFixture<AsMetaTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsMetaTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsMetaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
