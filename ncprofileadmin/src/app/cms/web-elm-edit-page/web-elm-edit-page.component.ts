import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { WebElementTypeEnum } from 'src/app/constants/web-element-type-enum';
import { WebElement } from 'src/app/models/web-element';
import { CmsService } from 'src/app/services/cms.service';

@Component({
  selector: 'app-web-elm-edit-page',
  templateUrl: './web-elm-edit-page.component.html',
  styleUrls: ['./web-elm-edit-page.component.styl']
})
export class WebElmEditPageComponent implements OnInit {

  isSubmitted = false
  isLoaded = false
  formMsg: string;

  editWebElmForm = this.fb.group({
    elmName: ['', Validators.required],
    type: ['JSON', Validators.required],
  })

  webElm: WebElement;

  currentDataType: string = 'JSON'

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private cmsService: CmsService) { }

  ngOnInit(): void {
    this.route.params.pipe(concatMap(params => {
        return of(params)
      }),
      concatMap(params => {
        return this.cmsService.getWebElmByName(params.elmName)
      })
    ).subscribe((res: WebElement) => { 
      this.webElm = res
      this.currentDataType = this.webElm.type

      // set loaded values
      this.editWebElmForm.get("elmName").setValue(this.webElm.name)
      this.editWebElmForm.get("type").setValue(this.webElm.type)

      this.isLoaded = true
    })
  }

  changeDataType() {
    this.currentDataType = this.editWebElmForm.get('type').value
    this.webElm.type = this.currentDataType as WebElementTypeEnum
  }

  submit() {
    this.isSubmitted = true
    this.cmsService.addWebElm(this.webElm).subscribe(res => {
      this.formMsg = "saved"
      this.isSubmitted = false
    })
  }

}
