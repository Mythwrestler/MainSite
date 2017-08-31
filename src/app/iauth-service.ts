import { Observable } from "rxjs/Rx";
import { JwtHelper } from "angular2-jwt";
import { AuthStateModel } from "./auth-state-model";
import { AuthTokenModel } from "./auth-token-model";
import { ProfileModel } from "./profile-model";
import { LoginModel } from "./login-model";

export interface IAuthService {
    state$: Observable<AuthStateModel>;
    tokens$: Observable<AuthTokenModel>;
    profile$: Observable<ProfileModel>;
    loggedIn$: Observable<boolean>;
    jwtHelper: JwtHelper;

    init(): Observable<AuthTokenModel> ;
    login(user: LoginModel): Observable<any>;
    logout(): void;
    refreshTokens(): Observable<AuthTokenModel>;

}
