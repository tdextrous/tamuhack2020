import { API_ENDPOINT } from './constants';


export const getAllFlights = (date) => {
  return fetch(`${API_ENDPOINT}/flights?date=${date}`, {
    method: "GET"
  })
    .then(res => res.json())
    .then(json => {
      let flights = [];
    
      for (let i = 0; i < json.length; i++) {
        flights.push(json[i]);
      }

      return flights;
    })
    .catch(err => console.error(err.message));
}

export const getAllPassengers = (date) => {
  return fetch(`${API_ENDPOINT}/passengers?date=${date}`, {
    method: "GET"
  })
    .then(res => res.json())
    .then(json => {
      let passengers = [];

      for (let i = 0; i < json.length; i++) {
        passengers.push(json[i]);
      }

      return passengers;
    })
    .catch(err => console.error(err.message));
}

export const getPassengersByFlight = (date, flightNumber) => {
  return getAllPassengers(date)
    .then(allPassengers => {
      const passengersByFlight = allPassengers.filter(passenger => (
        passenger.flights.includes(flightNumber) 
      ));
      console.log(allPassengers);
      return passengersByFlight;
    });
}

// Synchronous
export const getBagsByPassenger = (passengers) => {
  let bags = [];

  for (let i = 0; i < passengers.length; i++) {
    for (let j = 0; j < passengers[i].bags.length; j++) {
      let currBag = passengers[i].bags[j];
      bags.push(currBag);
    }
  }

  return bags;
}

export const getAllBags = (date) => {
  return getAllPassengers(date)
    .then(passengers => {
      const bags = getBagsByPassenger(passengers);
      return bags;
    });
}

export const getBagsByFlight = (date, flightNumber) => {
  return getPassengersByFlight(date, flightNumber)
    .then(passengers => {
      const bags = getBagsByPassenger(passengers); 
      return bags;
    }); 
}
