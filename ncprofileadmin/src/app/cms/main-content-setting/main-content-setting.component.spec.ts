import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContentSettingComponent } from './main-content-setting.component';

describe('MainContentSettingComponent', () => {
  let component: MainContentSettingComponent;
  let fixture: ComponentFixture<MainContentSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainContentSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainContentSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
