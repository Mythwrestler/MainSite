import { Component, OnInit } from '@angular/core';
import { INarrative, Narrative } from './Narrative/Narrative';

@Component({
    selector: 'editor',
    templateUrl: './app/editor.component.html',
    // styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
    narrative: INarrative;

    constructor() { }

    ngOnInit() {

        this.narrative = new Narrative('New Narrative', '', '', '', ['test']);
        this.narrative.bodyHtml = '<div> test <strong>test</strong></div>';
     }
}
