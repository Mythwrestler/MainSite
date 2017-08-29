import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {HttpModule} from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {NgsRevealModule} from 'ng-scrollreveal';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page_not_found.component';

import { AboutComponent } from './about/about.component';
import { WelcomeComponent } from './welcome.component';
import { AboutItemComponent } from './about/about-item.component';
import { NarrativeService } from './Narrative/narrative-service';
import { EditorComponent } from './Narrative/editor.component';
import { LoginComponent } from './Authentication/login.component';


import { AppRouting } from './app.routing';
import { AuthService } from './Authentication/auth.service';
import { AuthHttp } from './Authentication/auth.http';

@NgModule({
    declarations: [
         AppComponent,
         PageNotFoundComponent,
         WelcomeComponent,
         AboutComponent,
         AboutItemComponent,
         EditorComponent,
         LoginComponent
    ],
    imports: [ 
        BrowserModule,
        HttpModule,
        RouterModule,
        AppRouting,
        FormsModule,
        ReactiveFormsModule,
        NgsRevealModule.forRoot(),
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot()
    ],
    exports: [ ],
    providers: [
        NarrativeService,
        AuthService,
        AuthHttp 
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }