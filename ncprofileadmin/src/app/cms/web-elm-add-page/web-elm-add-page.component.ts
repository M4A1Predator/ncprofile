import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { WebElementTypeEnum } from 'src/app/constants/web-element-type-enum';
import { WebElement } from 'src/app/models/web-element';
import { isValidJSON } from 'src/app/helpers/text-helper';
import { CmsService } from 'src/app/services/cms.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-web-elm-add-page',
  templateUrl: './web-elm-add-page.component.html',
  styleUrls: ['./web-elm-add-page.component.styl']
})
export class WebElmAddPageComponent implements OnInit {

  isSubmitted = false

  addWebElmForm = this.fb.group({
    elmName: ['', Validators.required],
    type: ['JSON', Validators.required],
  })

  currentDataType: string = 'JSON'

  webElm: WebElement = new WebElement()

  constructor(private fb: FormBuilder,
      private cmsService: CmsService,
      private router: Router) { }

  ngOnInit(): void {
    this.webElm.name = 'new-web-elm'
    this.webElm.type = WebElementTypeEnum.JSON
  }

  changeDataType() {
    this.currentDataType = this.addWebElmForm.get('type').value
    this.webElm.type = this.currentDataType as WebElementTypeEnum
  }

  submit() {
    this.isSubmitted = true

    // check validation
    if (!this.addWebElmForm.valid) {
      this.isSubmitted = false
      return;
    }

    // validate json if needed
    // if (this.currentDataType == WebElementTypeEnum.JSON
    //     && !this.webElm.data) {
    //   return
    // }

    // new web-elm
    // const webElmReqBody = {
    //   name: this.addWebElmForm.get('elmName').value,
    //   type: this.currentDataType,
    //   data: this.webElm.data
    // }
    const newWebElm = new WebElement()
    newWebElm.name = this.addWebElmForm.get('elmName').value,
    newWebElm.type = this.webElm.type
    newWebElm.data = this.webElm.data

    console.log(newWebElm)
    this.cmsService.addWebElm(newWebElm).subscribe(res => {
      this.router.navigate(['/contents'])
    }) 
  }
}
