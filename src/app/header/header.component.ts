import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../share/data-storage.service';

@Component({
    selector:'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header-style.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
    isAuthecated = false;
    userSub: Subscription;

    constructor(private datastorageService: DataStorageService,
         private authService: AuthService, private router: Router){}

    ngOnInit(): void {
      this.userSub = this.authService.user.subscribe(user => {
           this.isAuthecated = !!user;
      });
    }

    ngOnDestroy(): void {
      this.userSub.unsubscribe();
    }

    logout() {
     this.authService.logout();
    }

   saveRecipes() {
        this.datastorageService.storeRecipe();
   }

   onfetchRecipes() {
    this.datastorageService.onFetchData().subscribe();
   }
 
}