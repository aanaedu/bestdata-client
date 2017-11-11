import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  @Input()
  title;

  constructor() { }

  ngOnInit() {
    if (!this.title) {
      this.title = 'Page Title';
    }
  }

}
