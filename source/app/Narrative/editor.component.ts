import { Component, OnInit, Input } from '@angular/core';
import { INarrative, Narrative } from './Narrative';
import { AuthService } from '../Authentication/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NarrativeService } from './narrative-service';

@Component({
    selector: 'editor',
    templateUrl: './app/Narrative/editor.component.html',
    // styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
    narrativeId: string;
    loggedIn = false;
    narrative: INarrative = null;
    newKeyword: string;
    errorMessage: string;

    constructor(
        private authService: AuthService,
        private activatedRoute: ActivatedRoute,
        private narrativeService: NarrativeService,
        private router: Router
    ) { }

    ngOnInit() {
        this.authService.loggedIn$.subscribe(
            loggedIn => this.loggedIn = loggedIn,
            error => this.errorMessage = <any>error
        );

        if (!this.loggedIn) {
            this.router.navigate(['']);
        }

        this.narrativeId = this.activatedRoute.snapshot.params['narrativeId'];

        this.narrativeService.getNarrative(this.narrativeId)
            .subscribe(
            narrative => this.narrative = narrative,
            error => this.errorMessage = <any>error
            );

        if (this.narrative == null) {
            this.narrative = new Narrative('', 'test Narrative', 'test narrative description', 'body', ['test1', 'test2']);
            this.narrative.bodyHtml = '<div> test <strong>test</strong></div>';
            this.narrative.keywords = ['test1', 'test2'];
            this.newKeyword = '';

        }
    }

    addTag() {
        let tag = this.newKeyword.trim().toLowerCase();
        if (!this.narrative.keywords.includes(tag)) {
            this.narrative.keywords.push(tag);
            this.newKeyword = '';
        }
    }

    dropTag(tag: string) {
        if (this.narrative.keywords.includes(tag)) {
            this.narrative.keywords = this.narrative.keywords.filter(t => t !== tag);
        }
    }

}
