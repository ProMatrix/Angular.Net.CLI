import { Component } from '@angular/core';
import * as fs from 'fs';
import * as net from 'net';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular.Net App';
  constructor() {
  }

  onClickMe() {
    debugger;
    //net.createServer((socket) => {
    //  socket.on("data", data => {
    //    const task = data.toString("utf8");
    //  });
    //}).listen(1337, "127.0.0.1");
  }
}
