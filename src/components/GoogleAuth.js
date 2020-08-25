import React from 'react';

class GoogleAuth extends React.Component {
  constructor() {
    super();
    this.state = { isSignedIn: null };
  }

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '725570877940-3j0rhmdnphml15v3d791rvv8kiu77lr2.apps.googleusercontent.com',
          scope: 'email',
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  onSignIn = () => {
    this.auth.signIn();
  };

  onSignOut = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    const { isSignedIn } = this.state;

    if (isSignedIn === null) {
      return null;
    }
    if (isSignedIn) {
      return (
        <button
          type="button"
          className="ui red google button"
          onClick={this.onSignOut}
        >
          <i className="google icon" />
          Sign Out
        </button>
      );
    }
    return (
      <button
        type="button"
        className="ui red google button"
        onClick={this.onSignIn}
      >
        <i className="google icon" />
        Sign In with Google
      </button>
    );
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default GoogleAuth;
