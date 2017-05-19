import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {HttpModule} from '@angular/http';

import {NgsRevealModule} from 'ng-scrollreveal';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from "./page_not_found.component";

import { AppRouting } from './app.routing';
import { AboutComponent } from "./about/about.component";
import { WelcomeComponent } from "./welcome.component";

@NgModule({
    declarations: [
         AppComponent,
         PageNotFoundComponent,
         WelcomeComponent,
         AboutComponent
    ],
    imports: [ 
        BrowserModule,
        HttpModule,
        RouterModule,
        AppRouting,
        NgsRevealModule.forRoot()
    ],
    exports: [ ],
    providers: [ ],
    bootstrap: [ 
        AppComponent
    ] 
})
export class AppModule { }