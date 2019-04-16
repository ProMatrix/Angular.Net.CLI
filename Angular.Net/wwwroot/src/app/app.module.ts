import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppAnimation } from "../../shared/ng2-animation/appAnimation";
import { AppMobileTech } from "../../shared/ng2-mobiletech/appMobileTech";
import { AppHelper } from "../../shared/ng2-apphelper/appHelper";

// features
import { AppComponent } from './app.component';
import { AlreadyReady } from "../../features/alreadyReady";
import { Analytics } from "../../features/analytics";
import { Features } from "../../features/features";
import { MobileApis } from "../../features/mobileApis";
import { Notification } from "../../features/notification";
import { Settings } from "../../features/settings";
import { Splash } from "../../features/splash";

@NgModule({
    declarations: [
        AppComponent, AlreadyReady, Analytics, Features, Notification, MobileApis, Settings, Splash
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        AppAnimation,
        AppMobileTech,
        AppHelper.forRoot(),

        RouterModule.forRoot([
            { path: "", component: Splash, data: { subtitle: "Quick SPLASH" } },
            { path: "splash", component: Splash, data: { subtitle: "Quick SPLASH" } },
            { path: "settings", component: Settings, data: { subtitle: "VERSIONS & SETTINGS" } },
            { path: "analytics", component: Analytics, data: { subtitle: "Application Analytics" } },
            { path: "features", component: Features, data: { subtitle: "More About this Application" } },
            { path: "notification", component: Notification, data: { subtitle: "Immediate Notification" } },
            { path: 'alreadyReady', component: AlreadyReady, data: { subtitle: "Feature Quick Start" } },
            { path: "mobileApis", component: MobileApis, data: { subtitle: "Modern Mobile Features" } },
            { path: "**", redirectTo: "/splash", pathMatch: "full" }
        ]),
        ToastrModule.forRoot(
            {
                timeOut: 5000,
                positionClass: 'toast-bottom-right',
                preventDuplicates: true,
            }
        )
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
