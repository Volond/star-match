import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

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

  resetSubscription!: Subscription;
  numberUsedSubscription!: Subscription;

  @Input() numberValue: number = 0;
  @Input() numberSelectedFunction!: (playNumber: PlayNumber) => PlayNumber;

  @Input() resetEvent!: Observable<void>;
  @Input() numberUsedEvent!: Observable<PlayNumber>;

  @Output() clickEvent = new EventEmitter<PlayNumber>();

  constructor() { }

  ngOnInit(): void {
    this.resetSubscription = this.resetEvent.subscribe(() => this.resetState());
    this.numberUsedSubscription = this.numberUsedEvent.subscribe((num) => this.numberUsed(num));
  }

  numberClicked() {
    var updatedPlayNumber = this.numberSelectedFunction(new PlayNumber(this.numberValue, this.currentStatus));
    this.numberValue = updatedPlayNumber.number;
    this.currentStatus = updatedPlayNumber.status;
  }

  resetState() {
    this.currentStatus = 'available';
  }

  numberUsed(num: PlayNumber) {
    if (num.number === this.numberValue) {
      this.currentStatus = 'used';
    }
  }
}
