import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { updateAuth, resetAuth } from '../actions';
import { connect } from 'react-redux';

import axios from 'axios';


class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    logout() {
        axios({
            url: 'http://127.0.0.1:8000/accounts/logout/',
            method: 'get',
            headers: {
                'Authorization': 'Token '+this.props.token
            }
        }).then(res => {
            this.props.resetAuth();
            this.props.history.push('/');
        }).catch(error => {
            console.log(error);
            this.props.resetAuth();
            this.props.history.push('/');
        });
    }

    renderNavBar() {
        if (!this.props.token) {
            return (
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Nav.Item>
                            <Nav.Link href="/">
                                <b>
                                    Login
                            </b>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            )
        }
        else {
            return (
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Nav.Item>
                            <Nav.Link href="/giveKudos">
                                <b>
                                    Give Kudos
                                </b>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/kudos/received">
                                <b>
                                    View Kudos
                                </b>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={() => this.logout()} >
                                <b>
                                    Logout
                                </b>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#">{"Welcome " + this.props.name}</Nav.Link>
                        <Nav.Link ref="#">
                            {this.props.organization_name}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            )
        }
    }

    render() {
        return (
            <Navbar sticky="top" variant="dark" collapseOnSelect expand="lg" bg="dark">
                <Navbar.Brand href='/'>
                    <b> Kudos App </b>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                {
                    this.renderNavBar()
                }
            </Navbar>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        name: state.auth.name,
        organization_name: state.auth.organization_name
    };
}

export default connect(mapStateToProps, { updateAuth, resetAuth })(NavBar);
