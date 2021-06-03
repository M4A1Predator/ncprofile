import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, Input, OnInit } from '@angular/core';
import { NavbarInfo } from 'src/app/core/models/navbar-info';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.styl']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  @Input()
  navbarInfo: NavbarInfo;

  ngOnInit(): void {}

}
