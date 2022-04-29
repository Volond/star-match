import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stars-display',
  templateUrl: './stars-display.component.html',
  styleUrls: ['./stars-display.component.css']
})
export class StarsDisplayComponent implements OnInit {

  @Input() stars!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
