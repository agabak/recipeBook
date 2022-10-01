import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
   selector:'app-auth',
   templateUrl: './auth.component.html',
})
export class AuthCompnent {
 isLoginMode = true;

 onSwitchMode() {
   this.isLoginMode = !this.isLoginMode;
 }

 Login(Login: NgForm) {
   console.log(Login)
 }
}