import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
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
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    const { signIn: signInUser, signOut: signOutUser } = this.props;
    if (isSignedIn) {
      signInUser(this.auth.currentUser.get().getId());
      // this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      signOutUser();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    const { isSignedIn } = this.props;

    if (isSignedIn === null) {
      return null;
    }
    if (isSignedIn) {
      return (
        <button
          type="button"
          className="ui red google button"
          onClick={this.onSignOutClick}
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
        onClick={this.onSignInClick}
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

const mapStateToProps = (state) => ({ isSignedIn: state.auth.isSignedIn });

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
