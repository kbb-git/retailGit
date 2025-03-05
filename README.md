# Retail Payment Integration

This project implements an integration with Checkout.com payment gateway for a retail application.

## Features

- Payment processing using Checkout.com
- Support for multiple payment methods
- Order success and failure handling
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd retail
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your Checkout.com API keys:
   ```
   CHECKOUT_SECRET_KEY=your_checkout_secret_key
   PROCESSING_CHANNEL_ID=your_processing_channel_id
   PORT=3000
   ```

## Running Locally

Start the development server:
```
npm start
```

The application will be available at `http://localhost:3000`.

## Deployment

This application can be deployed on [Render.com](https://render.com). 

### Deployment Steps:

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Use the following settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add the environment variables (CHECKOUT_SECRET_KEY, PROCESSING_CHANNEL_ID) in the Render dashboard

## License

ISC 