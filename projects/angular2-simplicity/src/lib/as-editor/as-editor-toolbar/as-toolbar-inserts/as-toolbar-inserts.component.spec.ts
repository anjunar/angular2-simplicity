import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsToolbarInsertsComponent } from './as-toolbar-inserts.component';

describe('AsToolbarInsertsComponent', () => {
  let component: AsToolbarInsertsComponent;
  let fixture: ComponentFixture<AsToolbarInsertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsToolbarInsertsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsToolbarInsertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
