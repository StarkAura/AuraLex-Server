# AuraLex Server

Empowering Dyslexic Learners Through AI-Powered Web3 Education

## Overview

AuraLex is an AI-powered backend server for a web application designed to support dyslexic learners. It provides personalized learning paths, gamified modules, text-to-speech/speech-to-text features, and integrates with Web3 (Starknet) for payments.

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-org/AuraLex-Server.git
   cd AuraLex-Server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment variables:**
   - Copy `.env.example` to `.env` and fill in required values.

4. **Run the server:**
   ```bash
   npm run dev
   ```
   or
   ```bash
   node server.js
   ```

---

## Contributing

1. **Fork the repository** and create your branch:
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Write clear, well-documented code.**

3. **Add tests** for new features or bug fixes.

4. **Run tests** before submitting:
   ```bash
   npm test
   ```

5. **Submit a pull request** with a clear description of your changes.

---

## Project Structure

```
/config        # Configuration files
/controllers   # Route controllers
/middlewares   # Express middlewares
/migrations    # Database migrations
/models        # Database models
/routes        # API routes
/tests         # Unit and integration tests
/utils         # Utility functions
server.js      # Entry point
```

---

## Code of Conduct

- Be respectful and inclusive.
- Write clean, maintainable code.
- Document your work.
- Review others' code constructively.

---

## License

[MIT](LICENSE)

---

## Contact

For questions or support, open an issue or contact the maintainers.