# XivTech


## Run Locally

Clone the project

```bash
  git clone https://www/github.com/sruthikkoneti/XivTech
```

Go to the backend directory

```bash
  cd backend
```

Install dependencies

```bash
  npm i
```

Start the server

```bash
  node index.js
```
The Backend API service will start.

Now by opening a new terminal,

Go to the frontend directory

```bash
  cd frontend
```

Install dependencies

```bash
  npm i
```

Start the Vite+React+TypeScript application

```bash
  npm run build
```
Add the following `VITE_HOST_URL` in .env after uncommenting the post request in App.tsx

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file in the `backend` directory

`PORT`

`WEATHER_API_KEY` that you get from [Open Weather API](https://openweathermap.org/api)

