import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { updateAuth } from '../actions';
import { connect } from 'react-redux';


class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Navbar style={{ backgroundColor: "#3498DB" }} variant="dark">
                <Navbar.Brand href='/'>
                    <b> Kudos App </b>
                </Navbar.Brand>
                <Nav className="mr-auto" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Nav.Item>
                        <Nav.Link href="login">
                            <b>
                                Login
                            </b>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="giveKudos">
                            <b>
                                Give Kudos
                            </b>
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        first_name: state.auth.first_name,
        last_name: state.auth.last_name,
        organization_name: state.auth.organization_name
    };
}

export default connect(mapStateToProps, { updateAuth })(NavBar);
