import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { INarrative } from "./Narrative";

@Injectable()
export class NarrativeService {

    // private baseUrl = 'https://www.casperinc.expert/api/narratives';  // web api URL
    private baseUrl = 'http://localhost:6054/api/narratives';  // web api URL


    constructor(private http: Http) { }

    // calls the [GET] /api/items/GetLatest/{n} Web API method to retrieve the latest items.
    getNarratives(): Observable<INarrative[]> {
        let url = this.baseUrl;
        return this.http.get(url)
            .map((response: Response) => <INarrative[]>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    // d
    getNarrative(id: string): Observable<INarrative> {
        let url = this.baseUrl + '/' + id;
        return this.http.get(url)
            .map((response: Response) => <INarrative>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getAboutNarratives(): Observable<INarrative[]> {
        return this.getNarratives()
        .map((narraitves:INarrative[]) =>
            narraitves.filter(n => n.tags.findIndex(t => t.keyWord === 'About') !== -1));
    }

    // // returns a viable RequestOptions object to handle Json requests
    // private getRequestOptions () {
    //     return new RequestOptions({
    //         headers: new Headers({
    //             'Content-Type': 'application/json'
    //         })
    //     });
    // }

    private handleError(error: Response) {
        // output errors to the console.
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }


}