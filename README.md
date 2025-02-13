# Image Caption Generator

A web application that generates captions for images using AI, built with React.js and Express.

## Prerequisites

- Node.js 18 or higher
- PostgreSQL database
- Hugging Face API token
- Firebase project credentials

## Project Structure

```
├── client/          # React frontend
├── server/          # Express backend
└── shared/          # Shared types and schemas
```

## Setup Instructions

### 1. Database Setup

1. Create a PostgreSQL database for the project
2. Note down your database credentials

### 2. Server Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory using `.env.example` as a template:
   ```
   # Database Configuration
   DATABASE_URL=postgresql://postgres:password@localhost:5432/image_caption_db
   PGHOST=localhost
   PGUSER=postgres
   PGPASSWORD=your_password
   PGDATABASE=image_caption_db
   PGPORT=5432

   # HuggingFace Configuration
   HUGGINGFACE_TOKEN=your_huggingface_token

   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # CORS Configuration
   CLIENT_URL=http://localhost:5173
   ```

4. Push the database schema:
   ```bash
   npm run db:push
   ```

5. Start the server:
   ```bash
   npm run dev
   ```

### 3. Client Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the client directory using `.env.example` as a template:
   ```
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id

   # HuggingFace API Configuration
   VITE_HUGGINGFACE_TOKEN=your_huggingface_token

   # API Configuration
   VITE_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The application should now be running at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Usage

1. Navigate to http://localhost:5173
2. Click or drag and drop images to upload
3. The application will generate captions using AI
4. You can copy or remove captions as needed

## Troubleshooting

1. If you encounter CORS errors:
   - Ensure both client and server are running
   - Check that the CLIENT_URL in server/.env matches your client's URL
   - Verify that the VITE_API_URL in client/.env matches your server's URL

2. If image upload fails:
   - Check server logs for detailed error messages
   - Verify that your Hugging Face API token is valid
   - Ensure your database is properly configured and accessible

3. If the database connection fails:
   - Verify your PostgreSQL service is running
   - Check your database credentials in server/.env
   - Ensure the database exists and is accessible
