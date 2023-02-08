import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsEditorToolbarComponent } from './as-editor-toolbar.component';

describe('AsEditorToolbarComponent', () => {
  let component: AsEditorToolbarComponent;
  let fixture: ComponentFixture<AsEditorToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsEditorToolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsEditorToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
