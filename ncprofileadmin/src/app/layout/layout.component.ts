import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.styl']
})
export class LayoutComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.checkToken()
  }

  checkToken() {
    this.authService.verifyToken().subscribe(res => {
      if (res === false) {
        this.router.navigate(['/login'])
      }
    }, err => {
      this.router.navigate(['/login'])
    })
  }

}
