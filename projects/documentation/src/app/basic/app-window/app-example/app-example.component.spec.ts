import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppExampleComponent } from './app-example.component';

describe('AppExampleComponent', () => {
  let component: AppExampleComponent;
  let fixture: ComponentFixture<AppExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppExampleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
