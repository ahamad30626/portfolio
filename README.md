# ⚡ Shaik Portfolio — Full-Stack Edition

> A high-performance personal portfolio built with **React + Node.js** on the frontend and **Java Spring Boot** on the backend.


---


## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, Vanilla CSS, Axios |
| **Backend** | Java 17, Spring Boot 3.2, Maven |
| **Database** | H2 (in-memory, dev) |
| **Animations** | Custom CSS + Canvas API |
| **Styling** | Custom design system (no Tailwind) |

---

## 📁 Project Structure

```
portfolio/
├── frontend/                     # React + Vite application
│   ├── public/
│   │   ├── profile.png
│   │   ├── project1.png
│   │   ├── project2.png
│   │   └── project3.png
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Sticky nav with scroll-spy & hamburger
│   │   │   ├── Hero.jsx          # Typewriter + animated blobs
│   │   │   ├── About.jsx         # Profile, stats, skill chips
│   │   │   ├── Skills.jsx        # 4 categories + ring charts (API-fed)
│   │   │   ├── Projects.jsx      # Project cards (API-fed)
│   │   │   ├── Experience.jsx    # Timeline (API-fed)
│   │   │   ├── Contact.jsx       # Form → POST /api/contact
│   │   │   ├── Footer.jsx
│   │   │   ├── CustomCursor.jsx  # Premium cursor with ring follow
│   │   │   ├── ParticleCanvas.jsx# Animated particle background
│   │   │   └── BackToTop.jsx
│   │   ├── hooks/
│   │   │   └── useScrollReveal.js
│   │   ├── services/
│   │   │   └── api.js            # Axios instance + all API calls
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css             # Full design system
│   ├── index.html
│   └── package.json
│
├── backend/                      # Spring Boot REST API
│   ├── src/main/java/com/shaik/portfolio/
│   │   ├── controller/
│   │   │   ├── ProjectController.java
│   │   │   ├── SkillController.java
│   │   │   ├── ExperienceController.java
│   │   │   ├── ContactController.java
│   │   │   ├── HealthController.java
│   │   │   └── WebConfig.java    # CORS config
│   │   ├── model/
│   │   │   ├── Project.java
│   │   │   ├── SkillCategory.java
│   │   │   ├── Experience.java
│   │   │   └── ContactMessage.java
│   │   ├── service/
│   │   │   ├── ProjectService.java
│   │   │   ├── SkillService.java
│   │   │   ├── ExperienceService.java
│   │   │   └── ContactService.java
│   │   └── PortfolioApplication.java
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
├── README.md
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | v18+ |
| npm | v9+ |
| Java JDK | **17+** |
| Maven | 3.8+ |

> ⚠️ **Java 17+ is required** for Spring Boot 3.x. Install from: https://adoptium.net

---

### 1. Clone the Repository

```bash
git clone https://github.com/ahamad30626/portfolio.git
cd portfolio
```

---

### 2. Start the Backend (Spring Boot)

```bash
cd backend
mvn spring-boot:run
```

The API will start at **http://localhost:8080**

#### Available API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/projects` | All projects |
| `GET` | `/api/projects/{id}` | Single project |
| `GET` | `/api/skills` | All skill categories |
| `GET` | `/api/experience` | Work experience |
| `POST` | `/api/contact` | Submit contact form |
| `GET` | `/api/contact` | View all messages |

##### Example: Test health endpoint
```bash
curl http://localhost:8080/api/health
```

##### Example: Submit contact form
```bash
curl -X POST http://localhost:8080/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","subject":"Hello","message":"This is a test message!"}'
```

---

### 3. Start the Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

The app will start at **http://localhost:5173**

---

### 4. Run Both Together

Open two terminals:

**Terminal 1 — Backend:**
```bash
cd backend && mvn spring-boot:run
```

**Terminal 2 — Frontend:**
```bash
cd frontend && npm run dev
```

Then open **http://localhost:5173** in your browser. 🎉

---

## 🔌 API Response Examples

### `GET /api/projects`
```json
[
  {
    "id": 1,
    "title": "NeuralChat AI",
    "description": "An AI-powered chat application...",
    "imageUrl": "/project1.png",
    "tags": ["React", "OpenAI API", "Node.js", "WebSockets"],
    "demoUrl": "#",
    "githubUrl": "#",
    "featured": true
  }
]
```

### `POST /api/contact` — Request
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Freelance Project",
  "message": "I'd love to work with you on a new project!"
}
```

### `POST /api/contact` — Response
```json
{
  "success": true,
  "message": "Thank you John Doe! I'll get back to you within 24 hours.",
  "id": 1
}
```

---

## ✨ Features

### Frontend
- ⚡ **React 18** with Vite for blazing fast dev experience
- 🎨 **Custom CSS design system** with CSS variables, no frameworks
- 🖱️ **Premium cursor** — dot + lag-following ring
- 🌌 **Particle canvas** — animated network background
- ✍️ **Typewriter animation** for hero roles
- 🔮 **Blob animations** in hero section
- 📜 **Scroll-reveal animations** via IntersectionObserver
- 🧭 **Scroll-spy navbar** with active section highlighting
- 📊 **Skill ring charts** with animated stroke draw
- 📬 **Contact form** with client-side validation + API submission
- 🍞 **Toast notifications** for form feedback
- 📱 **Fully responsive** with mobile hamburger menu
- ♿ **Accessible** — ARIA labels, semantic HTML, keyboard nav
- 🔄 **Static fallback data** if backend is offline

### Backend
- 🍃 **Spring Boot 3.2** REST API
- 🛡️ **Bean Validation** on contact form fields
- 🗄️ **H2 in-memory** database (zero config)
- 🔒 **CORS configured** for React dev server
- 📝 **Structured logging** of contact messages
- 💡 **Health check endpoint** at `/api/health`
- 🧰 **Lombok** for clean, boilerplate-free models

---

## 🛠️ Development

### Build for Production

```bash
# Frontend
cd frontend
npm run build        # outputs to frontend/dist/

# Backend
cd backend
mvn clean package    # outputs to backend/target/portfolio-1.0.0.jar
java -jar target/portfolio-1.0.0.jar
```

### H2 Console (Dev)

While the backend is running, visit:
```
http://localhost:8080/h2-console
JDBC URL: jdbc:h2:mem:portfoliodb
Username: sa
Password: (empty)
```

---

## 📦 Dependencies

### Frontend
| Package | Purpose |
|---------|---------|
| `react` | UI framework |
| `react-dom` | DOM rendering |
| `axios` | HTTP client for API calls |
| `vite` | Build tool & dev server |

### Backend
| Dependency | Purpose |
|-----------|---------|
| `spring-boot-starter-web` | REST API |
| `spring-boot-starter-validation` | Bean validation |
| `spring-boot-starter-data-jpa` | JPA/ORM |
| `h2` | In-memory database |
| `lombok` | Boilerplate reduction |
| `spring-boot-devtools` | Hot reload |

---

## 🗺️ Roadmap

- [ ] Connect to PostgreSQL / MySQL for persistent storage
- [ ] Add JavaMailSender for real email notifications
- [ ] Implement JWT authentication for admin dashboard
- [ ] Add admin panel to manage projects and skills
- [ ] Deploy frontend to Vercel / Netlify
- [ ] Deploy backend to Railway / Render / AWS EC2
- [ ] Add unit tests (JUnit 5, Mockito)
- [ ] Add E2E tests (Playwright / Cypress)

---

## 📄 License

MIT License © 2025 Shaik

---

<div align="center">
  <p>Designed & Built with ❤️ by <strong>Shaik</strong></p>
  <p>
    <a href="https://github.com/ahamad30626/portfolio">GitHub</a> ·
    <a href="https://linkedin.com">LinkedIn</a> ·
    <a href="mailto:shaik@example.com">Email</a>
  </p>
</div>
