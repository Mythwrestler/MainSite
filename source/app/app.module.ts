import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {HttpModule} from '@angular/http';
import { FormsModule } from '@angular/forms';

import {NgsRevealModule} from 'ng-scrollreveal';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page_not_found.component';

import { AppRouting } from './app.routing';
import { AboutComponent } from './about/about.component';
import { WelcomeComponent } from './welcome.component';
import { AboutItemComponent } from './about/about-item.component';
import { NarrativeService } from './Narrative/narrative-service';
import { EditorComponent } from './editor.component';

@NgModule({
    declarations: [
         AppComponent,
         PageNotFoundComponent,
         WelcomeComponent,
         AboutComponent,
         AboutItemComponent,
         EditorComponent
    ],
    imports: [ 
        BrowserModule,
        HttpModule,
        RouterModule,
        AppRouting,
        FormsModule,
        NgsRevealModule.forRoot(),
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot()
    ],
    exports: [ ],
    providers: [ NarrativeService ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }