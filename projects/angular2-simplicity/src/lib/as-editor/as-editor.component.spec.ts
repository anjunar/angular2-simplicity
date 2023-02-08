import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsEditorComponent } from './as-editor.component';

describe('AsEditorComponent', () => {
  let component: AsEditorComponent;
  let fixture: ComponentFixture<AsEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
