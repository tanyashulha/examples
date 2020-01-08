import React, {Component} from 'react';
import { GoogleLogin, GoogleLogout } from "react-google-login";

class Login extends Component {  
  constructor() {
    super();
    this.state = {
      isUserLoggedIn: Boolean(localStorage.getItem('isLoggedIn'))
    };
  }

  render() {
    const responseGoogle = (res) => {
      if (res.error) {
        return;
      }
      this.setState({ isUserLoggedIn: true });
      localStorage.setItem('isLoggedIn', 'true');
    };
    
    const logout = () => {
      this.setState({isUserLoggedIn: false})
      localStorage.clear();
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
            isSignedIn="true"
          />
        )}
        {this.state.isUserLoggedIn && (
          <div className="userDetails-wrapper">
            <div className="details-wrapper">
              <GoogleLogout
               clientId="517004612188-dae395vv8jfdgfmalqapon07dgs6e5rl.apps.googleusercontent.com" 
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