import React, { useState, useEffect } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';
import BloodInventory from './BloodInventory';
import HospitalDashboard from './HospitalDashboard';
import BloodRequestForm from './BloodRequestForm';
import BloodBagForm from './BloodBagForm';
import HospitalForm from './HospitalForm';
import axios from 'axios';

const Dashboard = () => {
    const [hospitals, setHospitals] = useState([]);
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const hospitalResponse = await axios.get('http://localhost:8081/api/hospitals');
            setHospitals(hospitalResponse.data);

            const inventoryResponse = await axios.get('http://localhost:8081/api/inventory');
            setInventory(inventoryResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleFormSubmit = () => {
        fetchData(); // This will re-fetch data after a form is submitted
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Dashboard</h2>
            <Tabs defaultActiveKey="inventory" className="mb-3">
                <Tab eventKey="inventory" title="Inventory">
                    <BloodInventory inventory={inventory} />
                    <hr />
                    <BloodBagForm onFormSubmit={handleFormSubmit} />
                </Tab>
                <Tab eventKey="hospitals" title="Hospitals">
                    <HospitalDashboard hospitals={hospitals} />
                    <hr />
                    <HospitalForm onFormSubmit={handleFormSubmit} />
                </Tab>
                <Tab eventKey="requests" title="Requests">
                    <BloodRequestForm />
                </Tab>
            </Tabs>
        </Container>
    );
};

export default Dashboard;