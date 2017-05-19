import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'about',
    templateUrl: 'app/about/about.component.html',
    styleUrls: [ ]
})
export class AboutComponent implements OnInit {
    title = 'About';

    items: Number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]

    constructor( 
        private pageTitle: Title
    ) { }
    
    ngOnInit() {
        this.pageTitle.setTitle('Casperinc | About');
     }
}