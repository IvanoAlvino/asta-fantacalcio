import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { RecentListComponent } from './recent-list/recent-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    RecentListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
