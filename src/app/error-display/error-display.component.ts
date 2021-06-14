import { LoadingService } from './../shared/loading.service';
import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-error-display',
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.scss']
})
export class ErrorDisplayComponent implements OnInit {
  @Input()
  msg: string;
  @Input()
  showButton: boolean;



  constructor(private loadingService:LoadingService,
    private snackBar:MatSnackBar) { }

  ngOnInit(): void {
  }

  refreshClicked() {
    this.loadingService.retriggerAPI.next(true)
    this.snackBar.dismiss();
  }
}
