import { NgModule, ModuleWithProviders } from '@angular/core';

import { AppServices } from './appServices';

@NgModule({
    declarations: [
    ],
    exports: [
    ]
})
export class AppHelper {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AppHelper,
            providers: [AppServices]
        };
    }
}
