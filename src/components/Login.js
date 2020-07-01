import React from 'react';
import '../assets/style/Login.css';
import Backgound from '../images/login_background.jpg';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            token: "",
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.signInUser = this.signInUser.bind(this);
    }

    signInUser() {
        // let currentComponent = this;

        // SIMPLE POST REQUEST WITH A JSON BODY USING FETCH
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({ "username": "azerty", "password": "aZ1$er" }),
            header: { "Content-Type": "application/json"}
        };

        fetch('https://www.projet-web-training.ovh/affluence/Affluence/public/api/login_check', requestOptions)
            .then(function(response) {
                console.log(response);
            })
            .catch(err => { console.log(err) });
    }

    send = () => {
        let nextState = {
            "username": this.state.username,
            "password": this.state.password
        };
        let self = this;
        fetch('https://projet-web-training.ovh/affluence/Affluence/public/api/login_check', {
            method: 'POST',
            body: JSON.stringify(nextState),
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            }
        }).then((response) => {
            response.json().then((response) => {
                console.log(response);
                this.setState({token: response.token})
            })
        }).catch(err => {
            console.error(err)
        })
    };

    onChangeUsername(event) {
        this.setState({
            username: event.target.value
        })
    }

    onChangePassword(event) {
        this.setState({
            password: event.target.value
        })
    }

    connectMotherFucker() {
        if(this.state.token !== "" && this.state.token !== null ){
            return(
                <div>
                    <h3>Vous êtes connecté.</h3>
                    <p>{this.state.token}</p>
                </div>
            )
        }
    }


    render() {      
        console.log(this.state);
        return(
            <div className="login-content" style={{background: `url(${Backgound}) center center / cover no-repeat`}}>
                <form className="login-form" method="POST">
                    <h1 className="title">Affluence</h1>
                    <div className="inputs">
                        <div className="username-section input-section">
                            <input type="text" name="username" className="input" autoComplete="off" required onChange={this.onChangeUsername} />
                            <label forhtml="username" className="label-name">
                                <span className="content-name">Utilisateur</span>
                            </label>
                        </div>
                        <div className="password-section input-section">
                            <input type="password" name="password" className="input" required onChange={this.onChangePassword} />
                            <label forhtml="password" className="label-name">
                                <span className="content-name">Mot de passe</span>
                            </label>
                        </div>
                    </div>
                    <div className="login-form__submit-wrapper">
                        <div className="login-form__button cta" onClick={this.send}>Se Connecter</div>
                        <Link to="/affluence/register">
                            <div className="login-form__button cta">Créer un compte</div>
                        </Link>
                        { this.connectMotherFucker()}
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;
