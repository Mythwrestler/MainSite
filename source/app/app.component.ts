import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'casperinc-main',
    templateUrl: 'app/app.component.html',
    styles: [ ]
})

export class AppComponent implements OnInit {
    title = 'Casperinc';

    constructor(
        private router: Router, 
        private pageTitle: Title
    ) { }
    
    ngOnInit() {
        this.pageTitle.setTitle('Casperinc');
     }

    isActive(data: any[]): boolean {
        return this.router.isActive(
            this.router.createUrlTree(data),
            true);
    }

}