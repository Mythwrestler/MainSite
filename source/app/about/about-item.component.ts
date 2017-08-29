import { Component, OnInit, Input } from '@angular/core';
import { INarrative, Narrative } from '../Narrative/narrative';
import { Router } from "@angular/router";

@Component({
    selector: 'about-item',
    templateUrl: 'app/about/about-item.component.html',
    styleUrls: [ ]
})
export class AboutItemComponent implements OnInit {
    @Input() narrative: Narrative;
    @Input() loggedIn: boolean;

    constructor(
        private router: Router
    ) { }

    ngOnInit(): void { }

    editNarrative() {
        this.router.navigate(['editor', this.narrative.guidId]);
        return false;
    }

}
