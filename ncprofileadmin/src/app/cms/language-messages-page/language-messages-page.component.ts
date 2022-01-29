import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { compareText } from 'src/app/helpers/text-helper';
import { LanguageData, WebMessage } from 'src/app/models/web-message';
import { MessageTranslatorService } from 'src/app/services/message-translator.service';
import { AddWebMessageModalComponent } from './add-web-message-modal/add-web-message-modal.component';

@Component({
  selector: 'app-language-messages-page',
  templateUrl: './language-messages-page.component.html',
  styleUrls: ['./language-messages-page.component.styl']
})
export class LanguageMessagesPageComponent implements OnInit, OnDestroy {

  private subs: Subscription = new Subscription()

  webMessages: WebMessage[] = []
  selectableLanguages: string[] = []

  @ViewChild(AddWebMessageModalComponent) addModal:AddWebMessageModalComponent

  constructor(private msgTranslator: MessageTranslatorService) { }

  ngOnInit(): void {
    this.loadLanguageData()
  }

  loadLanguageData() {
    this.msgTranslator.getMessages({}).pipe(take(1)).subscribe((res: LanguageData[]) => {
      // clear and set selectable languages
      this.selectableLanguages.splice(0,this.selectableLanguages.length)
      res.forEach(l => {
        this.selectableLanguages.push(l.lang)
      })

      // parse to messages list
      this.webMessages = this.msgTranslator.parseWebMessages(res)

      // sort
      this.webMessages.sort((a, b) => compareText(a.key, b.key))
    })
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  onAddMessage(webMessage: WebMessage) {
    this.msgTranslator.addWebMessage(webMessage).pipe(take(1)).subscribe(res => {
      this.loadLanguageData()
      this.addModal.onSaveSuccess()
    })
  }

}
