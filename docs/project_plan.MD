# Project Planning
1. Project Description
  - Title: Oversea
  - Description:
    - Oversea is a personal expenses tracker web app that allows users to log their expenses and visualize their monthly finances
  - Audience:
    - For users who want to better plan or are struggling planning their monthly finances
  - Members:
    - Joshua Tan
    - Jason Vongsana
    - Ayushi Sharma
2. User Stories
  - As a high school student, I want to know where I can cut down on expenses to save for a car.
  - As a young adult, I want to see my total monthly expenses to consider saving enough money for rent.
  - As a homemaker, I want to track my personal expenses to ensure my children have a college fund.
  - As a traveler, I want to see how trips affect my monthly finances to know how expensive or affordable they are.
  - As a pet owner, I want to know how much of my monthly expenses are pet-related to understand the costs of having one and estimate how much to save.
3. Wireframes (in `docs/design`)
4. ERBs (in `docs/design`)
5. Stack Choices
  - FE
    - HTML
    - SCSS
    - React.js
    - Axios
  - BE
    - Node.js
    - Express.js
  - DB
    - PostgreSQL
    - ElephantSQL
6. Routes
  - FE
    - entry-point / only page for SPA
      - GET http://localhost:3000
  - BE
    - gets all table records
      - GET  http://localhost:8080/api/users
      - GET  http://localhost:8080/api/categories
      - GET  http://localhost:8080/api/accounts
      - GET  http://localhost:8080/api/transaction_types
      - GET  http://localhost:8080/api/transactions
    - posts new table record
      - POST  http://localhost:8080/api/categories
      - POST  http://localhost:8080/api/accounts
      - POST  http://localhost:8080/api/transactions 
    - updates a table record
      - PUT  http://localhost:8080/api/accounts/:id
      - PUT  http://localhost:8080/api/transactions/:id
    - deletes a table record
      - DELETE  http://localhost:8080/api/accounts/:id
      - DELETE  http://localhost:8080/api/transactions/:id
