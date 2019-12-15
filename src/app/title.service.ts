import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor(private http: HttpClient) {
  }

  getTitle(): Observable<string> {
    return this.http.get<{ title: string }>('/title')
      .pipe(map(resp => {
        return resp.title;
      }));
  }
}
