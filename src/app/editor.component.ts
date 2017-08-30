import { Component, OnInit, Input } from '@angular/core';
import { INarrative, Narrative } from './narrative';
import { AuthService } from './auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NarrativeService } from './narrative-service';

@Component({
  selector: 'editor',
  templateUrl: 'editor.component.html'
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

    if (this.narrativeId != null && this.narrativeId !== "") {
      this.narrativeService.getNarrative(this.narrativeId)
        .subscribe(
        narrative => this.narrative = narrative,
        error => this.errorMessage = <any>error
        );
    } else {
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
