import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebElmEditPageComponent } from './web-elm-edit-page.component';

describe('WebElmEditPageComponent', () => {
  let component: WebElmEditPageComponent;
  let fixture: ComponentFixture<WebElmEditPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebElmEditPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebElmEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
