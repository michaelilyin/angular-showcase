import {Component, OnInit} from '@angular/core';
import {TitleService} from './title.service';
import {shareReplay} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title$!: Observable<string>;

  constructor(private titleService: TitleService) {
  }

  ngOnInit(): void {
    this.title$ = this.titleService.getTitle().pipe(shareReplay(1));
  }
}
