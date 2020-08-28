import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-accordin',
  templateUrl: './accordin.component.html',
  styleUrls: ['./accordin.component.css']
})
export class AccordinComponent implements OnInit {

  @Input() hasJustViewed: boolean;
  @Input() title: string;
  ishidden = false;
  constructor() { }

  ngOnInit() {
  }

}
