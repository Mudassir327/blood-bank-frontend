import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const HospitalForm = ({ onFormSubmit }) => {
    const [hospital, setHospital] = useState({
        name: '',
        location: '',
        contactNumber: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setHospital({ ...hospital, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8081/api/hospitals/register', hospital);
            setMessage('Hospital registered successfully!');
            setHospital({ name: '', location: '', contactNumber: '' });
            onFormSubmit();
        } catch (error) {
            console.error("Error registering hospital:", error);
            setMessage('Error registering hospital. Please try again.');
        }
    };

    return (
        <Card className="mb-4">
            <Card.Header as="h5">Register New Hospital</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Hospital Name</Form.Label>
                        <Form.Control type="text" name="name" value={hospital.name} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Location</Form.Label>
                        <Form.Control type="text" name="location" value={hospital.location} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control type="text" name="contactNumber" value={hospital.contactNumber} onChange={handleChange} required />
                    </Form.Group>
                    <Button variant="primary" type="submit">Register</Button>
                </Form>
                {message && <p className={`mt-3 ${message.includes('successful') ? 'text-success' : 'text-danger'}`}>{message}</p>}
            </Card.Body>
        </Card>
    );
};

export default HospitalForm;