import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsMetaFormComponent } from './as-meta-form.component';

describe('AsMetaFormComponent', () => {
  let component: AsMetaFormComponent;
  let fixture: ComponentFixture<AsMetaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsMetaFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsMetaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
