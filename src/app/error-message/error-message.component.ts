import { ErrorDisplayComponent } from './../error-display/error-display.component';
import { LoadingService } from './../shared/loading.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {
  @ViewChild('snackBarTemplate')
  snackBarTemplate: TemplateRef<any>;
  message: any;
  constructor(private snackBar: MatSnackBar,
    private loadingService: LoadingService) { }
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  messageSubscription: Subscription;
  showButton = false;
  ngOnInit() {
    this.subscribeErrorMessage();
  }
  subscribeErrorMessage() {
    this.messageSubscription = this.loadingService.
      errorMessage.
      subscribe((obj: any) => {
        if (obj) {
          let messageobj = JSON.parse(obj)
          this.message = messageobj.message;
          this.showButton = false;
          if (this.message === 'database connection failed.') {
            this.showButton = true;
          }
          this.snackBar.openFromTemplate(this.snackBarTemplate, {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 10000
          });
        }
      });

  }

  ngOnDestroy() {
    if (this.messageSubscription)
      this.messageSubscription.unsubscribe();
  }
}
