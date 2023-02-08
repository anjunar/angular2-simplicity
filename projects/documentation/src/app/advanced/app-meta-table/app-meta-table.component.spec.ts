import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMetaTableComponent } from './app-meta-table.component';

describe('AppMetaTableComponent', () => {
  let component: AppMetaTableComponent;
  let fixture: ComponentFixture<AppMetaTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppMetaTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppMetaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
