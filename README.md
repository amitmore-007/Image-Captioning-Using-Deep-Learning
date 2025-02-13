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

# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 2. Database Setup

1. Install PostgreSQL if you haven't already
2. Create a new database:
```sql
CREATE DATABASE image_caption_db;
```

3. Push the database schema:
```bash
cd server
npm run db:push
```

### 3. Environment Configuration

1. Create `.env` files in both client and server directories:

For `client/.env`:
```env
# HuggingFace API Configuration
VITE_HUGGINGFACE_TOKEN=your_huggingface_token

# API Configuration (for development)
VITE_API_URL=http://localhost:5000
```

For `server/.env`:
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