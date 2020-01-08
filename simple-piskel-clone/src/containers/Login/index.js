import React, {Component} from 'react';
import { connect } from 'react-redux';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

class Login extends Component {  
  constructor() {
    super();
    this.state = {
      isUserLoggedIn: Boolean(localStorage.getItem('isLoggedIn'))
    };
  }

  render() {
    const responseGoogle = response => {
      this.setState({ userDetails: response.profileObj, isUserLoggedIn: true });
      localStorage.setItem('isLoggedIn', 'true');
    };
    
    const logout = () => {
      this.setState({isUserLoggedIn: false})
      localStorage.setItem('isLoggedIn', 'false');
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
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Login;