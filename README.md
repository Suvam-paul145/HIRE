# 🚀 HireAI - Intelligent Job Application Automation Engine

An AI-powered job application automation platform that scrapes jobs, matches them to your profile, and automates the application process using Playwright and LLM-powered form filling.

## 🎯 Project Overview

### The Problem
Applying to jobs is time-consuming and repetitive. Job seekers spend hours:
- Searching for relevant jobs across multiple platforms
- Tailoring resumes for each application
- Filling out similar forms repeatedly
- Writing cover letters for each position

### The Solution
HireAI automates this entire workflow:
1. **Scrapes jobs** from platforms like Internshala based on your skills
2. **Ranks jobs** by relevance using AI-powered matching (vector embeddings)
3. **Tailors resumes** automatically for each job using LLM
4. **Fills applications** using Playwright with AI-generated answers
5. **Handles complexity** - popups, multi-page forms, file uploads

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (React)                        │
│  - Job feed with swipe UI                                    │
│  - Application status dashboard                              │
└────────────────────────┬────────────────────────────────────┘
                         │ REST API
┌────────────────────────▼────────────────────────────────────┐
│              Backend API (NestJS + TypeScript)               │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Core Services                                        │    │
│  │                                                      │    │
│  │  📰 ScrapersService                                  │    │
│  │     - InternshalaScraperV2 (Playwright-based)        │    │
│  │     - LinkedIn scraper                               │    │
│  │     - Skill-based category scraping                  │    │
│  │                                                      │    │
│  │  🎯 MatchingService                                  │    │
│  │     - Vector similarity (pgvector)                   │    │
│  │     - Keyword matching                               │    │
│  │     - Composite scoring                              │    │
│  │                                                      │    │
│  │  📝 ApplicationsService                              │    │
│  │     - State machine workflow                         │    │
│  │     - Background processing                          │    │
│  │     - Retry logic                                    │    │
│  │                                                      │    │
│  │  🤖 LlmService (Gemini/OpenAI)                       │    │
│  │     - Resume tailoring                               │    │
│  │     - Cover letter generation                        │    │
│  │     - Form answer generation                         │    │
│  │     - Embedding generation                           │    │
│  │                                                      │    │
│  │  🎭 SimpleAutomationService (Playwright)             │    │
│  │     - Smart form detection                           │    │
│  │     - AI-powered form filling                        │    │
│  │     - Popup/dialog handling                          │    │
│  │     - File uploads                                   │    │
│  │                                                      │    │
│  │  📄 ResumeParserService                              │    │
│  │     - PDF parsing                                    │    │
│  │     - Word document parsing                          │    │
│  │     - Skill extraction                               │    │
│  │                                                      │    │
│  │  📋 AuditLogService                                  │    │
│  │     - Complete event tracking                        │    │
│  │     - Application history                            │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────┬───────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
┌───────▼───────┐ ┌───────▼───────┐ ┌───────▼───────┐
│  PostgreSQL   │ │   Playwright  │ │  LLM Provider │
│  + pgvector   │ │   Browser     │ │ (Gemini/GPT)  │
└───────────────┘ └───────────────┘ └───────────────┘
```

## 🔧 Tech Stack

| Component | Technology |
|-----------|------------|
| Backend | NestJS + TypeScript |
| Database | PostgreSQL + pgvector |
| Browser Automation | Playwright |
| AI/LLM | Google Gemini / OpenAI GPT |
| Job Scraping | Playwright + Custom parsers |
| Resume Parsing | pdf-parse, mammoth |
| Frontend | React + Vite |
| Containerization | Docker |

## 📁 Project Structure

```
hire/
├── backend/
│   ├── src/
│   │   ├── applications/      # Application workflow management
│   │   ├── jobs/              # Job listing management
│   │   ├── scrapers/          # Job scraping services
│   │   ├── services/          # Core services (LLM, automation, etc.)
│   │   ├── users/             # User management & resume handling
│   │   ├── config/            # Database & app configuration
│   │   ├── app.module.ts      # Main NestJS module
│   │   └── main.ts            # Application entry point
│   ├── resumes/               # Tailored resume storage
│   ├── screenshots/           # Automation screenshots
│   └── uploads/               # User uploaded files
├── frontend/                  # React frontend (Vite)
├── docker-compose.yml         # PostgreSQL container
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker Desktop
- Gemini API key (or OpenAI API key)

### 1. Clone and Install

```bash
# Install dependencies
cd backend && npm install
cd ../frontend && npm install
```

### 2. Start Database

```bash
docker-compose up -d
```

### 3. Configure Environment

Create `backend/.env`:
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/hire_db
LLM_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_api_key
INTERNSHALA_EMAIL=your_internshala_email
INTERNSHALA_PASSWORD=your_internshala_password
```

### 4. Start Backend

```bash
cd backend
npm run start:dev
```

Server runs at `http://localhost:3000`

### 5. Start Frontend (Optional)

```bash
cd frontend
npm run dev
```

## 📡 API Endpoints

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users` | Create user with resume |
| POST | `/api/users/:id/upload-resume` | Upload PDF/Word resume |
| GET | `/api/users/:id` | Get user profile |

### Jobs & Feed
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/feed?userId=X` | Get personalized job feed |
| GET | `/api/scrapers/stats` | Get job statistics |
| POST | `/api/scrapers/scrape-for-user` | Scrape jobs for user's skills |
| POST | `/api/scrapers/clear-old` | Clear stale jobs |

### Applications
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/applications` | Create job application |
| GET | `/api/applications/:id` | Get application status |
| POST | `/api/applications/:id/approve` | Approve & submit |
| POST | `/api/applications/:id/retry` | Retry failed application |
| GET | `/api/applications/:id/logs` | Get audit trail |

## 🔄 Application Workflow

```
┌──────────────┐      ┌────────────────┐      ┌───────────────┐      ┌───────────┐
│   Drafting   │ ───▶ │ NeedsApproval  │ ───▶ │   Submitted   │ ───▶ │  Success  │
└──────────────┘      └────────────────┘      └───────────────┘      └───────────┘
       │                      │
       │                      │
       ▼                      ▼
┌──────────────┐      ┌────────────────┐
│    Failed    │ ◀─── │    Rejected    │
└──────────────┘      └────────────────┘
       │
       │ (retry up to 3x)
       ▼
┌──────────────┐
│   Drafting   │
└──────────────┘
```

## 🤖 Automation Features

### Smart Form Filling
- Detects all form fields and their labels
- Uses AI to generate contextual answers
- Handles cover letters, "why should we hire you", etc.

### Multi-Page Form Support
- Automatically navigates through form pages
- Clicks "Next" / "Continue" buttons
- Handles final "Submit" action

### Popup & Dialog Handling
- Auto-dismisses alerts and modals
- Handles confirmation dialogs
- Closes cookie/notification popups

### Resume Upload
- Automatically uploads resume to file inputs
- Supports PDF, DOCX, DOC formats

## 🔮 Future Enhancements

### Skyvern Integration (Dynamic AI Automation)
For more robust automation of complex job portals, consider integrating [Skyvern](https://github.com/Skyvern-AI/skyvern):

```typescript
// Future: SkyvernClient for dynamic automation
interface ISkyvernClient {
  createTask(request: SkyvernTaskRequest): Promise<SkyvernTaskResponse>;
  resumeTask(taskId: string): Promise<SkyvernSubmitResponse>;
  getTaskStatus(taskId: string): Promise<SkyvernTaskStatusResponse>;
}
```

Benefits:
- AI-powered element detection (no hardcoded selectors)
- Handles website changes automatically
- CAPTCHA handling capabilities
- Cloud-based browser execution

### JobSpy Integration (Multi-Platform Scraping)
For scraping from multiple job platforms, integrate [JobSpy](https://github.com/speedyapply/JobSpy):

```python
# Python microservice for multi-platform scraping
from jobspy import scrape_jobs

jobs = scrape_jobs(
    site_name=["indeed", "linkedin", "glassdoor"],
    search_term="software engineer",
    location="India",
    results_wanted=100
)
```

## 📊 Database Schema

### Users
- UUID, fullname, email, phone
- masterResumeText, skills (JSONB)
- profileVector (VECTOR for similarity)

### JobListings
- UUID, platform, externalId
- title, company, description
- requirements (JSONB)
- descriptionVector (VECTOR)

### Applications
- UUID, userId, jobId, status
- tailoredResume, screenshotUrl
- failureReason, retryCount
- Timestamps (created, approved, submitted)

## 🛡️ Security Notes

- Never commit `.env` files
- Rotate API keys regularly
- Use environment variables for secrets
- Credentials are only used during automation sessions

## 📝 License

MIT License

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

---

Built with ❤️ using NestJS, Playwright, and AI
