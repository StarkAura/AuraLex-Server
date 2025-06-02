# Contributing to AuraLex Server

👋 Welcome to the AuraLex community! We're excited you want to contribute to our AI-powered Web3 education platform for dyslexic learners.

---

## 🌟 Project Overview

AuraLex is an AI-powered backend server that:
- Provides personalized learning paths for dyslexic students
- Integrates text-to-speech and speech-to-text features
- Implements Web3/Starknet payment solutions
- Supports gamified learning modules

---

## 🚀 How to Contribute

### 🛠️ Getting Started

#### Prerequisites
- **Node.js** (v16+ recommended)
- **npm**
- **Git**

#### Setup Guide
1. **Fork** the repository on GitHub.
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/your-username/AuraLex-Server.git
   cd AuraLex-Server
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure environment variables:
   ```bash
   cp .env.example .env
   # Fill in required values in .env
   ```

---

### 🌿 Branching Strategy

Create a new branch for your work:
```bash
git checkout -b type/description
```

Branch naming conventions:
- **feature/**: New functionality (e.g., `feature/starknet-integration`)
- **fix/**: Bug fixes (e.g., `fix/auth-bug`)
- **docs/**: Documentation changes (e.g., `docs/contributing-guide`)
- **refactor/**: Code improvements (e.g., `refactor/ai-service`)

---

### 💻 Coding Standards

#### Code Style
- **JavaScript/TypeScript**:
  - Follow Airbnb JavaScript Style Guide.
  - Use ES6+ features where appropriate.

#### File Structure
- Keep files in their appropriate directories (controllers, models, etc.).
- Use **PascalCase** for component files and **camelCase** for utilities.

#### Linting
Run the linter before committing:
```bash
npm run lint
```
Fix any ESLint errors (we use Airbnb config).

---

### 📝 Commit Guidelines

Use Conventional Commits:
```
type(scope): description
```

Example:
```
feat(auth): add JWT authentication middleware
```

#### Commit Types:
- **feat**: New features
- **fix**: Bug fixes
- **docs**: Documentation
- **style**: Formatting
- **refactor**: Code improvements
- **test**: Test additions
- **chore**: Maintenance tasks

Keep commits atomic and messages clear. Reference issues when applicable (e.g., `Closes #7`).

---

### 🔄 Pull Request Process

1. Ensure your branch is up-to-date with `main`:
   ```bash
   git pull origin main
   ```
2. Push your changes:
   ```bash
   git push origin your-branch-name
   ```
3. Open a Pull Request against the `main` branch.

#### Include in your PR:
- Description of changes.
- Screenshots (if UI-related).
- Testing performed.
- Any relevant issue numbers.

#### PR Checklist:
- Tests pass.
- Linter passes.
- Documentation updated.
- Follows coding standards.

---

### 🐛 Issue Reporting

When opening an issue:
1. Check for duplicates.
2. Use the provided issue templates (if available).
3. Include:
   - Clear description.
   - Steps to reproduce (for bugs).
   - Expected vs actual behavior.
   - Environment details.
   - Screenshots (if applicable).

---

### 🤝 Community Guidelines

- Be respectful and inclusive.
- Give constructive feedback.
- Help maintain code quality.
- Keep discussions productive.

All contributors must adhere to our Code of Conduct.

---

### 🎯 Good First Issues

New contributors should look for issues labeled:
- `good first issue`
- `help wanted`

---

### ❓ Need Help?

- Join our [Telegram] (https://t.me/auralex1).
- Open a GitHub Discussion.
- Contact maintainers: @ayomideadeniran.

---

Thank you for helping us empower dyslexic learners through technology! 🚀
