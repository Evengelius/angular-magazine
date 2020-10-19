import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from '../../../../animation/animation';

@Component({
  selector: 'app-navigation-admin',
  templateUrl: './admin-navigation.component.html',
  styleUrls: ['./admin-navigation.component.scss'],
  animations: [fadeAnimation]
})
export class AdminNavigationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
