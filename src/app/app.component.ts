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
          this.drawNextPlayer();
        });
    };
    fileReader.readAsText(files[0]);
  }

  drawNextPlayer(): void {
    if (this.currentPlayer) {
      this.updateRecentPlayers();
    }
    const randomNumber: number = Math.floor(Math.random() * this.players.length);
    this.currentPlayer = this.players[randomNumber];
  }

  private updateRecentPlayers() {
    this.recentPlayers.push(this.currentPlayer);
    if (this.recentPlayers.length > this.MAX_LENGTH) {
      this.recentPlayers.shift();
    }
  }
}
