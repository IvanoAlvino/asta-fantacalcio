import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Asta FantaTigerz 2019';

  onFileLoad(files: FileList) {
    console.log("file: ", files);
  }
}
