import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from './auth.service';
import { AuthStateModel } from './auth-state-model';

@Injectable()
export class AuthHttp {
    state: AuthStateModel;
    loggedIn = false;
    errorMessage: string;

    constructor(private http: Http, private auth: AuthService) {
    }

    ngOnInit() {
        this.auth.state$
        .subscribe(
            authState => this.state = authState,
            error => this.errorMessage = <any>error
        );

        this.auth.loggedIn$
            .subscribe(
                loggedIn => this.loggedIn = loggedIn,
                error => this.errorMessage = error
            );
    }

    get(url: any, opts: any = {}) {
        this.configureAuth(opts);
        let response = this.http.get(url, opts);
        return response;
    }

    post(url: any, data: any, opts: any = {}) {
        this.configureAuth(opts);
        let response = this.http.post(url, data, opts);
        return response;
    }

    put(url: any, data: any, opts: any = {}) {
        this.configureAuth(opts);
        let response = this.http.put(url, data, opts);
        return response;
    }

    // patch(url: any, data: any, opts: any = {}) {
    //     this.configureAuth(opts);
    //     let response = this.http.put(url, data, opts);
    //     return response;
    // }

    delete(url: any, opts: any = {}) {
        this.configureAuth(opts);
        let response = this.http.delete(url, opts);
        return response;
    }

    configureAuth(opts: any) {
        if (this.loggedIn) {
            if (opts.headers == null) {
                opts.headers = new Headers();
            }
            opts.headers.set('Authorization', `Bearer ${this.state.tokens.access_token}`);
        }
    }
}
