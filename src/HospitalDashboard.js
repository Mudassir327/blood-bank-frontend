import React from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

const HospitalDashboard = ({ hospitals }) => {
    return (
        <Card className="mb-4">
            <Card.Header as="h5">Registered Hospitals</Card.Header>
            <Card.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hospitals.map(hospital => (
                            <tr key={hospital.id}>
                                <td>{hospital.id}</td>
                                <td>{hospital.name}</td>
                                <td>{hospital.location}</td>
                                <td>{hospital.contactNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default HospitalDashboard;