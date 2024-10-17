## BMS Project

## Overview

This is a clone of the popular movie and event booking platform BookMyShow. It includes features like browsing movies, booking tickets, and managing events. 
where you first render to Login Page if we are a new User, we need to first Register then go back to login Page,After Login you will be render to Home page 
were we can available movies Listed on Bookmyshow and we can select any Movie and Book a show as per our convience and Select Seats after Selecting seats We can make payment to confirm our booking.If a person is a Owner of theatre he can add his theatre details and get listed on website.

you can checkout the [project Deployment](https://bms-project-deployed.onrender.com/)

## Features
- Login and Resgister Page
- Movies listing and details page.
- Search functionality.
- Responsive design using Tailwind CSS & antD.
- Making payment through Stripe api
- Cancellation of Booking
- Adding Movies,Shows,Theatres
- Data is Stored (Atlas mongodb)
## Technologies Used
- **Frontend**: React,Redux,Tailwind CSS,FontAwasome,Pagination,AntD,Strips,
- **BackEnd**: Node,express,Authmiddleware,Postman,.env
- **Database**: Mongodb
- **Build Tool**: Vite React
- **Deploy Tool**: Render
## Usage
- Open your browser and go to http://localhost:8081.
- Browse movies and select your preferred options to book tickets.
## Installation

To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/Siddharthvj23/Bookmyshow-project
cd Bookmyshow-project
npm install
cd ./server && npm install && cd .. && cd bookmyshow && npm install
cd ..
npm run build && node index.js

