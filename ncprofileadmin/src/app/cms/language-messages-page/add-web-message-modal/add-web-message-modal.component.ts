import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { WebMessage } from 'src/app/models/web-message';

declare const $: any;

@Component({
  selector: 'app-add-web-message-modal',
  templateUrl: './add-web-message-modal.component.html',
  styleUrls: ['./add-web-message-modal.component.styl']
})
export class AddWebMessageModalComponent implements OnInit {

  addMsgForm = this.fb.group({
    key: ['', Validators.required],
    language: ['', Validators.required],
    value: ['', Validators.required]
  })
  isSubmitted = false;

  @Input()
  selectableLanguages: string[]

  @Output()
  addMessage: EventEmitter<WebMessage> = new EventEmitter()

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSave(): void {
    this.isSubmitted = true
    if (!this.addMsgForm.valid) {
      this.isSubmitted = false
      return
    }

    const newWebMessage = new WebMessage()
    newWebMessage.key = this.addMsgForm.value["key"]
    newWebMessage.value = this.addMsgForm.value["value"]
    newWebMessage.language = this.addMsgForm.value["language"]

    this.addMessage.emit(newWebMessage)
  }

  onSaveSuccess() {
    this.addMsgForm.reset()
    this.isSubmitted = false
    $('#AddWebMessageModal').modal('hide')
  }

}
