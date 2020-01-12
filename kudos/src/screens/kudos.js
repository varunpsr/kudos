import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { Button, Card, CardGroup } from 'react-bootstrap';

class Kudos extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            kudos: [],
        }
    }

    getKudos() {
        axios({
            url: "http://127.0.0.1:8000/kudos/",
            method: "get",
            headers: {
                'Authorization': 'Token ' + this.props.token
            }
        }).then(response => response.data)
        .then(data => {
            this.setState({
                kudos: data
            });
        })
        .catch(error => {
            console.log(error.response);
        })
    }

    componentDidMount() {
        this.getKudos();
    }

    componentDidUpdate(prevProps) {
        if(this.props.token != prevProps.token) {
            this.getKudos()
        }
    }

    alldata() {
        return this.state.kudos.map((item, index) => (
            <div key={index}>
                <CardGroup style={{ paddingTop: 20, paddingLeft: 10, paddingRight: 10, alignContent: 'center' }}>
                    <Card style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>
                        <Card.Body>
                            <Card.Title style={{ flexWrap: "wrap", width: 200 }} > <b> {item.from_user.user.username} </b> </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{new Date(item.created_date).toDateString()}</Card.Subtitle>
                            <Card.Text>
                                {item.body}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </CardGroup>
            </div>
        )
        )
    }

    render() {
        const token = this.props.token;
        console.log(token);
        return (
            <div>
                {!this.props.token ? (
                    <div style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'row', width: '100%', height: '50%', }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '70%', height: '600px', marginTop: '50px' }}>
                            <img src="/noauth.png" alt="base" width='80%' height='80%' />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', width: '50%', height: '500px', justifyContent: 'center' }}>
                            <div className='inner-content'>
                                <h5 style={{ color: 'grey' }}> Sorry, you are not authorized to access this page. </h5>
                                <h6 style={{ color: 'grey' }}> Please <a href='/'> Login  </a></h6>
                            </div>
                        </div>
                    </div>
                ) : (
                        <div style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'row', flexWrap: "wrap" }}>
                            {this.alldata()}
                        </div>
                    )}

            </div>
        )
    };
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    };
}

export default connect(mapStateToProps)(Kudos);
