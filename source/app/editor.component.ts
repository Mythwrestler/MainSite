import { Component, OnInit } from '@angular/core';
import { INarrative, Narrative } from './Narrative/Narrative';

@Component({
    selector: 'editor',
    templateUrl: './app/editor.component.html',
    // styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
    narrative: INarrative;
    newTag: string;

    constructor() { }

    ngOnInit() {

        this.narrative = new Narrative('', 'test Narrative', 'test narrative description', 'body', ['test1', 'test2']);
        this.narrative.bodyHtml = '<div> test <strong>test</strong></div>';
        this.narrative.tags = ['test1', 'test2'];
        this.newTag = '';
     }

    addTag () {
        let tag = this.newTag.trim().toLowerCase();
        if (!this.narrative.tags.includes(tag)) {
            this.narrative.tags.push(tag);
            debugger;
            this.newTag = '';
        }
    }

     dropTag (tag: string) {
         if (this.narrative.tags.includes(tag)) {
            this.narrative.tags = this.narrative.tags.filter(t => t !== tag);
        }
     }

}
