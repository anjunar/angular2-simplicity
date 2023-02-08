import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsEditorContextComponent } from './as-editor-context.component';

describe('AsEditorContextComponent', () => {
  let component: AsEditorContextComponent;
  let fixture: ComponentFixture<AsEditorContextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsEditorContextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsEditorContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
