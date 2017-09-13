import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { INarrative, Narrative } from "./Narrative";
import { AuthHttp } from "./auth.http";
import { INarrativeService } from "./inarrative-service";

@Injectable()
export class NarrativeService implements INarrativeService {

  constructor(private http: AuthHttp) { }

  getNarratives(): Observable<INarrative[]> {
    let url = `${environment.casperincUrl}/mainsite/api/narratives`;
    return this.http.get(url)
      .map((response: Response) => <INarrative[]>response.json())
      .catch(this.handleError);
  }

  getFilteredNarratives(filter: string): Observable<INarrative[]> {
    let url = `${environment.casperincUrl}/mainsite/api/narratives?KeywordFilter=${filter.trim()}`;
    return this.http.get(url)
      .map((response: Response) => <INarrative[]>response.json())
      .catch(this.handleError);
  }

  getNarrative(id: string): Observable<INarrative> {
    let url = `${environment.casperincUrl}/mainsite/api/narratives/${id.trim()}`;
    return this.http.get(url)
      .map((response: Response) => <INarrative>response.json())
      .catch(this.handleError);
  }

  postNarrative(narrative: INarrative): Observable<INarrative> {
    let url = `${environment.casperincUrl}/mainsite/api/narratives}`;
    return this.http.post(url, narrative)
      .map((response: Response) => <INarrative>response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    // output errors to the console.
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }


}
