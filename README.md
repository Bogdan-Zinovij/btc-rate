# BTC-rate📈

> Case task for Genesis & KMA Software Engineering School

### What is "btc-rate"?
This is an API service that allows:
- Find out the current exchange rate of bitcoin (BTC) in hryvna (UAH)
- Subscribe an email to receive information on changing the rate;
- Send to all subscribed users current BTC rate.

### Installation

1. Clone the repo:
    ```sh
    git clone https://github.com/Bogdan-Zinovij/btc-rate
    ```
2. Install NPM packages:
    ```sh
    npm ci
    ```
3. Create the configuration file `.env` as shown in the [example](https://github.com/Bogdan-Zinovij/btc-rate/blob/main/.env.example).
   **NOTE**: This project uses the Gmail mail service with OAuth2, so you will need to create a project to use OAuth on Google Console Cloud to get data needed to send emails: clientID, clientSecret and refreshToken.
   For more information, follow the links:
- OAuth2 Nodemailer: 
https://nodemailer.com/smtp/oauth2
- Setting up gmail OAuth2: 
https://docs.emailengine.app/setting-up-gmail-oauth2-for-imap-api

4. Start the project:
    Use the command `npm start` in the working directory of the project
    **OR**
    Build the Docker image and run the container with commands:
    ```sh
    docker build -t btc-rate .
    docker run -d -p 8080:8080 --name btc-rate-app btc-rate
    ```
5. Open `http://localhost:8080/api/rate` in your browser to make sure that the program works in the easiest way.
But to be able to make POST requests, use other tools, such as Postman agent.

### Built with
- [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/), [Nodemailer](https://nodemailer.com/about/)

### Swagger documentation:
- To see the swagger document - click [here](https://github.com/AndriiPopovych/gses/blob/main/gses2swagger.yaml).
