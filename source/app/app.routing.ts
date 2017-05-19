﻿import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './page_not_found.component';
import { WelcomeComponent } from "./welcome.component";
import { AboutComponent } from "./about/about.component";



const appRoutes: Routes = [
     {
         path: '',
         component: WelcomeComponent
     },
     {
         path: 'home',
         redirectTo: ''
     },
     {
         path: 'about',
         component: AboutComponent
     },
    // {
    //     path: 'login',
    //     component: LoginComponent
    // },
    // {
    //     path: 'item/edit/:id',
    //     component: ItemDetailEditComponent
    // },
    // {
    //     path: 'item/view/:id',
    //     component: ItemDetailViewComponent
    // },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

export const AppRoutingProviders: any[] = [
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
