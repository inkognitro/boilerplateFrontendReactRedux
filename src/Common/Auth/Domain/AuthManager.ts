import {CommandBus} from "Common/AppBase/CommandBus";
import {EventBus} from "Common/AppBase/EventBus";
import {
    createAuthenticate,
    ErrorResult as AuthenticateErrorResult,
    SuccessResult as AuthenticateSuccessResult
} from "Common/ApiV1/Domain/Command/Auth/Authenticate";
import {createUserWasLoggedIn} from "Common/Auth/Domain/Event/UserWasLoggedIn";
import {createUserLoginFailed} from "Common/Auth/Domain/Event/UserLoginFailed";
import {createSaveCookie} from "Common/Cookie/Domain/Command/SaveCookie";
import {SaveCookieSettings} from "Common/Cookie/Domain/CookieManager";
import {createRemoveCookie} from "Common/Cookie/Domain/Command/RemoveCookie";
import {CurrentAuthUserReader} from "Common/Auth/Domain/Query/CurrentAuthUserQuery";
import {createUserWasLoggedOut} from "Common/Auth/Domain/Event/UserWasLoggedOut";
import {
    createRefreshAuthentication,
    SuccessResult as RefreshAuthenticationSuccessResult,
    ErrorResult as RefreshAuthenticationErrorResult
} from "Common/ApiV1/Domain/Command/Auth/RefreshToken";
import {createUserAuthenticationWasRefreshed} from "Common/Auth/Domain/Event/UserAuthenticationWasRefreshed";
import {createUserAuthenticationRefreshFailed} from "Common/Auth/Domain/Event/UserAuthenticationRefreshFailed";

const authTokenCookieName = 'authToken';
const authTokenCookieTimeToLiveInDays = 14;

export class AuthManager {
    private readonly commandBus: CommandBus;
    private readonly eventBus: EventBus;
    private readonly currentAuthUserReader: CurrentAuthUserReader

    constructor(commandBus: CommandBus, eventBus: EventBus, currentAuthUserReader: CurrentAuthUserReader) {
        this.commandBus = commandBus;
        this.eventBus = eventBus;
        this.currentAuthUserReader = currentAuthUserReader;
    }
    
    public refreshAuthentication(refreshSettings: RefreshAuthenticationSettings): void {
        const currentAuthUser = this.currentAuthUserReader.find();
        if(!currentAuthUser) {
            return;
        }
        const command = createRefreshAuthentication({
            token: currentAuthUser.token,
            isLoaderEnabled: refreshSettings.isLoaderEnabled,
            onSuccess: (result: RefreshAuthenticationSuccessResult): void => {
                this.updateAuthenticationCookie(result, refreshSettings.shouldRemember);
                this.eventBus.handle(createUserAuthenticationWasRefreshed({
                    token: result.token,
                    user: result.user,
                }));
                if(refreshSettings.onSuccess) {
                    refreshSettings.onSuccess();
                }
            },
            onError: (_: RefreshAuthenticationErrorResult): void => {
                this.eventBus.handle(createUserAuthenticationRefreshFailed());
                if(refreshSettings.onError) {
                    refreshSettings.onError();
                }
            },
        });
        this.commandBus.handle(command);
    }

    public login(loginSettings: LoginSettings): void {
        const command = createAuthenticate({
            username: loginSettings.username,
            password: loginSettings.password,
            isLoaderEnabled: true,
            onSuccess: (result: AuthenticateSuccessResult): void => {
                this.updateAuthenticationCookie(result, loginSettings.shouldRemember);
                this.eventBus.handle(createUserWasLoggedIn({
                    token: result.token,
                    user: result.user,
                }));
                if(loginSettings.onSuccess) {
                    loginSettings.onSuccess();
                }
            },
            onError: (_: AuthenticateErrorResult): void => {
                this.eventBus.handle(createUserLoginFailed());
                if(loginSettings.onError) {
                    loginSettings.onError();
                }
            },
        });
        this.commandBus.handle(command);
    }

    public logout(): void {
        if(!this.currentAuthUserReader.find()) {
            return;
        }
        this.removeAuthenticationCookie();
        this.commandBus.handle(createRemoveCookie(authTokenCookieName));
        this.commandBus.handle(createUserWasLoggedOut());
    }

    private updateAuthenticationCookie(result: AuthenticateSuccessResult, shouldRemember: boolean): void {
        let cookieSettings: SaveCookieSettings = {
            name: authTokenCookieName,
            content: result.token
        };
        if(shouldRemember) {
            cookieSettings.timeToLiveInDays = authTokenCookieTimeToLiveInDays
        }
        this.commandBus.handle(createSaveCookie(cookieSettings));
    }

    private removeAuthenticationCookie(): void {
        this.commandBus.handle(createRemoveCookie(authTokenCookieName));
    }
}

export type LoginSettings = {
    username: string,
    password: string,
    shouldRemember: boolean,
    onSuccess?(): void,
    onError?(): void,
};

export type RefreshAuthenticationSettings = {
    isLoaderEnabled: boolean,
    shouldRemember: boolean,
    onSuccess?(): void,
    onError?(): void,
};