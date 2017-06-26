import { Component, OnInit, Input } from '@angular/core';
import { NarrativeService } from '../Narrative/narrative-service';
import { INarrative } from '../Narrative/narrative';

@Component({
    selector: 'about-item',
    templateUrl: 'app/about/about-item.component.html',
    styleUrls: [ ]
})
export class AboutItemComponent implements OnInit {
    // @Input() Id: string;
    @Input() narrative: INarrative;
    errorMessage: string;

    constructor(
        private _service: NarrativeService
    ) { }

    ngOnInit(): void {
        // let s = null;

        // s =  this._service.getNarrative(this.Id);

        // s.subscribe(
        //     narrative => this.narrative = narrative,
        //     error => this.errorMessage = <any>error
        // );
        // debugger;

    }
}
