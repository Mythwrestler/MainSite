import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { INarrative } from '../Narrative/Narrative';
import { NarrativeService } from '../Narrative/narrative-service';

@Component({
    selector: 'about',
    templateUrl: 'app/about/about.component.html',
    styleUrls: [ ]
})
export class AboutComponent implements OnInit {
    title = 'About';
    narratives: INarrative[];
    checkNarratives: INarrative[];
    errorMessage: string;

    constructor(
        private pageTitle: Title,
        private _narrativeService: NarrativeService
    ) { }

    ngOnInit() {
        let s = null;

        s = this._narrativeService.getFilteredNarratives('about');

        s.subscribe(
            narratives => this.narratives = narratives,
            error => this.errorMessage = <any>error
        );

        this.checkNarratives = this.narratives;

        this.pageTitle.setTitle('Casperinc | About');
    }

}

