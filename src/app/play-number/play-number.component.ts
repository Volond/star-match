import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export class PlayNumber {
  number: number;
  status: string;

  constructor(number: number, status: string) {
    this.number = number;
    this.status = status;
  }
}

@Component({
  selector: 'app-play-number',
  templateUrl: './play-number.component.html',
  styleUrls: ['./play-number.component.css']
})
export class PlayNumberComponent implements OnInit {
  currentStatus: string = 'available';
  buttonColour: string = '';

  colors : {[key:string]: string;}= {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
  };

  @Input() numberValue: number = 0;
  @Input() numberSelectedFunction!: (playNumber: PlayNumber) => PlayNumber;
  // @Input() numberStatusFunction!: (number: number) => string;
  @Output() clickEvent = new EventEmitter<PlayNumber>();

  constructor() { }

  ngOnInit(): void {

  }

  numberClicked() {
    var updatedPlayNumber = this.numberSelectedFunction(new PlayNumber(this.numberValue, this.currentStatus));
    this.numberValue = updatedPlayNumber.number;
    this.currentStatus = updatedPlayNumber.status;
  }
}
