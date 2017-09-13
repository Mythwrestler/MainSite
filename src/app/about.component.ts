import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { INarrative, Narrative } from './narrative';
import { NarrativeService } from './narrative-service';
import { AuthService } from './auth.service';

@Component({
    selector: 'about',
    templateUrl: 'about.component.html',
    styleUrls: [ ]
})
export class AboutComponent implements OnInit {
    title = 'About';
    narratives: Narrative[] = null;
    checkNarratives: Narrative[] = null;
    errorMessage: string = null;
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

