import React, {  useState, useEffect } from 'react';
import { 
  Container, Row, Col, Card, CardBody, CardTitle, CardText,
  Nav, Navbar, Collapse, NavLink, NavItem, NavbarBrand, NavbarToggler
} from 'reactstrap';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import './App.css';
import logo from './logo.png';
import { FlightDetail } from './FlightDetail';
import { FlightList } from './FlightList';
import { Home } from './Home';
import { getAllBags, getAllFlights, getPassengersByFlight, getBagsByPassenger } from './apiHelpers';
import { sortBagsByLayover, getLayover } from './sorting';


const App = () => {
  const [currFlight, setCurrFlight] = useState();
  // const [bags, setBags] = useState([]);
  // const [flights, setFlights] = useState([]);
  // const [passengers, setPassengers] = useState([]);

  const [flightDate, setFlightDate] = useState('2020-01-01');

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    //let localFlights, localPassengers, localCurrFlight
    getAllFlights(flightDate)
      .then(flights => {
        // localFlights = flights;
        // setFlights(flights);
        // localCurrFlight = flights[0].flightNumber;
        // setCurrFlight(flights[0].flightNumber);
        // return getPassengersByFlight(flightDate, flights[0].flightNumber);
      })
      .then(passengers => {
        // localPassengers = passengers; 
        // setPassengers(passengers);
        // return getBagsByPassenger(passengers);
      })
      .then(bags => {
        // const sortedBags = sortBagsByLayover(localCurrFlight, localFlights, localPassengers, bags);
        // setBags(sortedBags);
      });
  }, [])

  return (
    <BrowserRouter>
      <div>
        <Navbar dark expand="lg" className="bg-dark mb-4">
          <NavbarBrand tag={() => (
            <Link to="/" className="navbar-brand display-3 pl-3">
              {/*<img className="" src={logo} width="250" height="50" />*/}
              LuggageQueue
            </Link>
          )} />
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav navbar>
              <NavItem>
                  <Link to="/flights" className="nav-link">
                    Flights
                  </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Switch>
            <Route path="/flights/:flightNumber" render={routeProps => (
              <FlightDetail 
                {...routeProps} 
                flightDate={flightDate}
              />
            )} />
            <Route path="/flights" render={() => (
              <FlightList 
                flightDate={flightDate}  
              />
            )} />
            <Route path="/" exact render={() => (
              <Redirect to="/flights" />
            )} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
