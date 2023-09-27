# Project Structure

* Data-access folder contains everything related to accessing data:
  - Services
  - Stores

* Models folder contains interfaces representing objects

* Feature folder contains smart components:
  - Complex Logic
  - Dependency Injection
  - Setting up streams
  - Other controller type behaviour
  - 'Know' things about the app structure

* Ui folder contains presentational components:
  - Doesn't 'know' things about the app
  - Communicates primarily with @Input/@Output
  - Primarily concerned with displaying/interacting, not complex logic/DI

* Utils folder contains simple helper functions
