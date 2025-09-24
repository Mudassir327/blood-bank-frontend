import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'; // This line was missing or incorrect
import axios from 'axios';
import { AuthContext } from './App';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/api/auth/login', credentials);
            setMessage(response.data);
            if (response.data === 'Login successful!') {
                setUser({ username: credentials.username });
                navigate('/dashboard');
            } else {
                setMessage('Invalid credentials');
            }
        } catch (error) {
            setMessage('Login failed. Please check your credentials.');
        }
    };

    return (
        <Container className="mt-5">
            <Card style={{ maxWidth: '400px', margin: 'auto' }}>
                <Card.Header as="h5">Login</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username" onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" onChange={handleChange} required />
                        </Form.Group>
                        <Button variant="primary" type="submit">Log In</Button>
                    </Form>
                    {message && <p className="mt-3 text-danger">{message}</p>}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Login;