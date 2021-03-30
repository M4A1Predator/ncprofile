import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginCred } from 'src/app/models/login-cred';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  username: string;
  password: string;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {

    // set form
    this.loginForm = new FormGroup({
      username: new FormControl(this.username, [
        Validators.required,
        Validators.minLength(4)]),
      password: new FormControl(this.password, [
        Validators.required,
        Validators.minLength(4)]),
    });
  }

  onSubmit() {
    if (this.loginForm.status !== 'VALID') {
      return;
    }

    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    const loginCred = new LoginCred(this.username, this.password);

    this.authService.requestToken(loginCred).subscribe(res => {
      localStorage.setItem('auth', JSON.stringify(res));
      this.router.navigate(['/']);
    });
  }

}
