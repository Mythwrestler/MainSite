import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page_not_found.component';
import { WelcomeComponent } from './welcome.component';
import { AboutComponent } from './about/about.component';
import { EditorComponent } from './Narrative/editor.component';
import { LoginComponent } from './Authentication/login.component';



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
     {
         path: 'editor/:narrativeId',
         component: EditorComponent
     },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

export const AppRoutingProviders: any[] = [
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
