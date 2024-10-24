import { Component } from '@angular/core';
import { SearchResult } from './models/search-result.model';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  keywords = '';
  results: SearchResult | undefined;

  loading = false;

  constructor(private searchService: SearchService) {}

  search() {
    this.results = undefined;
    this.loading = true;
    this.searchService
      .search(this.keywords.toLowerCase())
      .subscribe((result) => {
        this.results = result;
        this.loading = false;
      });
  }
}
