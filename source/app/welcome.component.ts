import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'welcome',
    templateUrl: 'app/welcome.component.html',
    styleUrls: [ ]
})
export class WelcomeComponent implements OnInit {
    title = 'Welcome';

    constructor( 
        private pageTitle: Title
    ) { }
    
    ngOnInit() {
        this.pageTitle.setTitle('Casperinc | Welcome');
     }

}