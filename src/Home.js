import React, {  useState, useEffect } from 'react';
import { 
  Container, Row, Col, Card, CardBody, CardTitle, CardText,
  Nav, Navbar, Collapse, NavLink, NavItem, NavbarBrand, NavbarToggler
} from 'reactstrap';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import logo from './logo.png';
import { FlightDetail } from './FlightDetail';
import { FlightList } from './FlightList';
import { getAllBags, getAllFlights, getPassengersByFlight, getBagsByPassenger } from './apiHelpers';
import { sortBagsByLayover, getLayover } from './sorting';


export const Home = () => {
  return (
    <div className="name background">
      <h1 className="text-light mt-5 d-flex justify-content-center align-items-center display-3">
        Welcome to LuggageQueue
      </h1>
    </div>
  )
}
