# Dev Tinder (backend)

This will be a Tinder like platform for developers built as a part of the Namaste NodeJS course by Akshay Saini.

This repository will comprise of backend APIs and features built around them.

The APIs will be consumed by the frontend app in [DevTinder-Web](https://github.com/chetan118/devTinder-web).

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
