import React, {FunctionComponent} from 'react';
import {RouterLink} from 'Common/Layout/UI/Link/Link';
import {ErrorPage} from "SinglePageApp/Layout/UI/PageTypes/ErrorPage";
import {createHomeRouteUrl} from "SinglePageApp/Routing/Domain/Home/Home";

export const NotFound: FunctionComponent = () => { //todo: translation
    return (
        <ErrorPage>
            <div className="text-center">
                <h1>404 - Page not found</h1>
                <RouterLink url={createHomeRouteUrl()}>
                    back to start
                </RouterLink>
            </div>
        </ErrorPage>
    );
};