import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const BloodBagForm = ({ onFormSubmit }) => {
    const [bloodBag, setBloodBag] = useState({
        bloodGroup: '',
        quantity: '',
        donorId: '',
        collectionDate: '',
        status: 'Available'
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setBloodBag({ ...bloodBag, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8081/api/inventory/add', bloodBag);
            setMessage('Blood bag added successfully!');
            setBloodBag({ bloodGroup: '', quantity: '', donorId: '', collectionDate: '', status: 'Available' });
            onFormSubmit();
        } catch (error) {
            console.error("Error adding blood bag:", error);
            setMessage('Error adding blood bag. Please try again.');
        }
    };

    return (
        <Card className="mb-4">
            <Card.Header as="h5">Add New Blood Bag</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Blood Group</Form.Label>
                        <Form.Control type="text" name="bloodGroup" value={bloodBag.bloodGroup} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Quantity (mL)</Form.Label>
                        <Form.Control type="number" name="quantity" value={bloodBag.quantity} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Donor ID</Form.Label>
                        <Form.Control type="text" name="donorId" value={bloodBag.donorId} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Collection Date</Form.Label>
                        <Form.Control type="date" name="collectionDate" value={bloodBag.collectionDate} onChange={handleChange} required />
                    </Form.Group>
                    <Button variant="danger" type="submit">Add Blood Bag</Button>
                </Form>
                {message && <p className={`mt-3 ${message.includes('successful') ? 'text-success' : 'text-danger'}`}>{message}</p>}
            </Card.Body>
        </Card>
    );
};

export default BloodBagForm;