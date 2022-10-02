import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";
 // firebase
export interface ResponseAuthData {
    kind: string
    idToken: string	 //A Firebase Auth ID token for the newly created user.
    email: string	//The email for the newly created user.
    refreshToken: string	//A Firebase Auth refresh token for the newly created user.
    expiresIn: string	//The number of seconds in which the ID token expires.
    localId: string	//The uid of the newly created user.
    registered: boolean	//Whether the email is for an existing account.
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    authUrl:string;
    signInUrl:string;

    user = new BehaviorSubject<User>(null);
    private tokenExperationTimer:any;

    constructor(private http: HttpClient, private router: Router) { }

    signup(email: string, password: string) {
        return this.http.post<ResponseAuthData>(this.authUrl, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(respose => {
            this.getUser(respose);
        }));
    }

    signIn(email: string, password: string) {
        const user = this.autoLogin();
        return this.http.post<ResponseAuthData>(this.signInUrl, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(response => {
            this.getUser(response);
        }));
    }

    autoLogin() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (!userData) return;
        console.log();
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExperationDate))
        if(loadedUser.token) {
            const experationDuration = new Date(userData._tokenExperationDate).getTime() - new Date().getTime();
            this.autoLogout(experationDuration);
            this.user.next(loadedUser);
        }
              
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExperationTimer)
             clearTimeout(this.tokenExperationTimer);
        this.tokenExperationTimer = null
    }

    autoLogout(experationDuration: number) {
     this.tokenExperationTimer =   setTimeout(() => {
          this.logout();
        }, experationDuration)
    }

    private getUser(response: ResponseAuthData) {
        const experationTimeInMillsec = +response.expiresIn * 1000;
        const user = new User(response.email, response.localId, response.idToken,
            new Date(new Date().getTime() + experationTimeInMillsec))
        this.user.next(user);
        this.autoLogout(experationTimeInMillsec);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let errorMessage = 'Unknown Error Accoured';
        if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorResponse);
        }
        switch (errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'The email address is already in use by another account.';

            case 'OPERATION_NOT_ALLOWED':
                errorMessage = 'Password sign-in is disabled for this project.';

            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
            case 'INVALID_PASSWORD':
                errorMessage = 'The password is invalid or the user does not have a password';
            case 'USER_DISABLED':
                errorMessage = 'The user account has been disabled by an administrator.';
        }
        return throwError(errorMessage);
    }
}