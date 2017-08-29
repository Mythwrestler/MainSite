import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { INarrative, Narrative } from '../Narrative/Narrative';
import { NarrativeService } from '../Narrative/narrative-service';
import { AuthService } from '../Authentication/auth.service';

@Component({
    selector: 'about',
    templateUrl: 'app/about/about.component.html',
    styleUrls: [ ]
})
export class AboutComponent implements OnInit {
    title = 'About';
    narratives: Narrative[];
    checkNarratives: Narrative[];
    errorMessage: string;
    loggedIn = false;

    constructor(
        private pageTitle: Title,
        private _narrativeService: NarrativeService,
        private _authService: AuthService
    ) { }

    ngOnInit() {
        let s = null;

        s = this._narrativeService.getFilteredNarratives('about');

        s.subscribe(
            narratives => this.narratives = narratives,
            error => this.errorMessage = <any>error
        );


        this._authService.loggedIn$.subscribe(
            loggedIn => this.loggedIn = loggedIn,
            error => this.errorMessage = <any>error
          );

        this.pageTitle.setTitle('Casperinc | About');

    }

}

