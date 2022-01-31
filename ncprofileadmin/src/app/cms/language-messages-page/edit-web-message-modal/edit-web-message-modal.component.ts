import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { WebMessage } from 'src/app/models/web-message';

declare const $ : any

@Component({
  selector: 'app-edit-web-message-modal',
  templateUrl: './edit-web-message-modal.component.html',
  styleUrls: ['./edit-web-message-modal.component.styl']
})
export class EditWebMessageModalComponent implements OnInit, OnChanges {

  isSubmitted = false

  @Input()
  selectableLanguages: string[]

  @Input()
  webMessage: WebMessage;

  @Output()
  editMessage: EventEmitter<WebMessage> = new EventEmitter()

  editMsgForm = this.fb.group({
    key: ['', Validators.required],
    language: ['', Validators.required],
    value: ['', Validators.required]
  })

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
      const prevWebMsg = changes.webMessage.previousValue as WebMessage
      const currentWebMsg = changes.webMessage.currentValue as WebMessage
      if (currentWebMsg) {
        this.editMsgForm.get("key").setValue(currentWebMsg.key)
        this.editMsgForm.get("language").setValue(currentWebMsg.language)
        this.editMsgForm.get("value").setValue(currentWebMsg.value)
      } else {
        this.editMsgForm.reset()
      }
  }

  onSave() {
    this.isSubmitted = true
    if (!this.editMsgForm.valid) {
      this.isSubmitted = false
      return
    }

    const editedWebMsg = new WebMessage()
    editedWebMsg.key = this.editMsgForm.get("key").value
    editedWebMsg.language = this.editMsgForm.get("language").value
    editedWebMsg.value = this.editMsgForm.get("value").value

    this.editMessage.emit(editedWebMsg)
  }

  onSaveSuccess() {
    this.isSubmitted = false
    $('#EditWebMessageModal').modal('hide')
  }

}
