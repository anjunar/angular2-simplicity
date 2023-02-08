import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsDialogLinkComponent } from './as-dialog-link.component';

describe('AsDialogLinkComponent', () => {
  let component: AsDialogLinkComponent;
  let fixture: ComponentFixture<AsDialogLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsDialogLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsDialogLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
