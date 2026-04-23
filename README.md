# DevOps Profile Hub

A full-stack personal portfolio web application built as a **DevOps lab demonstration**.
Display your name, college, skills, certifications, and profile image — all managed through a REST API and a React UI.

---

## Tech Stack

| Layer          | Technology                        |
|----------------|-----------------------------------|
| Frontend       | React 18 + Vite 5                 |
| Backend        | Spring Boot 3.2 (Java 17)         |
| Build tool     | Maven 3.9                         |
| Database       | H2 (in-memory)                    |
| Containerization | Docker + Docker Compose          |
| CI/CD          | Jenkins                           |
| Package manager | npm 10                           |
| Runtime        | Node.js v22                       |

---

## Port Configuration

| Service  | Port  | URL                              |
|----------|-------|----------------------------------|
| Frontend | 8081  | http://localhost:8081            |
| Backend  | 8083  | http://localhost:8083            |
| Jenkins  | 8082  | http://localhost:8082            |
| H2 Console | 8083 | http://localhost:8083/h2-console |

---

## Project Structure

```
devops-profile-hub/
├── backend/                         # Spring Boot application
│   ├── src/
│   │   └── main/
│   │       ├── java/com/devops/profile/
│   │       │   ├── ProfileHubApplication.java
│   │       │   ├── config/CorsConfig.java
│   │       │   ├── controller/ProfileController.java
│   │       │   ├── model/Profile.java
│   │       │   └── repository/ProfileRepository.java
│   │       └── resources/
│   │           └── application.properties
│   ├── Dockerfile
│   └── pom.xml
├── frontend/                        # React + Vite application
│   ├── src/
│   │   ├── api/profileApi.js
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── ProfileCard.jsx
│   │   │   ├── ProfileForm.jsx
│   │   │   └── ProfileList.jsx
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── vite.config.js
│   └── package.json
├── docker-compose.yml
├── Jenkinsfile
├── .gitignore
└── README.md
```

---

## REST API Reference

### GET /profile
Returns a list of all profiles stored in the H2 database.

```bash
curl http://localhost:8083/profile
```

### POST /profile
Creates a new profile.

```bash
curl -X POST http://localhost:8083/profile \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "college": "MIT",
    "skills": ["Docker", "Kubernetes", "Jenkins"],
    "certifications": ["AWS Solutions Architect", "CKA"],
    "imageUrl": "https://example.com/photo.jpg"
  }'
```

### GET /profile/{id}
Returns a single profile by ID.

### PUT /profile/{id}
Updates an existing profile by ID.

### DELETE /profile/{id}
Deletes a profile by ID.

---

## Local Development Setup

### Prerequisites

- Java 17+
- Maven 3.9+
- Node.js v22+
- npm 10+

---

### Run the Backend

```bash
cd backend
mvn clean spring-boot:run
```

The API will be available at **http://localhost:8083**
H2 Console: **http://localhost:8083/h2-console**
  - JDBC URL: `jdbc:h2:mem:profiledb`
  - Username: `sa`
  - Password: *(leave blank)*

---

### Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

The React app will be available at **http://localhost:8081**

---

## Docker Setup

### Build and run everything with Docker Compose

```bash
# From the project root
docker-compose up --build
```

This will:
1. Build the Spring Boot JAR inside a Maven builder container
2. Package it in a lightweight JRE Alpine image (port 8083)
3. Build the React production bundle inside a Node builder container
4. Serve the bundle with Nginx (port 8081)

### Stop and remove containers

```bash
docker-compose down
```

### View running containers

```bash
docker-compose ps
```

---

## Jenkins Pipeline

### Jenkins job name: `devops-profile-hub-pipeline`

Jenkins runs on **port 8082**.

### Pipeline stages

| # | Stage | Description |
|---|-------|-------------|
| 1 | **Checkout** | Clones the repository from GitHub using `checkout scm` |
| 2 | **Build Backend** | Runs `mvn clean install` in the `backend/` directory |
| 3 | **Build Frontend** | Runs `npm install && npm run build` in the `frontend/` directory |
| 4 | **Docker Build** | Builds `devops-profile-hub-backend` and `devops-profile-hub-frontend` Docker images |
| 5 | **Deploy** *(optional)* | Runs `docker-compose up -d` — only on `main`/`master` branch |

### Setting up the Jenkins job

1. Open Jenkins at `http://localhost:8082`
2. Click **New Item**
3. Name it `devops-profile-hub-pipeline`
4. Choose **Pipeline** and click OK
5. Under **Pipeline → Definition** select *Pipeline script from SCM*
6. Set SCM to **Git** and enter your GitHub repository URL
7. Set the branch to `*/main`
8. Leave *Script Path* as `Jenkinsfile`
9. Click **Save** then **Build Now**

---

## Environment Variables (Docker Compose)

| Variable | Default | Description |
|----------|---------|-------------|
| `SPRING_PROFILES_ACTIVE` | `docker` | Active Spring profile |
| `SERVER_PORT` | `8083` | Backend server port |

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

## License

MIT © DevOps Profile Hub
