import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-select-asset-modal',
  templateUrl: './select-asset-modal.component.html',
  styleUrls: ['./select-asset-modal.component.styl']
})
export class SelectAssetModalComponent implements OnInit {

  _modalName: string;
  
  @Output()
  onCloseModal: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    $('#selectAssetModal').on('hidden.bs.modal', () => {
      this.onCloseModal.emit("close")
    });
  }

  @Input()
  get modalName() {
    return this._modalName;
  }

  set modalName(v: string) {
    console.log(v)
    this._modalName = v;
    this.onModalNameChange()
  }

  onModalNameChange() {
    if(!!this._modalName) { 
      $('#selectAssetModal').modal({show: true})
    } else {
      $('#selectAssetModal').modal({show: false})
    }
  }

}
