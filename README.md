<p align="center"><a href="https://digiidex-demo.netlify.app/login" target="_blank">DIGIIDEX DEMO</a></p>

# About DigiiDex Demo

This project was created with React, JavaScript and Tailwindcss and use the [DigiiDex API](https://github.com/domenica-jimenez/laravel-digimon-demo). 

## First Steps

Make sure you have npm installed on your computer, at least the version 9.5.0. You can install it with [Nodejs](https://nodejs.org/en/download/). You can verify you have npm installed with:

### `npm -v`

## Local Deploy

First, clone the repository
### `git clone https://github.com/domenica-jimenez/react-digimon-demo.git`

Open the project folder
### `cd react-digimon-demo`

Install dependencies
### `npm i`

Run service
### `npm run start`

## Local example

After deploy the project, if your port configuration is by default, you can go to [http://localhost:3000/login](http://localhost:3000/login) to see the deployed  application.

## Note for FireBase

If you want users to sync with your FireBase account just change the credentials in the variable `firebaseConfig` in the file `react-digimon-demo\src\firebase.js`. You can get this credentials in FireBase from `General Description > General > Your Apps > Add App`.

If you change to your FireBase account don't forget to activate the `E-mail:Password` authentication