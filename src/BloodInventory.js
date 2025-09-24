import React from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

const BloodInventory = ({ inventory }) => {
    return (
        <Card className="mb-4">
            <Card.Header as="h5">Blood Inventory</Card.Header>
            <Card.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Blood Group</th>
                            <th>Quantity (mL)</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventory.map(bag => (
                            <tr key={bag.id}>
                                <td>{bag.id}</td>
                                <td>{bag.bloodGroup}</td>
                                <td>{bag.quantity}</td>
                                <td>{bag.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default BloodInventory;