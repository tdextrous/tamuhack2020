import React, { useState, useEffect } from 'react';
import { 
  Container, Row, Col, Card, CardBody, CardTitle, CardText,
  Nav, Navbar, Collapse, NavLink, NavItem, NavbarBrand, NavbarToggler, Table
} from 'reactstrap';
import './App.css';
import { Link, useParams } from 'react-router-dom';
import { getAllBags, getAllFlights, getPassengersByFlight, getBagsByPassenger } from './apiHelpers';
import { sortBagsByLayover, getLayover } from './sorting';


export const FlightDetail = ({
  flightDate
}) => {
  const [bags, setBags] = useState([]);
  const [flights, setFlights] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const currFlight = useParams().flightNumber.toString();

  useEffect(() => {
    let localFlights, localPassengers;
    getAllFlights(flightDate)
      .then(flights => {
        localFlights = flights;
        setFlights(flights);
        return getPassengersByFlight(flightDate, currFlight);
      })
      .then(passengers => {
        localPassengers = passengers; 
        console.log(passengers);
        setPassengers(passengers);
        return getBagsByPassenger(passengers);
      })
      .then(bags => {
        const sortedBags = sortBagsByLayover(currFlight, localFlights, localPassengers, bags);
        setBags(sortedBags);
      });
  }, [])
  
  return (
    <Container>
      <Row>
        <Col>
          <div className="w-100 mx-auto mb-2">
            <Link to="/flights">← Back to Flights</Link>
          </div>
          <div className="w-100 mx-auto mb-4 border-bottom">
            <h2>Bags for Flight {currFlight}</h2>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table>
            <thead className="thead-dark">
              <tr>
                <th>Tag Number</th>
                <th>Layover</th>
                <th>Weight (lbs)</th>
                <th>Dimension (in)</th>
              </tr>
            </thead>
            <tbody>
              {bags.map((bag) => {
                const layover = getLayover(currFlight, flights, passengers, bag);
                return (
                  <tr>
                    <td className="font-weight-bold">{bag.tagNumber}</td>
                    <td>{layover ? layover.locale : "No Connection" }</td>
                    <td>{bag.weight}</td>
                    <td>{bag.dimension}</td>
                  {/*
                  <Card key={bag.tagNumber} className="mb-1">
                    <CardBody>
                      <CardTitle className="font-weight-bold">
                        { bag.tagNumber }
                      </CardTitle>

                      <CardText>
                        { layover ? layover.locale : "No Connection" }
                      </CardText>
                    </CardBody>
                  </Card>
                  */}
                  </tr>
                );
              })} 
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
