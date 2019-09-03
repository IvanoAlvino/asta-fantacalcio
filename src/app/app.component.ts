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
  /**
   * The complete list of players.
   */
  private players: Player[];

  /**
   * The current player.
   */
  private currentPlayer: Player;

  /**
   * The list of recent players. This list has a maximum size of {@link MAX_LENGTH}.
   */
  private recentPlayers: Player[] = [];

  /**
   * The maximum number of recent players to show.
   */
  private MAX_LENGTH: number = 10;

  /**
   * The converter that will parse the csv and populate a json file.
   */
  private converter = csv({
    delimiter: ';',
    noheader: true,
    headers: ['id','squadra', 'nome', 'ruolo', 'ruoloEsteso']
  });

  /**
   * The shuffle strategy. Possible values are 'full' and 'role'.
   * If draw strategy is 'full', then the entire players list will be full random.
   * If draw strategy is 'role', then the entire players list will be built with random goalkeepers, then random
   * defenders, then random midfielders and finally random strikers.
   */
  private shuffleStrategy: string = 'full';

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
        this.players = this.shufflePlayersList(players);
        this.drawNextPlayer();
      });
  }

  /**
   * Build the player list, taking in consideration the value of {@link shuffleStrategy}.
   * @param players The list of players to shuffle
   */
  private shufflePlayersList(players: Player[]): Player[] {
    if (this.shuffleStrategy === 'full') {
      return AppComponent.shuffle(players);
    }
    return AppComponent.shuffleArrayPerRole(players);
  }

  /**
   * Shuffle the provided players list per role.
   * The entire list will be built with random goalkeepers, then random defenders, then random midfielders and
   * finally random strikers.
   * @param players The players list to shuffle per role
   */
  private static shuffleArrayPerRole(players: Player[]): Player[] {
    const shuffledArrayPerRole: Player[] = [];

    const goalkeepers = players.filter((player) => player.ruolo === 'P');
    const defenders = players.filter((player) => player.ruolo === 'D');
    const midfielders = players.filter((player) => player.ruolo === 'C');
    const strikers = players.filter((player) => player.ruolo === 'A');

    shuffledArrayPerRole.push(...AppComponent.shuffle(goalkeepers));
    shuffledArrayPerRole.push(...AppComponent.shuffle(defenders));
    shuffledArrayPerRole.push(...AppComponent.shuffle(midfielders));
    shuffledArrayPerRole.push(...AppComponent.shuffle(strikers));

    return shuffledArrayPerRole;
  }

  /**
   * Draw the next player. Stop drawing when no more players are left to be drawn.
   */
  drawNextPlayer(): void {
    // If there are no more players, stop drawing
    if (this.players.length === 0) {
      return;
    }

    this.updateRecentPlayers();
    this.currentPlayer = this.players[0];
    this.players.splice(0, 1);
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
   * Shuffle the provided array.
   * @param array The array to shuffle
   */
  private static shuffle(array: Player[]): Player[]  {
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

    return array;
  }
}
