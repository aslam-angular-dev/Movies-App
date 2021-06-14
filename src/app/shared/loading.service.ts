import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();
  errorMessage: BehaviorSubject<any> = new BehaviorSubject(null);
  retriggerAPI: BehaviorSubject<any> = new BehaviorSubject(null);
  setLoading(isLoading: boolean) {
    this.isLoading.next(isLoading);
  }
  constructor() { }
}
