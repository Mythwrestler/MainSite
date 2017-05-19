import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import {AboutItem} from './about-item';

@Injectable()
export class ItemService {

    private baseUrl = 'https://www.casperinc.expert/api/';  // web api URL

    constructor(private http: Http) { }

    // calls the [GET] /api/items/GetLatest/{n} Web API method to retrieve the latest items.
    getAboutItems() {
        let url = this.baseUrl + 'MainSite/AboutItems/';
        return this.http.get(url)
            .map(response => response.json())
            .catch(this.handleError);
    }

    
    // returns a viable RequestOptions object to handle Json requests
    private getRequestOptions () {
        return new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
    }

    private handleError(error: Response) {
        // output errors to the console.
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}