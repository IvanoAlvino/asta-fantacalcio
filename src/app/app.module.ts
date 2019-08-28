import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { KeyboardShortcutsModule }     from 'ng-keyboard-shortcuts';

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
    BrowserModule,
    KeyboardShortcutsModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
