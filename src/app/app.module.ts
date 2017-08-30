import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { AppRouting } from "./app.routing";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { AppComponent } from './app.component';
import { AuthService } from "./auth.service";
import { AuthHttp } from "./auth.http";
import { LoginComponent } from "./login.component";
import { PageNotFoundComponent } from "./page_not_found.component";
import { WelcomeComponent } from "./welcome.component";
import { AboutComponent } from "./about.component";
import { AboutItemComponent } from "./about-item.component";
import { NarrativeService } from "./narrative-service";
import { EditorComponent } from "./editor.component";

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
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  providers: [
    NarrativeService,
    AuthService,
    AuthHttp
],
  bootstrap: [AppComponent]
})
export class AppModule { }
