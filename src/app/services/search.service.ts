import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, catchError, of } from 'rxjs';
import { SearchResult } from '../models/search-result.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  search(keywords: string): Observable<SearchResult> {
    const url = `https://api.alquran.cloud/v1/search/${keywords}/all/en.sahih`;
    return this.http.get<any>(url).pipe(
      map((res) => {
        // Handle successful responses
        if (res && res.data) {
          return res.data;
        } else {
          // Return empty result set if no data is found
          return { count: 0, matches: [] };
        }
      }),
      // Handle errors and cases where keywords are not found
      catchError(() => {
        return of({ count: 0, matches: [] }); // Return empty result on error
      })
    );
  }
}
