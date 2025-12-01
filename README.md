# Dev Tinder (backend)

This will be a Tinder like platform for developers built as a part of the Namaste NodeJS course by Akshay Saini.

This repository will comprise of backend APIs and features built around them.

The APIs will be consumed by the frontend app in [DevTinder-Web](https://github.com/chetan118/devTinder-web).

## API Routes

| Method | Path | Description |
|--------|------|-------------|
| POST | `/signup` | Register a new user |
| POST | `/login` | Authenticate and receive a session cookie |
| POST | `/logout` | Clear the session cookie |
| GET | `/profile/view` | Get the authenticated user's profile |
| PATCH | `/profile/edit` | Update profile fields |
| PATCH | `/profile/password` | Change password |
| POST | `/request/send/:status/:toUserId` | Send an interested/ignored request |
| POST | `/request/review/:status/:requestId` | Accept or reject a received request |
| GET | `/user/requests/received` | List pending incoming requests |
| GET | `/user/connections` | List accepted connections |
| GET | `/user/feed` | Get paginated user feed |
| GET | `/chat/fetch/:targetUserId` | Fetch chat history with a user |
| POST | `/payment/create-order` | Create a Razorpay payment order |
| POST | `/payment/webhook` | Handle Razorpay payment webhook |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (or local MongoDB)
- npm v9 or higher

### Installation

```bash
git clone https://github.com/chetan118/devTinder.git
cd devTinder
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `PORT` | Port the server listens on (default: 7777) |
| `DB_CONNECTION_SECRET` | MongoDB connection string |
| `JWT_SECRET` | Secret key for signing JWT tokens |
| `ALLOWED_ORIGIN` | Frontend origin for CORS (default: http://localhost:5173) |
| `EMAIL_TO` | Recipient email address for daily digests |
| `EMAIL_FROM` | Sender email address (must be verified in AWS SES) |
| `RAZORPAY_KEY_ID` | Razorpay API key ID |
| `RAZORPAY_KEY_SECRET` | Razorpay API key secret |
| `AWS_ACCESS_KEY_ID` | AWS IAM access key for SES |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM secret access key for SES |

### Running the Server

```bash
# Development (with hot reload via nodemon)
npm run dev

# Production
npm start
```

The API will be available at `http://localhost:7777`.

## References

- https://namastedev.com/learn/namaste-node
