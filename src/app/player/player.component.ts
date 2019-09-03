import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Player} from "../app.component";
import {KeyboardShortcutsComponent, ShortcutInput} from "ng-keyboard-shortcuts";

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements AfterViewInit {
  @Input()
  set player(value: Player) {
    this._player = value;
    this.ruolo = this.generateRoleString();
  }

  @Output()
  nextPlayer: EventEmitter<void> = new EventEmitter<void>();

  get player(): Player {
    return this._player;
  }

  private _player: Player;

  private shortcuts: ShortcutInput[] = [];

  private ruolo: string;

  /**
   * Register the keyboard shortcuts.
   */
  ngAfterViewInit(): void {
    this.shortcuts.push(
      {
        key: "space",
        command: e => this.nextPlayer.emit()
      });
  }

  /**
   * Generate a user friendly name to display the role of the player.
   */
  private generateRoleString() {
    switch (this.player.ruolo) {
      case "P":
        return "Portiere";
      case "D":
        return "Difensore";
      case "C":
        return "Centrocampista";
      case "A":
        return "Attaccante";
    }
    return this.player.ruolo;
  }
}
