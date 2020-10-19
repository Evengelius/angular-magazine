import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from '../animation/animation';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  animations: [fadeAnimation] // Only Useful for all components animation
})
export class NavigationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
