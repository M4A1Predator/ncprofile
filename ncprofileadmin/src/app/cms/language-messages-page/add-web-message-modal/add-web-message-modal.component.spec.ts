import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWebMessageModalComponent } from './add-web-message-modal.component';

describe('AddWebMessageModalComponent', () => {
  let component: AddWebMessageModalComponent;
  let fixture: ComponentFixture<AddWebMessageModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWebMessageModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWebMessageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
