import { Observable } from "rxjs/Rx";
import { Narrative, INarrative } from "./narrative";

export interface INarrativeService
{
  getNarratives(): Observable<INarrative[]>;
  getFilteredNarratives(filter: string): Observable<INarrative[]>;
  getNarrative(id: string): Observable<INarrative>;
  postNarrative(narrative: INarrative): Observable<INarrative>;
}
