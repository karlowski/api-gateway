API GATEWAY

Description:
  Simple project that consists of main app (Http API) and two microservices: Order and Payment.

Main purpose:
  - reiteration and exploration;
  - playing around with API and RMQ isolation;
  - Docker setup and tweaks.

Tech-stack:
- Typescript;
- NestJS;
- MySQL;
- RabbitMQ;
- Docker;
- TypeORM.

Launch instructions:
- Complete production build:
  docker compose up --build
- Complete development build (watch mode):
  docker compose -f docker-compose.dev.yml up

Features:
1. API serves as an entry point and primary validator:
  - Order module:
    - create;
    - find many;
    - find one by id;
    - cancel;
  - Payment module:
2. Microservices serve as main workers gatekeeped by API:
  - Order service:
    ...
  - Payment service:
    ...

TODO:
1. API:
  - Payment module (full flow);
2. Microservices:
  - Order (full flow);
  - Payment (full flow);

Future plans:
1. Notification microservice (ping back for order status change, payment confirmation, etc);
2. Websocket integration to couple with Notification service (in question).
