import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from '../../../animation/animation';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [fadeAnimation]
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
