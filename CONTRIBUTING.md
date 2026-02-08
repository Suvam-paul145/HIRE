# 🤝 Contributing to HIRE

<div align="center">

**Thank you for your interest in contributing to HIRE!** 🎉

We welcome contributions from everyone, whether you're a first-time contributor or an experienced developer.

</div>

---

## 📖 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [Apertre 3.0 Contributors](#-apertre-30-contributors)
- [Getting Started](#-getting-started)
- [Development Setup](#-development-setup)
- [How to Contribute](#-how-to-contribute)
- [Creating Issues](#-creating-issues)
- [Pull Request Process](#-pull-request-process)
- [Coding Standards](#-coding-standards)
- [Scraper Contribution Guide](#-scraper-contribution-guide)
- [Testing Guidelines](#-testing-guidelines)
- [Getting Help](#-getting-help)

---

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a **friendly, safe, and welcoming environment** for all contributors.

| ✅ Do | ❌ Don't |
|-------|---------|
| Be respectful and inclusive | Harass or discriminate |
| Be constructive in feedback | Troll or make personal attacks |
| Focus on what's best for the project | Publish others' private info |
| Show empathy towards others | Use inappropriate language |

---

## 🌟 Apertre 3.0 Contributors

### Welcome, Mentees! 🎉

If you're participating in **Apertre 3.0**, this section is specifically for you!

### ⚠️ IMPORTANT: Identifying Yourself

> **When creating ANY issue (bug report, feature request, or contribution request), you MUST mention `Apertre 3.0` in your issue if you are a participant!**

This helps us:
- ✅ Track your contributions for the program
- ✅ Prioritize mentee issues
- ✅ Provide better guidance and support
- ✅ Ensure you receive proper credit

### How to Mention Apertre 3.0

#### Option 1: Use the Apertre 3.0 Template (Recommended)

When requesting to work on an existing issue, use our dedicated template:

👉 [**Create Apertre 3.0 Contribution Request**](https://github.com/JAYATIAHUJA/HIRE/issues/new?template=apertre_contributor.yml)

#### Option 2: Add to Any Issue

If using bug report or feature request templates, add this at the **top** of your description:

```markdown
---
**🎓 Program:** Apertre 3.0 Participant
**📅 Cohort:** Winter 2026
---
```

#### Option 3: Add the Label

Request the `apertre3.0` label to be added to your issue in the comments.

### First Steps for Apertre 3.0 Participants

1. **⭐ Star this repository** - Show your support!
2. **🍴 Fork the repository** - Create your own copy
3. **📖 Read this entire guide** - Understand the contribution process
4. **🔧 Set up locally** - Follow the [Development Setup](#-development-setup)
5. **🔍 Find an issue** - Look for `good first issue` or `apertre3.0` labels
6. **💬 Comment on the issue** - Express your interest and mention Apertre 3.0
7. **⏳ Wait for assignment** - A maintainer will assign you
8. **💻 Start coding!** - Create your feature branch and work on the issue

### Good First Issues for Apertre 3.0

| Label | Difficulty | Description |
|-------|-----------|-------------|
| `good first issue` | 🟢 Easy | Perfect for first-time contributors |
| `documentation` | 🟢 Easy | Improve docs, fix typos |
| `apertre3.0` | 🟢-🟡 Easy-Medium | Issues for program participants |
| `help wanted` | 🟡 Medium | We need community help |
| `scraper` | 🟡 Medium | Add new job platform support |

---

## 🚀 Getting Started

### Prerequisites

Before contributing, ensure you have:

| Requirement | Version | Download |
|-------------|---------|----------|
| Node.js | 18+ | [nodejs.org](https://nodejs.org/) |
| Docker Desktop | Latest | [docker.com](https://www.docker.com/products/docker-desktop/) |
| Git | Latest | [git-scm.com](https://git-scm.com/) |
| Gemini API Key | - | [aistudio.google.com](https://aistudio.google.com/apikey) |

### Understanding the Project

1. 📖 Read the [README.md](./README.md) for project overview
2. 🏗️ Read the [ARCHITECTURE.md](./ARCHITECTURE.md) for technical deep-dive
3. 🔍 Browse [open issues](https://github.com/JAYATIAHUJA/HIRE/issues) to understand priorities

---

## 💻 Development Setup

### Step 1: Fork and Clone

```bash
# 1. Fork on GitHub (click the Fork button)

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/HIRE.git
cd HIRE

# 3. Add upstream remote
git remote add upstream https://github.com/JAYATIAHUJA/HIRE.git

# 4. Verify remotes
git remote -v
# origin    https://github.com/YOUR_USERNAME/HIRE.git (fetch)
# origin    https://github.com/YOUR_USERNAME/HIRE.git (push)
# upstream  https://github.com/JAYATIAHUJA/HIRE.git (fetch)
# upstream  https://github.com/JAYATIAHUJA/HIRE.git (push)
```

### Step 2: Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### Step 3: Configure Environment

```bash
# Copy example environment file
cp env.example backend/.env

# Edit backend/.env with your values:
# - GEMINI_API_KEY (required)
# - INTERNSHALA_EMAIL (optional, for scraper testing)
# - INTERNSHALA_PASSWORD (optional, for scraper testing)
```

### Step 4: Start Development Environment

```bash
# Terminal 1: Start database
docker-compose up -d

# Terminal 2: Start backend (with hot-reload)
cd backend && npm run start:dev

# Terminal 3: Start frontend (optional)
cd frontend && npm run dev
```

### Step 5: Verify Setup

```bash
# Test API is running
curl http://localhost:3000/api/scrapers/stats

# Expected response:
# {"message":"Job statistics","total":0,...}
```

✅ **You're ready to contribute!**

---

## 📝 Creating Issues

### ⚠️ Important for Apertre 3.0 Participants

> **Always mention `Apertre 3.0` when creating issues if you're a program participant!**

### Issue Templates

We have several issue templates:

| Template | Use Case | Link |
|----------|----------|------|
| 🐛 Bug Report | Report a bug | [Create](https://github.com/JAYATIAHUJA/HIRE/issues/new?template=bug_report.yml) |
| ✨ Feature Request | Suggest new feature | [Create](https://github.com/JAYATIAHUJA/HIRE/issues/new?template=feature_request.yml) |
| 🕷️ New Scraper | Propose new job platform | [Create](https://github.com/JAYATIAHUJA/HIRE/issues/new?template=new_scraper.yml) |
| 🚀 Apertre 3.0 Request | Request to work on issue | [Create](https://github.com/JAYATIAHUJA/HIRE/issues/new?template=apertre_contributor.yml) |

### Before Creating an Issue

1. ✅ Search existing issues to avoid duplicates
2. ✅ Test on the latest `main` branch
3. ✅ Gather all necessary information

### Issue Title Format

```
[TYPE] Brief description

Examples:
[BUG] Login fails on Internshala scraper
[FEATURE] Add Indeed job scraper
[DOCS] Improve API documentation
[APERTRE] Request: Add LinkedIn scraper
```

---

## 🔄 Pull Request Process

### Step 1: Sync Your Fork

```bash
# Fetch latest changes
git fetch upstream

# Switch to main branch
git checkout main

# Merge upstream changes
git merge upstream/main

# Push to your fork
git push origin main
```

### Step 2: Create a Feature Branch

```bash
# Branch naming convention
git checkout -b <type>/<description>

# Examples:
git checkout -b feature/indeed-scraper
git checkout -b fix/login-timeout
git checkout -b docs/api-examples
```

| Type | Use For |
|------|---------|
| `feature/` | New features |
| `fix/` | Bug fixes |
| `docs/` | Documentation |
| `refactor/` | Code refactoring |
| `test/` | Adding tests |

### Step 3: Make Changes

- ✅ Write clean, readable code
- ✅ Follow [Coding Standards](#-coding-standards)
- ✅ Add tests for new functionality
- ✅ Update documentation if needed

### Step 4: Commit Changes

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format: <type>(<scope>): <description>

# Examples:
git commit -m "feat(scrapers): add Indeed job scraper"
git commit -m "fix(automation): handle login timeout"
git commit -m "docs(readme): add API examples"
git commit -m "test(matching): add unit tests for scoring"
```

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation |
| `test` | Adding tests |
| `refactor` | Code refactoring |
| `style` | Formatting, no code change |
| `chore` | Maintenance tasks |

### Step 5: Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then on GitHub, click **"Compare & pull request"**

### Pull Request Template

```markdown
## 📝 Description
[What does this PR do?]

## 🔗 Related Issue
Fixes #123

## 🎓 Apertre 3.0
<!-- If you're an Apertre 3.0 participant, uncomment the next line -->
<!-- **Program:** Apertre 3.0 Participant -->

## ✅ Type of Change
- [ ] 🐛 Bug fix
- [ ] ✨ New feature
- [ ] 📝 Documentation
- [ ] ♻️ Refactor
- [ ] 🧪 Test

## 🧪 Testing
- [ ] I have tested this locally
- [ ] All existing tests pass
- [ ] I have added tests for new functionality

## 📸 Screenshots
[If applicable]

## ✔️ Checklist
- [ ] My code follows the project style
- [ ] I have updated documentation
- [ ] I have added necessary comments
```

### Step 6: Review Process

1. **🤖 Automated Checks** - CI runs tests and linting
2. **👀 Maintainer Review** - Code review within 48-72 hours
3. **💬 Feedback** - Address any requested changes
4. **✅ Approval** - Maintainer approves
5. **🎉 Merge** - Squash and merge!

---

## 📏 Coding Standards

### TypeScript Best Practices

```typescript
// ✅ Good: Clear types, descriptive names
interface UserProfile {
  id: string;
  name: string;
  email: string;
  skills: string[];
}

async function createApplication(
  userId: string,
  jobId: string,
  credentials?: Credentials
): Promise<Application> {
  // Implementation
}

// ❌ Bad: Any types, cryptic names
function create(u: any, j: any): any {
  // Implementation
}
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Files | kebab-case | `user-profile.service.ts` |
| Classes | PascalCase | `UserProfileService` |
| Methods | camelCase | `getUserProfile` |
| Variables | camelCase | `userProfile` |
| Constants | UPPER_SNAKE | `MAX_RETRIES` |
| Interfaces | PascalCase | `UserProfile` |

### File Organization

```typescript
// 1. External imports
import { Injectable, Logger } from '@nestjs/common';

// 2. Internal imports
import { User } from './entities/user.entity';
import { LlmService } from '../services/llm.service';

// 3. Interfaces/Types
export interface CreateUserDto {
  name: string;
  email: string;
}

// 4. Class definition
@Injectable()
export class UsersService {
  // Private members first
  private readonly logger = new Logger(UsersService.name);

  // Constructor
  constructor(/*...*/) {}

  // Public methods
  async createUser(dto: CreateUserDto): Promise<User> {}

  // Private methods
  private validateEmail(email: string): boolean {}
}
```

### Comments

```typescript
// ✅ Good: Explain WHY, not WHAT
// Retry with exponential backoff to handle API rate limits
await this.withRetry(() => this.llm.generate(prompt), 3, 2000);

// ❌ Bad: States the obvious
// Loop through users
for (const user of users) {
```

---

## 🕷️ Scraper Contribution Guide

We welcome new job platform scrapers! Here's how to contribute one:

### Scraper Interface

All scrapers should implement this interface:

```typescript
interface IJobScraper {
  platform: string;
  
  // Login to platform (if required)
  login(credentials: Credentials): Promise<void>;
  
  // Scrape job listings based on query
  scrapeJobs(query: ScraperQuery): Promise<JobListing[]>;
  
  // Get full job details
  getJobDetails(jobId: string): Promise<JobDetails>;
  
  // Cleanup resources
  cleanup(): Promise<void>;
}
```

### Creating a New Scraper

1. **Create file**: `backend/src/scrapers/<platform>.scraper.ts`
2. **Implement interface**: Follow `InternshalaScraperV2` as reference
3. **Add error handling**: Retry logic, timeout handling
4. **Add tests**: Unit tests for parsing logic
5. **Update module**: Register in `scrapers.module.ts`

### Example Scraper Structure

```typescript
// backend/src/scrapers/indeed.scraper.ts

@Injectable()
export class IndeedScraper implements IJobScraper {
  platform = 'indeed';
  private browser: Browser;
  private page: Page;

  async login(credentials: Credentials): Promise<void> {
    // Indeed might not require login
  }

  async scrapeJobs(query: ScraperQuery): Promise<JobListing[]> {
    // Navigate to search page
    // Extract job cards
    // Return normalized job listings
  }

  async getJobDetails(jobId: string): Promise<JobDetails> {
    // Navigate to job page
    // Extract full details
    // Return normalized job details
  }

  async cleanup(): Promise<void> {
    await this.browser?.close();
  }
}
```

### Platforms We Want

Priority order:

1. 🔴 **High Priority**: LinkedIn, Indeed, Glassdoor
2. 🟡 **Medium Priority**: Naukri, AngelList/Wellfound
3. 🟢 **Nice to Have**: RemoteOK, WeWorkRemotely, Hacker News Jobs

---

## 🧪 Testing Guidelines

### Running Tests

```bash
cd backend

# Run all tests
npm test

# Run with coverage
npm run test:cov

# Run specific test
npm test -- --testPathPattern=users.service
```

### Writing Tests

```typescript
describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UsersService, /* mocks */],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const dto = { name: 'Test', email: 'test@example.com' };
      const result = await service.createUser(dto);
      
      expect(result).toBeDefined();
      expect(result.email).toBe(dto.email);
    });

    it('should throw on duplicate email', async () => {
      // Test implementation
    });
  });
});
```

### Coverage Requirements

| Component | Minimum |
|-----------|---------|
| Services | 80% |
| Controllers | 70% |
| Utilities | 90% |

---

## 💬 Getting Help

### Resources

| Resource | Link |
|----------|------|
| 📖 README | [README.md](./README.md) |
| 🏗️ Architecture | [ARCHITECTURE.md](./ARCHITECTURE.md) |
| 📚 Documentation | [DOCUMENTATION.md](./DOCUMENTATION.md) |
| 🐛 Issues | [GitHub Issues](https://github.com/JAYATIAHUJA/HIRE/issues) |

### Contact

- **GitHub Issues**: Best for bugs and feature requests
- **GitHub Discussions**: Best for questions and ideas
- **Discord**: Coming soon!

### Maintainers

| Name | Role | GitHub |
|------|------|--------|
| Jayati Ahuja | Lead Maintainer | [@JAYATIAHUJA](https://github.com/JAYATIAHUJA) |

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the **MIT License**.

---

<div align="center">

**Thank you for contributing to HIRE!** 🚀

Your contributions make this project better for everyone.

</div>
