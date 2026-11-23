# 🚀 InterviewAI — AI-Powered Mock Interview Platform

An end-to-end, enterprise-grade AI technical mock interview platform that simulates realistic technical recruiter interviews. Features real-time voice interaction, live proctoring (face and eye detection), an in-browser code editor with multi-language execution, live performance analytics, and ATS resume analysis.

---

## 🌟 Key Features

### 🎙️ Interactive AI Interviewer ("Sarah AI")
- Conducts realistic, context-aware technical interviews tailored to specific roles and experience levels.
- Real-time speech recognition (speech-to-text) and natural voice synthesis (text-to-speech).
- Dynamic follow-up questions generated on the fly based on candidate responses.
- Question difficulty automatically scales with candidate performance.

### 🛡️ Live Anti-Cheat & Webcam Proctoring
- **Face & Eye Detection**: Real-time webcam analysis using `face-api.js` models (`tinyFaceDetector`, `faceLandmark68Net`, `faceExpressionNet`).
- Flags proctor violations: No face detected, multiple faces in frame, tab switching, and window blur.
- Automatic strike system with forced session submission on repeated infractions.

### 💻 Monaco Code Editor & Compiler
- Integrated Monaco editor supporting JavaScript, TypeScript, Python, C++, Java, and more.
- Real-time code execution and stdout/stderr output powered by Judge0 / RapidAPI.

### 📊 Real-Time Analytics & Live Feedback
- Tracks candidate performance metrics live: **Confidence**, **Technical Depth**, **Communication**, **Problem Solving**, **Clarity**, and **Vocabulary**.
- Post-interview evaluation reports with radar charts, hiring recommendations, salary expectations, and personalized career roadmaps.

### 📄 ATS Resume Analyzer
- Supports `.pdf` and `.docx` uploads via Multer and Mammoth.
- Calculates ATS compatibility scores (0–100), extracts technical skills, identifies missing competencies, and suggests actionable resume enhancements.

---

## 🛠️ Tech Stack

### Frontend (`client/`)
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **UI Library**: React 19, Tailwind CSS v4, Lucide Icons
- **Animation**: Framer Motion
- **Editor**: `@monaco-editor/react`
- **AI Vision**: `face-api.js` (TensorFlow-based face detection)
- **Data Visualization**: Recharts
- **State Management**: Zustand & React Query

### Backend (`server/`)
- **Framework**: [NestJS 11](https://nestjs.com/) (Express platform)
- **Database**: MongoDB with Mongoose ODM
- **AI Engine**: Groq SDK (`openai/gpt-oss-120b` / `qwen/qwen3.8-27b`)
- **Authentication**: Passport.js, JWT Access & Refresh tokens, bcrypt
- **API Documentation**: Swagger UI (OpenAPI 3.0) at `/docs`
- **Document Processing**: `pdfjs-dist`, `mammoth`

---

## 📁 Repository Structure

```text
Interview/
├── client/                     # Next.js 16 Frontend
│   ├── app/                    # App Router pages (interview, resume, auth, dashboard)
│   ├── components/             # Reusable UI components (WebcamProctor, AIAvatar, CodingEditor, etc.)
│   ├── hooks/                  # Custom React hooks (speech recognition)
│   ├── lib/                    # API and voice utility clients
│   └── public/models/          # Face-api TensorFlow weights & models
├── server/                     # NestJS Backend API
│   ├── src/
│   │   ├── ai/                 # Groq AI integration & prompt engineering
│   │   ├── auth/               # JWT authentication, guards, strategies
│   │   ├── candidate/          # Candidate management
│   │   ├── code/               # Remote code execution service
│   │   ├── common/             # Interceptors, filters, utilities
│   │   ├── interview/          # Interview orchestration, evaluation & analytics
│   │   ├── resume/             # Resume upload & parsing
│   │   └── users/              # User schema and service
│   └── uploads/                # Temporary file upload storage
├── run.bat                     # Windows 1-click launcher (MongoDB + Server + Client)
├── stop.bat                    # Windows 1-click terminator for background services
└── README.md                   # Project documentation
```

---

## ⚙️ Environment Configuration

### Backend (`server/.env`)

Copy `server/.env.example` to `server/.env` and supply your credentials:

```env
# Application
NODE_ENV=production
PORT=5000
APP_NAME=InterviewAI
APP_URL=http://localhost:5000
CLIENT_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost:27017/interviewai

# JWT Authentication
JWT_ACCESS_SECRET=your_super_secret_access_key
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your_super_secret_refresh_key
JWT_REFRESH_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=12

# AI Services (Groq)
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=openai/gpt-oss-120b

# File Uploads
MAX_FILE_SIZE=10485760
UPLOAD_PATH=uploads

# Code Execution (Judge0 via RapidAPI)
RAPID_API_KEY=your_rapidapi_key_here
```

### Frontend (`client/.env.local`)

Copy `client/.env.example` to `client/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js v20+ or v24+
- MongoDB instance (local or MongoDB Atlas)
- Groq API Key

### 1. Clone the repository
```bash
git clone https://github.com/pranavgond01/IntervewAI.git
cd IntervewAI
```

### 2. Windows 1-Click Launch
Double-click `run.bat` or run:
```cmd
.\run.bat
```
This automatically verifies MongoDB, launches the NestJS backend on `http://localhost:5000`, and starts the Next.js frontend on `http://localhost:3000`.

To stop both services cleanly, run `stop.bat`.

### 3. Manual Startup

**Backend:**
```bash
cd server
npm install
npm run build
npm run start:dev
```

**Frontend:**
```bash
cd client
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to open the application and [http://localhost:5000/docs](http://localhost:5000/docs) for the Swagger API documentation.

---

## ☁️ Deploying to Railway

You can deploy both the Backend and Frontend on [Railway](https://railway.app/) as two connected services in one project:

### Step 1: Add MongoDB
1. In your Railway project, click **New** → **Database** → **Add MongoDB** (or provision a free MongoDB Atlas cluster).
2. Copy the connection string (`MONGODB_URI`).

### Step 2: Deploy Backend Service (`server`)
1. Click **New** → **GitHub Repo** → select `IntervewAI`.
2. Go to **Settings**:
   - **Root Directory**: `server`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run start:prod`
3. In **Variables**, add:
   - `PORT`: `5000` (or leave default assigned by Railway)
   - `MONGODB_URI`: `<Your MongoDB Connection URL>`
   - `JWT_ACCESS_SECRET`: `<Random 32-character secret>`
   - `JWT_REFRESH_SECRET`: `<Random 32-character secret>`
   - `GROQ_API_KEY`: `<Your Groq API Key>`
   - `GROQ_MODEL`: `openai/gpt-oss-120b`
   - `RAPID_API_KEY`: `<Your RapidAPI Key>`
   - `CLIENT_URL`: `https://<your-client-service-name>.up.railway.app`
4. Under **Networking**, click **Generate Domain** (e.g. `https://server-production-xxxx.up.railway.app`).

### Step 3: Deploy Frontend Service (`client`)
1. Click **New** → **GitHub Repo** → select `IntervewAI` again.
2. Go to **Settings**:
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run start`
3. In **Variables**, add:
   - `NEXT_PUBLIC_API_URL`: `https://server-production-xxxx.up.railway.app/api/v1` (replace with your backend Railway URL)
4. Under **Networking**, click **Generate Domain** (e.g. `https://client-production-xxxx.up.railway.app`).

---

## 📄 License
This project is licensed under the MIT License.
