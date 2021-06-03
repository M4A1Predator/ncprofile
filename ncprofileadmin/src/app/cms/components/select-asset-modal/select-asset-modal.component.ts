import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AssetFile } from 'src/app/models/asset-file';
import { CmsService } from 'src/app/services/cms.service';

declare const $: any;

@Component({
  selector: 'app-select-asset-modal',
  templateUrl: './select-asset-modal.component.html',
  styleUrls: ['./select-asset-modal.component.styl']
})
export class SelectAssetModalComponent implements OnInit, OnDestroy {

  subs: Subscription = new Subscription();
  _modalName: string;

  @Output()
  onCloseModal: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  selectAssetEmit: EventEmitter<AssetFile> = new EventEmitter<AssetFile>();

  assets: AssetFile[];

  constructor(private cmsService: CmsService) { }

  ngOnInit(): void {
    // set onclose event
    $('#selectAssetModal').on('hidden.bs.modal', () => {
      this.onCloseModal.emit('close');
    });

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  @Input()
  get modalName() {
    return this._modalName;
  }

  set modalName(v: string) {
    this._modalName = v;
    this.onModalNameChange();
  }

  onModalNameChange() {
    if (!!this._modalName) {
      $('#selectAssetModal').modal({show: true});
      // load assets data
      this.subs.add(
        this.cmsService.getAssets().pipe(take(1)).subscribe(data => {
          this.assets = data;
        }, err => {
        })
      );

    } else {
      $('#selectAssetModal').modal('hide');
    }
  }

  onSelectAsset(e: any, asset: AssetFile) {
    this.selectAssetEmit.emit(asset);
  }

}
