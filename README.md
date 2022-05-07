# channel tech

channel tech is an technology ecommerce website demo built
with React and Golang. The website is not meant to be taken
as a legitimate ecommerce website that one can purchase tech from,
but rather as a portfolio project for Te'Andre Smith.

The website supports two languages, English and Japanese. The
translations may be off because most of the translations were done
by myself. Another note to add is that all of the product data/images
were not procured by myself, but rather taken from the internet.
For this reason, the details of the product may not be entirely
accurate.

There are four services in total, MongoDB Database, React Frontend,
Golang Backend API, and JWT Service API. I attempted to build
each service as a microservice that will allow for scalability
in the future. I don't expect much traffic with this application,
but I do believe it is good practice for industry practices.

See channel tech here: https://channel-tech.netlify.app/

## channel tech Technology Stack

| channel tech     | tech stack                 |
| ---------------- | -------------------------- |
| Frontend         | React w/ TypeScript        |
| FE Testing       | Cypress/React-Testing Lib  |
| Design System    | Material-UI                |
| State Management | Redux Toolkit              |
| Database         | MongoDB                    |
| ORM              | golang-mongodb-driver      |
| Web Server       | Golang - Gin-Gonic         |
| Deployment Env   | Netlify / GCP              |
| Auth             | email/password + JWT Token |

### Frontend Details

The frontend is simply React. The frontend is almost fully migrated to TypeScript.

Material UI ( MUI ) was the design system used for this project.
I do not have much experience with design so for the website's overall design,
I needed to look at popular ecommerce stores to try to capture some
of the popular elements and layouts. Stores such as Shein, and Nike
served as some great models for channel tech's frontend design.

Redux Toolkit / RTK Query was used to handle state management,
caching and requests to the backend.

Typically when dealing with large applications, all of the
filtering and pagination is handled by the backend, but due to
there only being about 120 products in total, I decided to handle all of it
in the frontend with the help with RTK.

### Backend Details

The webserver is built in Golang with the Gin-Gonic Framework.
I enjoy using Gin-Gonic as it is very fast and easy to use framework
when creating an api.

There is also a separate JWT Service API that is implemented with
the Golang net/http package. This service is only used to
login/register users while also setting http-only token cookies
in the frontend.

### Auth Details

Authentication/Authorization is handled with email/password and
JWT (JSON Web Token). A user logins/registers via the JWT Service
API, and the server provides a token. Then the token is stored as a cookie
client-side.

Additional details such as usertype and an uuid are also stored within the JWT to assist with
authorization within the Gin-Gonic Backend API.
