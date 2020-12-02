# Oversea

Oversea is a personal expense tracker web application built with React and Axios front end and a Node and Express back end that allows users to log their expenses off different accounts and visualize a pie chart representing the different categories for future budget planning and past spending analysis. 

## Final Product

### Dashboard
!["Screenshot of dashboard"](https://github.com/jvongsana/oversea/blob/master/docs/previews/dashboard.png) 

### Browse Accounts
!["Screengrab of browsing accounts"](https://github.com/jvongsana/oversea/blob/master/docs/previews/browse_accounts.gif) 

### Add a Transaction
!["Screengrab of adding a transaction"](https://github.com/jvongsana/oversea/blob/master/docs/previews/add_transaction.gif) 

## Dependencies

- node
- react
- axios
- node-sass
- http-proxy-middleware
- react-router-dom
- react-minimal-pie-chart
## Runtime Usage

### [Heroku Deployment](https://oversea-financials.herokuapp.com/)

### Local Deployment

> This command is run from the project root directory
1. Install all dependencies before first use
```shell
$ npm i
```
> This command is run from `/express-back-end`
2. Start the API server
```shell
$ npm run go
```
> This command is run from `/react-front-end`
3. In a new terminal tab / window, start the FE server
```shell
$ npm start
```
> This command is run from `/express-back-end`
- Reset the database (with seeding)
```shell
$ npm run db:reset
```

