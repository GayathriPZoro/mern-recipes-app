# My Recipes Application with MERN Stack

A full-stack recipe management application built with MongoDB, Express.js, React.js, and Node.js. Features include user authentication, recipe creation, favorites, search functionality, and OAuth integration.

## 🌟 Features

- ✅ User Registration & Authentication
- ✅ User Login with JWT
- ✅ Google OAuth Integration  
- ✅ Browse All Recipes (Home page)
- ✅ Create & Manage Recipes
- ✅ Favorite Recipes
- ✅ Search Recipes with Elastic Search
- ✅ Responsive Material UI Design
- ✅ Secure Password Hashing
- ✅ Session Management with Cookies

## 🚀 Live Demo

**Production URL**: [https://nextjs-mern-recipes-app.vercel.app/](https://nextjs-mern-recipes-app.vercel.app/)

**Test Credentials**:
- Username: `gayathri`
- Password: `gayathri123`

## 🛠️ Tech Stack

### Frontend
- React.js 18
- Material-UI (MUI)
- Redux Toolkit
- React Router DOM
- Axios
- React Cookies

### Backend
- Node.js 18+
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- bcrypt
- CORS

### Deployment
- Vercel (Frontend & Serverless API)
- MongoDB Atlas (Database)

## 📋 Prerequisites

- Node.js >= 18.x
- npm >= 9.x
- MongoDB Atlas account
- Git

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/gayathri-polubothu/mern-recipes-app.git
cd mern-recipes-app
```

### 2. Install Dependencies

```bash
# Install all dependencies (root, client, and server)
npm run install:all

# Or install separately
npm install              # Root
cd client && npm install # Client
cd ../server && npm install # Server
```

### 3. Environment Configuration

Create a `.env` file in the **server** directory:

```env
# MongoDB Configuration
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/recipes-app?retryWrites=true&w=majority

# JWT Secret
PRIVATE_SECRET_KEY=your_secret_key_here

# Server Configuration
SERVER_PORT=3040

# Client URL (for CORS)
CLIENT_URL=http://localhost:3000

# Optional: Elastic Search
ELASTIC_SEARCH_APP_API_KEY=
ELASTIC_HOST_NAME=
ELASTIC_ENGINE_NAME=
```

### 4. Run the Application

#### Development Mode

```bash
# Terminal 1 - Start the server
cd server
npm start

# Terminal 2 - Start the client
cd client
npm start
```

- Client: http://localhost:3000
- Server: http://localhost:3040

#### Production Build

```bash
# Build client
cd client
npm run build

# Start server
cd ../server
npm run build
```

## 📦 Project Structure

```
mern-recipes-app/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── redux/         # Redux store & reducers
│   │   ├── services/      # API services
│   │   ├── hooks/         # Custom React hooks
│   │   └── config/        # Configuration files
│   └── package.json
├── server/                # Node.js backend
│   ├── src/
│   │   ├── models/       # Mongoose models
│   │   └── routes/       # Express routes
│   ├── index.js          # Server entry point
│   └── package.json
├── api/                  # Vercel serverless functions
├── package.json          # Root package.json
├── vercel.json           # Vercel configuration
└── .nvmrc               # Node version specification
```

## 🚀 Deployment to Vercel

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy

1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables
4. Deploy!

**Required Environment Variables in Vercel**:
- `MONGODB_URL`
- `PRIVATE_SECRET_KEY`
- `CLIENT_URL`
- `NODE_ENV=production`

## 📝 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Recipes
- `GET /recipes` - Get all recipes
- `GET /recipes/:id` - Get recipe by ID
- `POST /recipes` - Create new recipe
- `PUT /recipes/:id` - Update recipe
- `DELETE /recipes/:id` - Delete recipe
- `PUT /recipes/:id/favorite` - Toggle favorite

### Health Check
- `GET /health` - API health status

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- CORS protection
- Environment variable protection
- MongoDB injection prevention
- Secure HTTP headers

## 🐛 Troubleshooting

See [VERCEL_FIX.md](./VERCEL_FIX.md) for common issues and solutions.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Gayathri Polubothu**
- GitHub: [@gayathri-polubothu](https://github.com/gayathri-polubothu)
- LinkedIn: [gayathri-polubothu](https://www.linkedin.com/in/gayathri-polubothu/)

## 📞 Support

If you have any questions or need help, please open an issue or contact me through LinkedIn.

---

⭐ Star this repository if you find it helpful!
