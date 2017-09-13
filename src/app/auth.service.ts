import { environment } from './../environments/environment';
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
export class AuthService implements IAuthService{

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
        private http: Http,
    ) {
        this.state = new BehaviorSubject<AuthStateModel>(this.initalState);
        this.state$ = this.state.asObservable();

        this.tokens$ = this.state.filter(state => state.authReady).map(state => state.tokens);

        this.profile$ = this.state.filter(state => state.authReady).map(state => state.profile);

        this.loggedIn$ = this.tokens$.map(tokens => !!tokens);
    }

    init(): Observable<AuthTokenModel> {
        return this.startupTokenRefresh()
            .do(() => this.scheduleRefresh());
    }

    login(user: LoginModel): Observable<any> {
        return this.getTokens(user, 'password')
            .catch(res => Observable.throw(res.json()))
            .do(res => this.scheduleRefresh());
    }

    logout(): void {
        this.updateState({ profile: null, tokens: null });
        if (this.refreshSubscription$) {
            this.refreshSubscription$.unsubscribe();
        }
        this.removeToken();
    }

    refreshTokens(): Observable<AuthTokenModel> {
        return this.state.first()
            .map(state => state.tokens)
            .flatMap(tokens => this.getTokens({ refresh_token: tokens.refresh_token }, 'refresh_token')
                .catch(error => Observable.throw('Session Expired'))
            );
    }

    private storeToken(tokens: AuthTokenModel): void {
        localStorage.setItem('casperinc-mainsite-auth-tokens', JSON.stringify(tokens));
    }

    private retrieveTokens(): AuthTokenModel {
        const tokensString = localStorage.getItem('casperinc-mainsite-auth-tokens');
        const tokensModel: AuthTokenModel = tokensString == null ? null : JSON.parse(tokensString);
        return tokensModel;
    }

    private removeToken(): void {
        localStorage.removeItem('auth-tokens');
    }

    private updateState(newState: AuthStateModel): void {
        const previoudState = this.state.getValue();
        this.state.next(Object.assign({}, previoudState, newState));
    }

    private getTokens(data: RefreshGrantModel | LoginModel, grantType: string): Observable<Response> {
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        const options = new RequestOptions({ headers: headers });

        Object.assign(data, {
            grant_type: grantType,
            client_Id: 'MainSiteAPI',
            scope: 'profile email openid'
        }
        );

        let parms = this.toUrlEncodedString(data);
        return this.http.post(`${environment.casperincUrl}/identityprovider/connect/token`, parms, options)
            .do(res => {
                const tokens: AuthTokenModel = res.json();
                const now = new Date();
                tokens.expiration_date = new Date(now.getTime() + tokens.expires_in * 1000).getTime().toString();

                const profile: ProfileModel = this.jwtHelper.decodeToken(tokens.id_token);

                this.storeToken(tokens);
                this.updateState({ authReady: true, tokens, profile });
            })
            .catch(this.handleError);
    }

    private startupTokenRefresh(): Observable<AuthTokenModel> {
        return Observable.of(this.retrieveTokens())
            .flatMap((tokens: AuthTokenModel) => {
                if (!tokens) {
                    this.updateState({ authReady: true });
                    return Observable.throw('No token in Storage');
                }
                const profile: ProfileModel = this.jwtHelper.decodeToken(tokens.id_token);
                this.updateState({ tokens, profile });

                if (+tokens.expiration_date > new Date().getTime()) {
                    this.updateState({ authReady: true });
                }

                return this.refreshTokens();
            })
            .catch(error => {
                this.logout();
                this.updateState({ authReady: true });
                return Observable.throw(error);
            });
    }

    private scheduleRefresh(): void {
        this.refreshSubscription$ = this.tokens$
            .first()
            // refresh every half the total expiration time
            .flatMap(tokens => Observable.interval(tokens.expires_in / 2 * 1000))
            .flatMap(() => this.refreshTokens())
            .subscribe();
    }


    // Converts a Json object to urlencoded format
    private toUrlEncodedString(data: any) {
        let body = '';
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                if (body.length) {
                    body += '&';
                }
                body += key + '=';
                body += encodeURIComponent(data[key]);
            }
        }
        return body;
    }


    private handleError(error: Response) {
        // output errors to the console.
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
