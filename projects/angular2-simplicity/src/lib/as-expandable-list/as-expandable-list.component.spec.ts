import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsExpandableListComponent } from './as-expandable-list.component';

describe('AsExpandableListComponent', () => {
  let component: AsExpandableListComponent;
  let fixture: ComponentFixture<AsExpandableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsExpandableListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsExpandableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
