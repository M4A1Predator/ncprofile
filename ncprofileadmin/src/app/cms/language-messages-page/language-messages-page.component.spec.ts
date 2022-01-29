import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageMessagesPageComponent } from './language-messages-page.component';

describe('LanguageMessagesPageComponent', () => {
  let component: LanguageMessagesPageComponent;
  let fixture: ComponentFixture<LanguageMessagesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageMessagesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageMessagesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
