import { Component, OnInit, Inject } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { IAuthService } from "./iauth-service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})

export class AppComponent implements OnInit {
  title = 'Casperinc';
  loggedIn = false;
  errorMessage: string;

  constructor(
    private router: Router,
    private pageTitle: Title,
    //@Inject('IAuthService') private authService: IAuthService
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.pageTitle.setTitle('Casperinc');

    this.authService.init()
      .subscribe(
      () => { console.info('Startup success'); },
      error => console.warn(error)
      );

    this.authService.loggedIn$
      .subscribe(
      loggedIn => this.loggedIn = loggedIn,
      error => this.errorMessage = <any>error
      );
  }

  isActive(data: any[]): boolean {
    return this.router.isActive(
      this.router.createUrlTree(data),
      true);
  }

}
