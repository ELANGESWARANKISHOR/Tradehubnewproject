# TradeHub

TradeHub is a full-stack e-commerce marketplace connecting buyers and sellers. It's built as a set of independent Spring Boot microservices behind a React single-page frontend, with MySQL for persistence and Docker Compose for orchestration.

## Architecture

The system is split into four backend microservices, each owning its own MySQL database, plus a React frontend:

| Service          | Responsibility                                      | Port  | Database         |
|-------------------|-----------------------------------------------------|-------|-------------------|
| `user-service`     | Buyer registration/login, JWT auth, shopping cart   | 8092  | `tradehub_user`    |
| `product-service`  | Product catalog (create, update, delete, browse)    | 8093  | `tradehub_product` |
| `order-service`    | Order placement, confirmation, seller order lookup  | 8094  | `tradehub_order`   |
| `seller-service`   | Seller registration/login, seller profile, JWT auth | 8095  | `tradehub_seller`  |
| `tradehub-frontend`| React (Vite) SPA served via Nginx                   | 5173  | —                  |
| `mysql`             | Shared MySQL 8 instance, one schema per service     | 3307 (host) → 3306 | —   |

Each backend service is a standalone Spring Boot 3.5 application (Java 21) with its own Maven build, Dockerfile, and JWT-based authentication layer.

## Tech Stack

**Backend**
- Java 21, Spring Boot 3.5.4
- Spring Web, Spring Data JPA, Spring Security
- MySQL 8 (via `mysql-connector-j`)
- JJWT (`io.jsonwebtoken`) for JWT issuing/validation
- Lombok
- Maven (wrapper included — no local Maven install required)

**Frontend**
- React 19 + Vite 7
- React Router 7
- Leaflet / React-Leaflet (maps)
- Lucide React (icons)
- ESLint

**Infrastructure**
- Docker & Docker Compose
- Jenkins (`Jenkinsfile` included for CI/CD pipeline)



## Prerequisites

- Docker & Docker Compose (recommended way to run the whole stack)
- For local/manual development:
  - Java 21 (JDK)
  - Node.js 20+ and npm
  - MySQL 8

## Getting Started (Docker Compose — recommended)

From the `Tradehubnewproject/` directory:

```bash
docker-compose up -d --build
```

This will:
1. Start a MySQL 8 container and create the four databases (`tradehub_user`, `tradehub_product`, `tradehub_order`, `tradehub_seller`) via `mysql-init/init.sql`.
2. Build and start all four Spring Boot services.
3. Build the React app and serve it via Nginx.

Once running:
- Frontend: http://localhost:5173
- User service: http://localhost:8092/api/users
- Product service: http://localhost:8093/api/products
- Order service: http://localhost:8094/api/orders
- Seller service: http://localhost:8095/api/sellers
- MySQL: `localhost:3307` (mapped from container port 3306)

To stop everything:

```bash
docker-compose down
```

## Running Services Individually (local development)

Each backend service has a Maven wrapper, so no local Maven install is needed.

```bash
cd tradehub-backend/<service-name>
./mvnw spring-boot:run
```

> **Note:** `user-service`'s `application.properties` points at `localhost:3306`, while `product-service`, `order-service`, and `seller-service` point at a `mysql-db` host (the Docker Compose service name). For fully local (non-Docker) runs, update the relevant `spring.datasource.url` in each service's `src/main/resources/application.properties` to point at your local MySQL instance, and make sure the four databases from `mysql-init/init.sql` exist.

For the frontend:

```bash
cd tradehub-frontend
npm install
npm run dev
```

## API Overview

**User Service** (`/api/users`)
- `POST /register` — register a buyer
- `POST /login` — buyer login (returns JWT)
- `GET /me` — current authenticated user
- `GET /` — list users
- `POST /{userId}/cart` — add item to cart
- `GET /{userId}/cart` — view cart
- `DELETE /{userId}/cart/{productId}` — remove item from cart

**Product Service** (`/api/products`)
- `GET /` — list all products
- `GET /{id}` — get product by ID
- `POST /` — create product
- `PUT /{id}` — update product
- `DELETE /{id}` — delete product
- `GET /seller/{sellerId}` — products by seller

**Order Service** (`/api/orders`)
- `POST /` — place an order
- `GET /` — list orders
- `PUT /{orderId}/confirm` — confirm an order
- `GET /seller/{sellerId}` — orders for a seller

**Seller Service** (`/api/sellers`)
- `POST /register` — register a seller
- `POST /login` — seller login (returns JWT)
- `GET /all` — list all sellers
- `GET /{email}` — seller by email
- `GET /profile` — current authenticated seller's profile
- `PUT /update` — update seller profile
- `GET /internal/sellers/{id}` — internal lookup (service-to-service)

## Frontend Routes

| Route              | Page                    |
|---------------------|-------------------------|
| `/`                  | Landing page            |
| `/login`             | Login                   |
| `/signup-buyer`      | Buyer registration      |
| `/signup-seller`     | Seller registration     |
| `/user-dashboard`    | Buyer home page         |
| `/browser`           | Browse products         |
| `/orders`            | Product offers / orders |
| `/cart`              | Shopping cart           |
| `/account`           | Buyer account page      |
| `/seller-dashboard`  | Seller dashboard        |
| `/addproduct`        | Add a product           |
| `/manageproduct`     | Manage products         |
| `/manageorder`       | Manage orders           |
| `/selleranalysis`    | Seller sales analysis   |

## CI/CD

A `Jenkinsfile` is included that:
1. Checks out the repository.
2. Builds a Docker image per service.
3. Runs `docker-compose up -d --build`.
4. Verifies the frontend container is running.
5. Tears down and cleans up unused Docker resources.

## Security Notes

- Authentication is JWT-based, issued by `user-service` and `seller-service`.
- JWT secrets and default DB credentials in `application.properties`/`docker-compose.yml` are development defaults only — **replace them with secrets injected via environment variables before deploying anywhere beyond local development.**
- `spring.jpa.hibernate.ddl-auto=update` is used for convenience in development; use a proper migration tool (e.g. Flyway/Liquibase) and a safer DDL strategy in production.

## License

No license file is included in this repository. Add one if you intend to distribute or open-source this project.
