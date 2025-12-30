## API GATEWAY


#### Description:

Simple project that consists of main app (Http API) and two microservices: Order and Payment.
___

#### Main purpose:

- ``reiteration and exploration;``
- ``playing around with API and RMQ isolation;``
- ``Docker setup and tweaks.``
___

#### Tech-stack:

- ``Typescript;``
- ``NestJS;``
- ``MySQL;``
- ``RabbitMQ;``
- ``Docker;``
- ``TypeORM.``
___

#### Features:

- **API** serves as an entry point and primary validator:

	- **Order module**:

		- create;
		- find many;
		- find one by id;
		- cancel;

	- **Payment module**:
			<br>...

- **Microservices** serve as main workers gatekeeped by API:

	- **Order service**:
		<br>...

	- **Payment service**:
		<br>...
___

#### Launch instructions (not a sequention):

- Install dependencies:
	
  ``npm install``

- Setup **.env** by scheme inside **.env.example**

- Complete production build and launch:
	
  ``docker compose up --build``

- Complete development build (watch mode):
	
  ``docker compose -f docker-compose.dev.yml up``

- Migrate database:
	
  ``npm run typeorm:migrate``
___

### TODO:

1. API:
	- ~~Payment module (full flow)~~;

2. Microservices:
	- Order (full flow);
	- Payment (full flow);

3. Configuration:
	- ~~incorporate migrations in the main flow~~;
	- DLQ.

4. Business logic:
	- Payment mechanism;	
___

#### Future plans:

1. Notification microservice (ping back for order status change, payment confirmation, etc);
2. Websocket integration to couple with Notification service (in question).