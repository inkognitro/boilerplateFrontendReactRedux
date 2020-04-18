import React, {Component} from 'react';
import {NavBar} from "../NavBar";

export class ContentPage extends Component {
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}