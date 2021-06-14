import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public movie) { }

  ngOnInit(): void {
    console.log(this.movie)
  }

}
