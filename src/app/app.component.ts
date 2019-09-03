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
  private converter = csv({
    delimiter: ';',
    noheader: true,
    headers: ['id','squadra', 'nome', 'ruolo', 'ruoloEsteso']
  });

  /**
   * Parse the given csv file and start drawing players.
   * @param files The files array that contains the provided csv file.
   */
  readCsvFile(files: FileList): void {
    const fileReader = new FileReader();
    fileReader.onload = () => this.startDrawingPlayers(fileReader);
    fileReader.readAsText(files[0]);
  }

  /**
   * Start drawing the players.
   * @param fileReader The file reader used to read the csv file
   */
  private startDrawingPlayers(fileReader: FileReader): void {
    this.converter
      .fromString(<string> fileReader.result)
      .then((players: Player[]) => {
        this.players = players;
        this.initAvailableIndexes();
        this.drawNextPlayer();
      });
  }

  /**
   * Draw the next player. Stop drawing when no more players are left to be drawn.
   */
  drawNextPlayer(): void {
    // If there are no more players, stop drawing
    if (this.availableIndexes.length === 0) {
      return;
    }

    if (this.currentPlayer) {
      this.updateRecentPlayers();
    }

    const index = this.availableIndexes.shift();
    this.currentPlayer = this.players[index];
  }

  /**
   * Update the {@link recentPlayers} list. The list will contain {@link MAX_LENGTH} at most.
   */
  private updateRecentPlayers(): void {
    // If no player has been drawn yet, no need to update recent players
    if (!this.currentPlayer) {
      return;
    }
    this.recentPlayers.push(this.currentPlayer);
    // Crop the length of the recent player's list
    if (this.recentPlayers.length > this.MAX_LENGTH) {
      this.recentPlayers.shift();
    }
  }

  /**
   * Init {@link availableIndexes}, the support array that will be used to draw the next random player.
   */
  private initAvailableIndexes() {
    for (let i = 0; i < this.players.length; i++) {
      this.availableIndexes.push(i);
    }
    AppComponent.shuffle(this.availableIndexes);
  }

  /**
   * Shuffle the provided array.
   * @param array The array to shuffle
   */
  private static shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

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
