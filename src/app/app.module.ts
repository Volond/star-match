import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { PlayAgainComponent } from './play-again/play-again.component';
import { StarsDisplayComponent } from './stars-display/stars-display.component';
import { PlayNumberComponent } from './play-number/play-number.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    PlayAgainComponent,
    StarsDisplayComponent,
    PlayNumberComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
