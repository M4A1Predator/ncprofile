import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWebMessageModalComponent } from './edit-web-message-modal.component';

describe('EditWebMessageModalComponent', () => {
  let component: EditWebMessageModalComponent;
  let fixture: ComponentFixture<EditWebMessageModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWebMessageModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWebMessageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
