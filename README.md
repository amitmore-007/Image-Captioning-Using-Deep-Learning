├── client/          # React frontend
│   ├── src/         # Source files
│   └── .env         # Frontend environment variables
├── server/          # Express backend
│   ├── src/         # Source files
│   └── .env         # Backend environment variables
└── shared/          # Shared types and schemas
```

## Local Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd image-caption-generator

# Install dependencies for both client and server
npm install
cd client && npm install
cd ../server && npm install
```

### 2. Environment Configuration

1. Create `.env` files in both client and server directories:

For client/.env:
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id

# HuggingFace API Configuration
VITE_HUGGINGFACE_TOKEN=your_huggingface_token

# API Configuration (for development)
VITE_API_URL=http://localhost:5000
```

For server/.env:
```env
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

### 3. Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE image_caption_db;
```

2. Push the database schema:
```bash
cd server
npm run db:push
```

### 4. Start the Application

1. Start the backend server:
```bash
cd server
npm run dev
```

2. In a new terminal, start the frontend:
```bash
cd client
npm run dev