import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { INarrative, Narrative } from "./Narrative";
import { AuthHttp } from "./auth.http";

@Injectable()
export class NarrativeService {

    private baseUrl = 'https://dev-web.casperinc.net/mainsite/api/narratives';  // web api URL

    constructor(private http: AuthHttp) { }

    // calls the [GET] /api/items/GetLatest/{n} Web API method to retrieve the latest items.
    getNarratives(): Observable<Narrative[]> {
        let url = this.baseUrl;
        return this.http.get(url)
            .map((response: Response) => <INarrative[]>response.json())
            // .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getFilteredNarratives(filter: string): Observable<Narrative[]> {
        let url = this.baseUrl + '?KeywordFilter=' + filter.trim();
        return this.http.get(url)
            .map((response: Response) => <INarrative[]>response.json())
            // .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getNarrative(id: string): Observable<Narrative> {
        let url = this.baseUrl + '/' + id.trim();
        return this.http.get(url)
            .map((response: Response) => <INarrative>response.json())
            // .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        // output errors to the console.
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }


}
