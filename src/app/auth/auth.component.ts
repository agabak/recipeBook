import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../share/alert/alert.component';
import { PlaceholderDirective } from '../share/helpers/placeholder.directive';
import { AuthService, ResponseAuthData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthCompnent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  private compSub: Subscription;

  constructor(private authService: AuthService, 
    private router: Router,
    private componentFactoryResover: ComponentFactoryResolver) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onHandleErrorClose() {
    this.error = null
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
        this.showErrorAlert(errorMessage);
      }
    );
  }

  private showErrorAlert(errorMessage: string) {

    const alertComponent = 
    this.componentFactoryResover.resolveComponentFactory(AlertComponent);
     
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear(); // clear all other alert before binding a new one

    const componetRef =  hostViewContainerRef.createComponent(alertComponent);
    componetRef.instance.message = errorMessage;
    this.compSub = componetRef.instance.close.subscribe(() => {
      this.compSub.unsubscribe();
       hostViewContainerRef.clear()
    })
  }
}
