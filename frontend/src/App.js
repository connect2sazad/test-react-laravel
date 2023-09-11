import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// importing components
import { Header } from './components/header.component';
import { Login } from './components/login.component'
import { SignUp } from './components/signup.component'
import { Dashboard } from './components/dashboard.component';

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
