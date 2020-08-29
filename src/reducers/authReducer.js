// capitalization indicates it's supposed to be a true constant object, and we should never change any of the values inside it
const INITIAL_STATE = {
  isSignedIn: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return { ...state, isSignedIn: true };
    case 'SIGN_OUT':
      return { ...state, isSignedIn: false };
    default:
      return state;
  }
};
