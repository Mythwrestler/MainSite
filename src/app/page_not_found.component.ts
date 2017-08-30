import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'page_not_found',
    templateUrl: 'page_not_found.component.html',
    styleUrls: [ ]
})
export class PageNotFoundComponent implements OnInit {
    title = 'Page Not Found';

    constructor(
        private pageTitle: Title
    ) { }

    ngOnInit() {
        this.pageTitle.setTitle('Casperinc | Page Not Found');
     }
}
