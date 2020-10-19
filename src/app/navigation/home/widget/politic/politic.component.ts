import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../../../shared/classes/article';

@Component({
  selector: 'app-politic',
  templateUrl: './politic.component.html',
  styleUrls: ['./politic.component.scss']
})
export class PoliticComponent implements OnInit {

  @Input() article: Article;
  constructor() { }

  ngOnInit() {
  }

}
