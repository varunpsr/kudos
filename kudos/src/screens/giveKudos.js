import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { updateAuth } from '../actions';
import { connect } from 'react-redux';

import axios from 'axios';


class GiveKudos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            selected_user_id: null,
            kudos_text: null,
        }
    }

    getEmployees() {
        axios({
            url: 'http://127.0.0.1:8000/accounts/users/',
            method: 'get',
            headers: {
                'Authorization': 'Token ' + this.props.token
            }
        }).then(response => response.data)
            .then(data => {
                this.setState({
                    employees: data
                });
            });
    }

    listEmployees() {
        if (this.state.employees.length === 0) {
            return (
                <option>No Employees Found!</option>
            )
        }
        else {
            let employees = this.state.employees
            // this.setState({
            //     selected_user_id: employees[0].id
            // });
            return employees.map((item, index) => (
                <option key={item.id} value={item.id}>{item.full_name}</option>
            ))
        }
    }

    componentDidMount() {
        this.getEmployees();

    }

    submitKudos() {
        let headers = {
            'Authorization': 'Token ' + this.props.token
        }

        let data = {
            from_user: this.props.user_id,
            to_user: this.state.selected_user_id,
            body: this.state.kudos_text
        }

        axios.post('http://127.0.0.1:8000/kudos/', data, {
            headers: headers
        })
        .then(response => {
            if (response.status === 201) {
                // this.props.history.push('/books')
                console.log(response)
            }
        })
        .catch(error => {
            if(error.response.status === 400) {
                alert(error.response.data.non_field_errors[0]);
            }
        })
        this.props.history.push('/kudos');
    }



    render() {
        return (
            <div>
                <Form>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Select Employee</Form.Label>
                        <Form.Control onChange={(event) => this.setState({ selected_user_id: event.target.value })} as="select">
                            {this.listEmployees()}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group onChange={(event) => this.setState({ kudos_text: event.target.value })} controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Kudos</Form.Label>
                        <Form.Control as="textarea" rows="3" />
                    </Form.Group>
                    <Button variant="primary" onClick={this.submitKudos.bind(this)}>
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        name: state.auth.name,
        user_id: state.auth.user_id
    };
}


export default connect(mapStateToProps)(GiveKudos);