import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementTextboxComponent } from './element-textbox.component';

describe('ElementTextboxComponent', () => {
  let component: ElementTextboxComponent;
  let fixture: ComponentFixture<ElementTextboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementTextboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
