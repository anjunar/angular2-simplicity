import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMetaFormComponent } from './app-meta-form.component';

describe('AppMetaFormComponent', () => {
  let component: AppMetaFormComponent;
  let fixture: ComponentFixture<AppMetaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppMetaFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppMetaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
