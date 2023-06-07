import React, {Component} from "react";
import axios from 'axios'
import {useNavigate} from "react-router-dom";

class LoginForm extends Component {
    state = {
        account: {
            username: "",
            password: ""
        },
        errors: {}
    };

    handleSubmit = (event) => {
        event.preventDefault()
        const errors = this.validate()
        this.setState({errors: errors || {}});
        if (errors)
            return
        axios({
            method: 'post',
            url: 'http://localhost:3001/api/user/auth',
            data: {
                login: this.state.account.username,
                password: this.state.account.password
            }
        }).then((response) => {
            localStorage.setItem('token', response.data.token);
            window.open("http://localhost:3000/home", "_self");
        }).catch((responseError) => {
            const errors = {};
            errors.password = 'Given username does\'t exists or password is wrong!';
            this.setState({errors: errors || {}});
            console.log(responseError);
        });

    }

    handleChange = (event) => {
        const account = {...this.state.account};
        account[event.currentTarget.name] = event.currentTarget.value;
        this.setState({account});
    };

    validate = (event) =>{
        const errors = {}
        const { account } = this.state;
        if (account.username.trim() === '') {
            errors.username = 'Username is required!';
        }
        if (account.password.trim() === '') {
            errors.password = 'Password is required!';
        }

        return Object.keys(errors).length === 0 ? null : errors
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="username">Email address</label>
                        <input
                            name="username"
                            type="text"
                            className="form-control"
                            id="username"
                            aria-describedby="emailHelp"
                            placeholder="Username"
                            value={this.state.account.username}
                            onChange={this.handleChange}/>
                            {
                                this.state.errors.username &&
                                <div className="alert alert-danger">{this.state.errors.username}</div>
                            }
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="Password">Password</label>
                        <input
                            name="password"
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            value={this.state.account.password}
                            onChange={this.handleChange}/>
                            {
                                this.state.errors.password &&
                                <div className="alert alert-danger">{this.state.errors.password}</div>
                            }
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        );
    }
}

export default LoginForm;

