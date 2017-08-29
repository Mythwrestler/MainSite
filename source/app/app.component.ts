import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from './Authentication/auth.service';

@Component({
    selector: 'casperinc-main',
    templateUrl: 'app/app.component.html',
    styles: [ ]
})

export class AppComponent implements OnInit {
    title = 'Casperinc';
    loggedIn = false;
    errorMessage: string;

    constructor(
        private router: Router,
        private pageTitle: Title,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.pageTitle.setTitle('Casperinc');
        this.authService.loggedIn$
            .subscribe(
                loggedIn => this.loggedIn = loggedIn,
                error => this.errorMessage = <any>error
            );
     }

    isActive(data: any[]): boolean {
        return this.router.isActive(
            this.router.createUrlTree(data),
            true);
    }

}
