import React, {Component} from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';



export default class Login extends Component {  
  constructor() {
    super();
    this.state = {
      userDetails: {},
      isUserLoggedIn: false
    };
  }

  render() {
    const responseGoogle = response => {
      this.setState({ userDetails: response.profileObj, isUserLoggedIn: true });
    };
    
    const logout = () => {
      this.setState({isUserLoggedIn: false})
    };
    
    return (
      <div className="button-log">
        {!this.state.isUserLoggedIn && (
          <GoogleLogin
            clientId="517004612188-dae395vv8jfdgfmalqapon07dgs6e5rl.apps.googleusercontent.com" 
            render={renderProps => (
              <button
                className="button"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Log in with Google
              </button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
        )}
        {this.state.isUserLoggedIn && (
          <div className="userDetails-wrapper">
            <div className="details-wrapper">
              <GoogleLogout
                render={renderProps => (
                  <button
                    className="logout-button"
                    onClick={renderProps.onClick}
                  >
                    Log Out
                  </button>
                )}
                onLogoutSuccess={logout}
              />
              <div className="email"><i>{this.state.userDetails.email}</i></div>
            </div>
          </div>
        )}
      </div>
    );
  }
}