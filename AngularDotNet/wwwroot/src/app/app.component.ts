import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import * as moment from "moment";
import { filter } from 'rxjs/operators';

// ngxs
import { Store } from '@ngxs/store';
import { NavigateTo } from '../../shared/modules/app.actions';

// services
import { AppConfig } from "../../common/appConfig";
import { MessagePump } from "../../common/messagePump";
import { AppServices } from "../../shared/ng2-apphelper/appServices";
import { ModalDialog } from "../../shared/ng2-animation/modalDialog";

@Component({
  selector: 'app-root',
  templateUrl: "./app.component.html",
  styles: ["./app.component.css"],
  providers: [AppConfig, AppServices, MessagePump]
})
export class AppComponent implements OnInit {

  constructor(private store: Store, private readonly route: ActivatedRoute, private readonly router: Router, private readonly ac: AppConfig, private readonly as: AppServices) { }
  ngOnInit() {


  }
}
