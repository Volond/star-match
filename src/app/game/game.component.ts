import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { utils } from 'src/math-utils';
import { PlayNumber } from '../play-number/play-number.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html'
})
export class GameComponent implements OnInit {

  gameActive: boolean = true;
  gameStatus: string = 'active';
  secondsLeft: number = 10;

  initialNumbers: number[] = Array(9).fill(1).map((x, i) => i + 1);

  stars: number = utils.random(1, 9);
  availableNums: number[] = utils.range(1, 9);
  candidateNums: number[] = [];

  numberUsedSubject: Subject<PlayNumber> = new Subject<PlayNumber>();
  resetSubject: Subject<void> = new Subject<void>();

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

      // Notify children that their number was used in a combination
      this.notifyCandidates(newCandidateNums, 'used');

      this.availableNums = newAvailableNums;
      this.candidateNums = [];

      if (newAvailableNums.length > 0) {
        this.stars = utils.randomSumIn(newAvailableNums, 9);
      } else {
        this.setGameActivity(false, 'won');
      }
    }
  }

  setGameActivity(active: boolean, status: string) {
    this.gameStatus = status;
    this.gameActive = active;
  }

  notifyCandidates(candidates: number[], status: string) {
    candidates.forEach((candidate) => {
      this.numberUsedSubject.next(new PlayNumber(candidate, status));
    });
  }

  resetGame(emittedEvent: boolean) {
    this.gameActive = true;
    this.gameStatus = 'active';
    this.secondsLeft = 10;
    this.initialNumbers = Array(9).fill(1).map((x, i) => i + 1);
    this.stars = utils.random(1, 9);
    this.availableNums = utils.range(1, 9);
    this.candidateNums = [];

    this.resetSubject.next();
  }

}
