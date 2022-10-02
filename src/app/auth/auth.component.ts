import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, ResponseAuthData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthCompnent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  Login(Login: NgForm) {

    let authObs: Observable<ResponseAuthData>
    if (!Login.valid) return;

    this.isLoading = true;
    if (this.isLoginMode) {
      
      authObs = this.authService.signIn(Login.value.email, Login.value.password);
    } else {
      authObs = this.authService.signup(Login.value.email, Login.value.password)

    }

    authObs.subscribe(
      (respose) => {
        this.isLoading = false;
        this.router.navigate(['/recipes'])
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
  }
}
