import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import DonorRegistration from './DonorRegistration';
import Login from './Login';
import Dashboard from './Dashboard'; // Import the new Dashboard component

const AuthContext = createContext(null);

const App = () => {
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            <Router>
                <AppNavbar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<DonorRegistration />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
        </AuthContext.Provider>
    );
};

const AppNavbar = () => {
    const { user, setUser } = useContext(AuthContext);
    const handleLogout = () => setUser(null);

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img
                        src={process.env.PUBLIC_URL + '/vitalflow-logo.png'}
                        alt="VitalFlow Logo"
                        height="30"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        {user && <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>}
                        {!user && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
                        {!user && <Nav.Link as={Link} to="/register">Register</Nav.Link>}
                    </Nav>
                    {user && (
                        <Button variant="outline-light" onClick={handleLogout}>
                            Logout
                        </Button>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

const Home = () => (
    <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#f8f9fa' }}>
        <h1 className="display-4">Welcome to VitalFlow</h1>
        <p className="lead">Your professional blood banking platform.</p>
        <img src={process.env.PUBLIC_URL + '/blood-banner.jpg'} alt="Blood donation banner" className="img-fluid my-4" />
    </div>
);

export default App;
export { AuthContext };