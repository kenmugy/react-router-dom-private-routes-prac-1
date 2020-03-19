import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <nav className='purple z-depth-0'>
        <div className='nav-wrapper container'>
          <ul className='right'>
            <li>
              <Link to='/'>home</Link>
            </li>
            <li>
              <Link to='/about'>about</Link>
            </li>
            <li>
              <Link to='/account'>account</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className='container'>
        <AuthButton />
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route path='/about'>
            <AboutPage />
          </Route>
          <Route path='/login'>
            <LoginPage />
          </Route>
          <PrivateRoute path='/account'>
            <AccountPage />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

// Auth - settings
const FakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  logout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

// our - pages
function HomePage() {
  return (
    <div className='card-panel orange'>
      <h2>HomePage</h2>{' '}
    </div>
  );
}
function AboutPage() {
  return (
    <div className='card-panel orange'>
      <h2>AboutPage</h2>{' '}
    </div>
  );
}
function AccountPage() {
  return (
    <div className='card-panel purple'>
      <h2>AccountPage</h2>{' '}
    </div>
  );
}
function LoginPage() {
  let history = useHistory();
  let location = useLocation();
  const { from } = location.state || {
    from: {
      pathname: '/'
    }
  };

  const login = () => FakeAuth.authenticate(() => history.replace(from));
  return (
    <div className='card-panel blue'>
      <h2>LoginPage</h2>
      <p>You have to login to view page at {from.pathname}</p>
      <button className='btn green' onClick={login}>
        Login
      </button>
    </div>
  );
}
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        FakeAuth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: location
              }
            }}
          />
        )
      }
    />
  );
}

// auth - button
function AuthButton() {
  let history = useHistory();

  const logout = () => FakeAuth.logout(() => history.push('/'));

  return (
    FakeAuth.isAuthenticated && (
      <h5>
        Welcome!!!{' '}
        <button className='btn red' onClick={logout}>
          Logout
        </button>
      </h5>
    )
  );
}

export default App;
