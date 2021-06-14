import { ModelComponent } from './model/model.component';
import { Router } from '@angular/router';
import { LoadingService } from './../shared/loading.service';
import { ApiService } from './../shared/api.service';
import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { ThemePalette } from '@angular/material/core';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],

})
export class MoviesComponent implements OnInit {
  movies: any;
  count: number = 0
  previous: string;
  next: string;
  pageEvent: PageEvent;
  movieList = [];
  pageSize = 10;
  token: any;
  url: string = ''
  originalMovieList = [];
  lastSearch: string = '';
  theme = 'dark';
  checked: boolean;
  color: ThemePalette = 'accent';
  private unsubscribe$ = new Subject<void>();
  searchTerm$ = new Subject<string>();
  constructor(private apiService: ApiService,
    private loadingService: LoadingService,
    private router: Router,
    public dialog: MatDialog) { }


  ngOnInit() {
    this.applyTheme();
    this.searchFunction();
    this.getToken();
    this.getInitialListofMovies();
    this.getRetrigggerState();

  }
  applyTheme() {
    if (sessionStorage && sessionStorage.getItem('theme')) {
      this.theme = sessionStorage.getItem('theme')

    }
    else {
      this.theme = 'dark'

    }
    sessionStorage.setItem('theme', this.checked ? 'dark' : 'light')
    this.checked = this.theme == 'dark' ? true : false;
  }
  searchFunction() {
    this.searchTerm$
      .pipe(
        startWith(''),
        debounceTime(250),
        // start it of
        distinctUntilChanged(), // only emit when it actually changes
        switchMap(term =>
          this.getMovies(term)
        ))
      .subscribe(data => {
        this.movieList.push(data)
      })

  }

  getMovies(term) {
    let filterdMovies = []
    term = term.toLowerCase();
    if (term.length > 3) {
      this.lastSearch = term;
      let filteredData = this.originalMovieList.filter(function (filterObject) {
        return filterObject.title.toLowerCase().includes(term)
      });
      if (filteredData.length) {
        filterdMovies = filteredData;
      }
    }
    else {
      this.lastSearch = ''
      filterdMovies = this.originalMovieList;
    }
    this.movieList = [];
    return filterdMovies;
  }
  getToken() {
    let userToken = localStorage.getItem('token');
    let token = JSON.parse(JSON.stringify(userToken!))
    this.token = token
  }
  getInitialListofMovies() {

    this.apiService.initialMovieList(this.token).pipe(takeUntil(this.unsubscribe$))
      .subscribe((response: any) => {
        if (response) {
          this.prepareData(response)
        }
      }, (error: any) => {
        console.error(error)
      });
  }
  getRetrigggerState() {
    this.loadingService.retriggerAPI.pipe(takeUntil(this.unsubscribe$))
      .subscribe((status: any) => {
        if (status) {
          if (this.url) {
            this.triggerMovieApi();
          }
          else {
            this.getInitialListofMovies();
          }
        }
      }, (error: any) => {
        console.error(error)
      });
  }
  prepareData(response) {
    if (response) {
      this.count = response.count
      this.previous = response.previous;
      this.next = response.next;
      this.movieList = response.results;
      this.originalMovieList = response.results;
      if (this.lastSearch != '') {
        this.getMovies(this.lastSearch)
      }
    }
  }
  goToDetails(movie) {
    this.dialog.open(ModelComponent, {
      data: movie
    });
  }
  handlePageEvent(event) {
    console.log(event)
    if (event.previousPageIndex > event.pageIndex) {
      this.url = this.previous;
    }
    else if (event.previousPageIndex < event.pageIndex) {
      this.url = this.next
    }
    if (this.movieList.length < this.count) {

      this.triggerMovieApi()

    }
  }
  triggerMovieApi() {
    this.apiService.movieList(this.token, this.url).pipe(takeUntil(this.unsubscribe$))
      .subscribe((response: any) => {
        if (response) {
          this.prepareData(response)
        }
      }, (error: any) => {
        console.error(error)
      });
  }
  backToLogin() {
    this.router.navigate(['/login'])
  }
  toggleChange(event) {
    console.log(event);
    this.checked = event.checked
    if (this.checked) {
      this.color = 'accent'
    }
    else {
      this.color = 'primary'
    }
    sessionStorage.setItem('theme', this.checked ? 'dark' : 'light')
  }
  // onSetTheme(theme) {
  //   this.overlayContainer.getContainerElement().classList.add(theme);
  //   this.componentCssClass = theme;
  // }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }
}
