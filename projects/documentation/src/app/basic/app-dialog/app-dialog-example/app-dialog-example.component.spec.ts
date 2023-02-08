import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDialogExampleComponent } from './app-dialog-example.component';

describe('AppDialogExampleComponent', () => {
  let component: AppDialogExampleComponent;
  let fixture: ComponentFixture<AppDialogExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppDialogExampleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDialogExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
