
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { JwtHelper } from 'angular2-jwt';

import { AuthStateModel } from './auth-state-model';
import { AuthTokenModel } from './auth-token-model';
import { ProfileModel } from './profile-model';
import { RefreshGrantModel } from './refresh-grant-model';
import { LoginModel } from './login-model';
import { IAuthService } from "./iauth-service";

@Injectable()
export class FakeAuthService implements IAuthService {

  private initalState: AuthStateModel = { profile: null, tokens: null, authReady: false };
  private authReady$ = new BehaviorSubject<boolean>(false);
  private state: BehaviorSubject<AuthStateModel>;
  private refreshSubscription$: Subscription;

  state$: Observable<AuthStateModel>;
  tokens$: Observable<AuthTokenModel>;
  profile$: Observable<ProfileModel>;
  loggedIn$: Observable<boolean>;
  jwtHelper = new JwtHelper();

  constructor(
  ) {
    this.state = new BehaviorSubject<AuthStateModel>(this.initalState);
    this.state$ = this.state.asObservable();

    this.tokens$ = this.state.filter(state => state.authReady).map(state => state.tokens);

    this.profile$ = this.state.filter(state => state.authReady).map(state => state.profile);

    this.loggedIn$ = this.tokens$.map(tokens => !!tokens);
  }

  init(): Observable<AuthTokenModel> {
    return new Observable<AuthTokenModel>();
  }

  login(user: LoginModel): Observable<any> {
    return new Observable<any>();
  }

  logout(): void { }

  refreshTokens(): Observable<AuthTokenModel> {
    return new Observable<AuthTokenModel>();
  }
}
