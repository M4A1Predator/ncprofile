import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAssetModalComponent } from './select-asset-modal.component';

describe('SelectAssetModalComponent', () => {
  let component: SelectAssetModalComponent;
  let fixture: ComponentFixture<SelectAssetModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectAssetModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAssetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
