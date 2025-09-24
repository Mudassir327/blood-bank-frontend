import React, { useState } from 'react';
import axios from 'axios';

const BloodRequestForm = () => {
    const [request, setRequest] = useState({
        bloodGroup: '',
        quantity: '',
        hospitalId: '',
        status: 'Pending'
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setRequest({ ...request, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/api/requests/create', request);
            console.log(response.data);
            setMessage('Blood request created successfully!');
            setRequest({ bloodGroup: '', quantity: '', hospitalId: '', status: 'Pending' });
        } catch (error) {
            console.error("Error creating request:", error);
            setMessage("Error creating blood request. Please try again.");
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Create Blood Request</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Blood Group:</label>
                    <input
                        type="text"
                        name="bloodGroup"
                        value={request.bloodGroup}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Quantity (mL):</label>
                    <input
                        type="number"
                        name="quantity"
                        value={request.quantity}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Hospital ID:</label>
                    <input
                        type="text"
                        name="hospitalId"
                        value={request.hospitalId}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#d9534f', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Submit Request
                </button>
            </form>
            {message && <p style={{ marginTop: '15px', color: message.startsWith('Error') ? 'red' : 'green' }}>{message}</p>}
        </div>
    );
};

export default BloodRequestForm;