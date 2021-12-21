import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebElmAddPageComponent } from './web-elm-add-page.component';

describe('WebElmAddPageComponent', () => {
  let component: WebElmAddPageComponent;
  let fixture: ComponentFixture<WebElmAddPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebElmAddPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebElmAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
