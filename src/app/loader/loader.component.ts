import { LoadingService } from './../shared/loading.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  private httpStatusSubscription: Subscription;
  constructor(private loadingService: LoadingService,
    private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.httpStatusSubscription = this.loadingService.
      isLoading$.
      subscribe((status: boolean) => {
        if (status) { this.spinnerService.show(); }
        else {
          this.spinnerService.hide();
        }
      });
  }
  ngOnDestroy() {
    if (this.httpStatusSubscription)
      this.httpStatusSubscription.unsubscribe();
  }
}
