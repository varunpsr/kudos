import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { updateAuth } from '../actions';
import { connect } from 'react-redux';

import axios from 'axios';

// import Logout from './logout';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',

        }
    }

    onLogin() {
        const username = this.state.username;
        const password = this.state.password;
        axios.post('http://127.0.0.1:8000/api-token-auth/', {
            username,
            password
        }).then(res => {
            if (res.status === 200) {
                const payload = res.data;
                this.props.updateAuth(payload);
            }
        }).catch(error => {
            console.log(error);
        });
        this.props.history.push('/kudos')
    }

    goToKudos() {
        this.props.history.push('/kudos');
    }

    render() {
        return (
            !this.props.token ? (
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', width: '100%', height: '50%', margin: '5px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '70%', height: '600px' }}>
                        <img src="/login.jpg" alt="base" width='100%' height='100%' />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '50%', height: '500px', justifyContent: 'center', margin: '5px' }}>
                        <div className='inner-content'>
                            <h2 style={{ color: 'grey', display: 'flex', justifyContent: 'center' }}> Login </h2>
                        </div>
                        <Form>
                            <Form.Group controlId="formBasicUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" value={this.state.value} onChange={(event) => this.setState({ username: event.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={this.state.value} onChange={(event) => this.setState({ password: event.target.value })} />
                            </Form.Group>
                        </Form>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button className='inner-content' variant="outline-secondary" type="submit" onClick={this.onLogin.bind(this)}>
                                Login
                        </Button>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', margin: '10px' }}>
                            <h6 style={{ color: 'grey', display: 'flex', justifyContent: 'center' }}> New user? {' '} <a href='/signup'> Signup here </a></h6>
                        </div>
                    </div>
                </div>
            ) : (
                    <div>
                        {this.goToKudos()}
                    </div>
                )
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    };
}

export default connect(mapStateToProps, { updateAuth })(Login);
