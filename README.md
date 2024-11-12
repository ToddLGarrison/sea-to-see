# Sea to See

Sea to See is an app designed to help users create and plan itineraries for upcoming trips. The app leverages Google Maps API to allow users to search and add destinations to a list on their itinerary page.

<a href="sea-to-see.herokuapp.com">sea-to-see.herokuapp.com</a>

# Programming

- Backend: Express, Node
- Frontend: React
- Database: PostgreSQL

Third party API
- <a href="https://developers.google.com/maps" target="_blank">Google Maps API</a> 

# Development

- Prerequisite: have Yarn version 1.22.19 and Node version ^16.18
- Clone the repository (git clone https://github.com/ToddLGarrison/sea-to-see.git)
  - cd sea-to-see
  - Install packages with Yarn (yarn install)
  - cd server
  - yarn run migrate:latest
  - yarn db:seed
  - yarn run dev
  - Open the development site at localhost:3000

#Seeding Data

- Reference server/db/seeder for seed data

# Future Features:

- Assigning particular dates/days of the trip to each city and displaying stops based on what the user has added to each day of the trip
- Add Yelp API to allow users to research destinations
- Pulling in flight and airport data from the Amadeus API to help users research and plan out their travel to and from each city on their itinerary
- Add travel recommendations based on the cities/locations currently included in an itinerary with data from the Amadeus API
- User can add image to itinerary
- User can add additional users to itinerary or user can share their itinerary details with other users


# Connect with the Developer

- <a href="mailto: toddlgarrison@gmail.com">Email me</a>
- <a href="https://www.linkedin.com/in/toddlgarrison/" target="_blank">LinkedIn</a>
- <a href="https://github.com/ToddLGarrison" target="_blank">GitHub</a>
