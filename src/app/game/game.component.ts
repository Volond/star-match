import { Component, OnInit } from '@angular/core';
import { utils } from 'src/math-utils';
import { PlayNumber } from '../play-number/play-number.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html'
})
export class GameComponent implements OnInit {

  gameActive: boolean = true;
  gameStatus: string = 'unsure';
  secondsLeft: number = 10;

  initialNumbers: number[] = Array(9).fill(1).map((x, i) => i + 1);

  stars: number = utils.random(1, 9);
  availableNums: number[] = utils.range(1, 9);
  candidateNums: number[] = [];

  constructor() { }

  ngOnInit(): void {

  }

  // Use arrow function to ensure 'this' refers to the 'Game' components context,
  // not the 'Play Number' when called as a callback function from inside play-number
  selectNumber = (playNumber: PlayNumber): PlayNumber => {
    if (playNumber.status === 'used' || this.secondsLeft === 0) {
      return playNumber;
      }

      const newCandidateNums =
        playNumber.status === 'available'
              ? this.candidateNums.concat(playNumber.number)
              : this.candidateNums.filter(cn => cn !== playNumber.number);

      this.setGameState(newCandidateNums);
      playNumber.status = this.numberStatus(playNumber.number);

      return playNumber;
  }

  numberStatus = (num: number): string => {
    let candidatesAreWrong = utils.sum(this.candidateNums) > this.stars;

    if (!this.availableNums.includes(num)) {
    return 'used';
    }

    if (this.candidateNums.includes(num)) {
    return candidatesAreWrong ? 'wrong' : 'candidate';
    }

    return 'available';
};

  setGameState(newCandidateNums: number[]) {
    if (utils.sum(newCandidateNums) !== this.stars) {
      this.candidateNums = newCandidateNums;
    } else {
      const newAvailableNums = this.availableNums.filter(
        n => !newCandidateNums.includes(n)
      );
      this.stars = utils.randomSumIn(newAvailableNums, 9);
      this.availableNums = newAvailableNums;
      this.candidateNums = [];
    }
  }

}
