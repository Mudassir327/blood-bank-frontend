import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import axios from 'axios';

const DonorRegistration = () => {
    const [credentials, setCredentials] = useState({
        name: '',
        bloodGroup: '',
        contactNumber: '',
        username: '',
        password: ''
    });

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8081/api/auth/register', credentials);
            setMessage('Registration successful! Please log in.');
            navigate('/login');
        } catch (error) {
            setMessage('Error registering. Please try again.');
        }
    };

    return (
        <Container className="mt-5">
            <Card style={{ maxWidth: '500px', margin: 'auto' }}>
                <Card.Header as="h5">Donor Registration</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={credentials.name} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Blood Group</Form.Label>
                            <Form.Control type="text" name="bloodGroup" value={credentials.bloodGroup} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control type="text" name="contactNumber" value={credentials.contactNumber} onChange={handleChange} required />
                        </Form.Group>
                        <hr />
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username" value={credentials.username} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" value={credentials.password} onChange={handleChange} required />
                        </Form.Group>
                        <Button variant="danger" type="submit">Register Donor</Button>
                    </Form>
                    {message && <p className={`mt-3 ${message.includes('successful') ? 'text-success' : 'text-danger'}`}>{message}</p>}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default DonorRegistration;