import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditElmPageComponent } from './edit-elm-page.component';

describe('EditElmPageComponent', () => {
  let component: EditElmPageComponent;
  let fixture: ComponentFixture<EditElmPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditElmPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditElmPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
