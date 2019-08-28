import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Player} from "../app.component";

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
  get player(): Player {
    return this._player;
  }

  @Input()
  set player(value: Player) {
    this._player = value;
    this.ruolo = this.generateRoleString();
  }

  @Output()
  nextPlayer: EventEmitter<void> = new EventEmitter<void>();

  private generateRoleString() {
    switch (this.player.ruolo) {
      case "P": return "Portiere";
      case "D": return "Difensore";
      case "C": return "Centrocampista";
      case "A": return "Attaccante";
    }
    return this.player.ruolo;
  }

  private _player: Player;

  private ruolo: string;
}
