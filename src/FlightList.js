import React, { useState, useEffect } from 'react';
import { 
  Container, Row, Col, Card, CardBody, CardTitle, CardText,
  Nav, Navbar, Collapse, NavLink, NavItem, NavbarBrand, NavbarToggler, Table
} from 'reactstrap';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import { getAllBags, getAllFlights, getPassengersByFlight, getBagsByPassenger } from './apiHelpers';

export const FlightList = ({
  flightDate 
}) => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    getAllFlights(flightDate)
      .then(flights => {
        setFlights(flights);
      });
  }, [])

  return (
    <Container>
      <Row>
        <Col>
          <div className="w-100 mx-auto mb-4 border-bottom">
            <h2>All Flights</h2>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table>
            <thead className="thead-dark">
              <tr>
                <th>Flight Number</th>
                <th>Origin</th>
                <th>Destination</th>
                <th>Arrival Time</th>
                <th>Departure Time</th>
                <th>Duration</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {flights.map(flight => (
                <tr>
                  <td>{flight.flightNumber}</td>
                  <td>{flight.origin.code}</td>
                  <td>{flight.destination.code}</td>
                  <td>{new Date(flight.arrivalTime).toLocaleTimeString('en-US')}</td>
                  <td>{new Date(flight.departureTime).toLocaleTimeString('en-US')}</td>
                  <td>{flight.duration.locale}</td>
                  <td>
                    <Link to={`/flights/${flight.flightNumber}`}>
                      View Bags
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}
