import { signInWithGoogle, signOut, useAuthState } from "../utilities/firebase";
import "./Navigation.css";

const SignInButton = () => (
  <button className="signstyle ms-auto btn btn-dark" onClick={signInWithGoogle}>
    Sign in
  </button>
);

const SignOutButton = () => (
  <button className="signstyle ms-auto btn btn-dark" onClick={signOut}>
    Sign out
  </button>
);

const AuthButton = () => {
  const [user] = useAuthState();
  return user ? <SignOutButton /> : <SignInButton />;
};

const Navigation = () => (
  <nav className="d-flex">
    <AuthButton />
  </nav>
);

export default Navigation;
