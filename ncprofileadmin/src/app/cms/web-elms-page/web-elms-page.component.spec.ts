import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebElmsPageComponent } from './web-elms-page.component';

describe('WebElmsPageComponent', () => {
  let component: WebElmsPageComponent;
  let fixture: ComponentFixture<WebElmsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebElmsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebElmsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
