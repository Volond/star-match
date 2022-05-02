import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-play-again',
  templateUrl: './play-again.component.html',
  styleUrls: ['./play-again.component.css']
})
export class PlayAgainComponent implements OnInit {

  @Input() gameStatus: string = '';
  @Output() playAgainEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  playAgain() {
    this.playAgainEvent.emit(true);
  }

}
