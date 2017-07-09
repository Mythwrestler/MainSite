import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { INarrative } from "./Narrative";

@Injectable()
export class NarrativeService {

    // private baseUrl = 'https://www.casperinc.expert/api/narratives';  // web api URL
    private baseUrl = 'http://10.200.100.200/mainsite/api/narratives';  // web api URL

    constructor(private http: Http) { }

    // calls the [GET] /api/items/GetLatest/{n} Web API method to retrieve the latest items.
    getNarratives(): Observable<INarrative[]> {
        let url = this.baseUrl;
        return this.http.get(url)
            .map((response: Response) => <INarrative[]>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getFilteredNarratives(filter: string): Observable<INarrative[]> {
        let url = this.baseUrl + '?KeywordFilter=' + filter.trim();
        return this.http.get(url)
            .map((response: Response) => <INarrative[]>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getNarrative(id: string): Observable<INarrative> {
        let url = this.baseUrl + '/' + id.trim();
        return this.http.get(url)
            .map((response: Response) => <INarrative>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        // output errors to the console.
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }


}
