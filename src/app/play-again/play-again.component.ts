import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-play-again',
  templateUrl: './play-again.component.html',
  styleUrls: ['./play-again.component.css']
})
export class PlayAgainComponent implements OnInit {

  @Input() gameStatus: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
