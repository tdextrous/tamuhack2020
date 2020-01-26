export const calculateDuration = (arrivalTime, departureTime) => {
 const arrivalDateTime = new Date(arrivalTime);
 const departureDateTime = new Date(departureTime);
 const timeDiff = departureDateTime - arrivalDateTime;

 const hours =  Math.abs(Math.floor((timeDiff % 86400000) / 3600000));
 const minutes = Math.abs(Math.round(((timeDiff % 86400000) % 3600000) / 60000));
 const locale = `${hours}h ${minutes}m`;

 return {
   hours,
   minutes,
   locale,
 };
};

export const getLayover = (currFlightNumber, flights, passengers, currBag) => {
  // Find bag owner
  let currPassenger;
  for (let i = 0; i < passengers.length; i++) {
    const passengerTagNumbers = passengers[i].bags.map(bag => bag.tagNumber);
    if (passengerTagNumbers.includes(currBag.tagNumber)) {
      currPassenger = passengers[i]; 
    }
  }
  console.log(currBag.tagNumber, currPassenger);

  // Find passenger's curr and next flight
  let currFlight, nextFlight;
  for (let i = 0; i < flights.length; i++) {
    if (flights[i].flightNumber === currFlightNumber) {
      currFlight = flights[i];
    } 
  }

  if (currPassenger.flights.length === 1) {
    nextFlight = null;
  } else {
  //  for (let i = 0; i < flights.length; i++) {
  //    if (!currPassenger.flights.includes(flights[i].flightNumber)) {
  //      continue;
  //    }
  //    if (nextFlight === null || nextFlight === undefined) {
  //      nextFlight = flights[i];
  //    } else if (new Date(flights[i].departureTime) < new Date(nextFlight.departureTime) && new Date(flights[i].departureTime) > new Date(currFlight.arrivalTime)) {
  //      nextFlight = flights[i];
  //    }
  //  }
  //  
  //  if (nextFlight === undefined) {
  //    console.log(currPassenger.flights);
  //  }

  //  if (new Date(nextFlight.departureTime) < new Date(currFlight.arrivalTime)) {
  //    nextFlight = null; 
  //  }
    for (let i = 0; i < flights.length; i++) {
      if (flights[i].flightNumber === currPassenger.flights[1]) {
        nextFlight = flights[i];
      }
    }
  }
  console.log(currBag.tagNumber, currFlight, nextFlight);

  // Get time differences between currFlight arrival and nextFlight departure
  if (nextFlight === null) {
    return null;
  } else {
    return calculateDuration(currFlight.arrivalTime, nextFlight.departureTime);
  }
}

export const sortBagsByLayover = (currFlightNumber, flights, passengers, bags) => {
  let currBags = [...bags]; 
  let sortedBags = [];
  
  for (let i = 0; i < bags.length; i++) {
    let shortestBag = currBags[0]; 
    for (let j = 0; j < currBags.length; j++) {
      const currBag = currBags[j];
      const shortestBagLayover = getLayover(currFlightNumber, flights, passengers, shortestBag);
      const currBagLayover = getLayover(currFlightNumber, flights, passengers, currBag);
      if (shortestBagLayover === null) {
        shortestBag = currBag; 
      }
      if (currBagLayover === null || shortestBagLayover === null) {
        continue; 
      }

      if (currBagLayover.hours < shortestBagLayover.hours) {
        shortestBag = currBag;
      } else if (currBagLayover.hours === shortestBagLayover.hours && currBagLayover.minutes < shortestBagLayover.minutes) {
        shortestBag = currBag;
      }
    }
    currBags = currBags.filter(bag => bag.tagNumber !== shortestBag.tagNumber);
    sortedBags.push(shortestBag);
  }

  return sortedBags;
}
