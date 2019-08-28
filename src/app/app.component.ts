import { Component } from '@angular/core';
import * as csv from "csvtojson";

export interface Player {
  id: string;
  squadra: string;
  nome: string;
  ruolo: string;
  ruoloEsteso: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Asta FantaTigerz 2019';
  private players: Player[];
  private currentPlayer: Player;
  private recentPlayers: Player[] = [];
  private availableIndexes: number[] = [];
  private MAX_LENGTH: number = 10;

  onFileLoad(files: FileList) {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const converter = csv({
        delimiter: ';',
        noheader: true,
        headers: ['id','squadra', 'nome', 'ruolo', 'ruoloEsteso']
      });
      converter
        .fromString(<string> fileReader.result)
        .then((jsonObj)=>{
          this.players = jsonObj;
          this.initAvailableIndexes(jsonObj);
          this.drawNextPlayer();
        });
    };
    fileReader.readAsText(files[0]);
  }

  drawNextPlayer(): void {
    if (this.availableIndexes.length === 0) {
      return;
    }

    if (this.currentPlayer) {
      this.updateRecentPlayers();
    }

    const index = this.availableIndexes.shift();
    this.currentPlayer = this.players[index];
  }

  private updateRecentPlayers() {
    this.recentPlayers.push(this.currentPlayer);
    if (this.recentPlayers.length > this.MAX_LENGTH) {
      this.recentPlayers.shift();
    }
  }

  private initAvailableIndexes(jsonObj: Player[]) {
    for (let i = 0; i < jsonObj.length; i++) {
      this.availableIndexes.push(i);
    }
    this.shuffle(this.availableIndexes);
  }

  private shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  }
}
