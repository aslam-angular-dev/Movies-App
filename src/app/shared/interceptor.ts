import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpInterceptor,
} from '@angular/common/http';
import { catchError, finalize, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LoadingService } from './loading.service';
import {
    MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    private totalRequests = 0;


    constructor(private loadingService: LoadingService,
        private httlphandler: HttpHandler) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        this.totalRequests++;
        this.loadingService.setLoading(true);
        return next.handle(request)
            .pipe(
                map((event) => {
                    if (event instanceof HttpResponse) {
                      
                    }
                    return event;
                }),
                catchError(err => {
                    if (err.error) {
                        this.openSnacKBar(err.error.error.message)
                    }
                    return throwError(err);
                }),
                finalize(() => {
                    console.log("finalize")
                    this.decreaseRequests();
                }))

    }
    decreaseRequests() {
        this.totalRequests--;
        if (this.totalRequests <= 0) {
            this.totalRequests = 0;
            this.loadingService.setLoading(false)
        }
    }
    openSnacKBar(message) {
        let obj = {
            message: message
        }
        this.loadingService.errorMessage.next(JSON.stringify(obj))
    }
}