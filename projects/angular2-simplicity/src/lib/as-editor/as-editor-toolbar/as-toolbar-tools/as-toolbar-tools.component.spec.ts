import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsToolbarToolsComponent } from './as-toolbar-tools.component';

describe('AsToolbarToolsComponent', () => {
  let component: AsToolbarToolsComponent;
  let fixture: ComponentFixture<AsToolbarToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsToolbarToolsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsToolbarToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
