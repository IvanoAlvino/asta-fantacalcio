import {Component, Input, OnInit} from '@angular/core';
import {Player} from "../app.component";

@Component({
  selector: 'recent-players',
  templateUrl: './recent-list.component.html',
  styleUrls: ['./recent-list.component.css']
})
export class RecentListComponent {

  @Input()
  private recentPlayers: Player[];
}
