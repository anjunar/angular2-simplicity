import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppExpandableListComponent } from './app-expandable-list.component';

describe('AppExpandableListComponent', () => {
  let component: AppExpandableListComponent;
  let fixture: ComponentFixture<AppExpandableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppExpandableListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppExpandableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
