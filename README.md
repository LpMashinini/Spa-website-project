# 🌿 Spa Website Project

![Build Status](https://img.shields.io/github/actions/workflow/status/LpMashinini/Spa-website-project/ci.yml?style=for-the-badge&logo=githubactions&logoColor=white&label=CI)
![Stars](https://img.shields.io/github/stars/LpMashinini/Spa-website-project?style=for-the-badge&logo=github)
![Forks](https://img.shields.io/github/forks/LpMashinini/Spa-website-project?style=for-the-badge&logo=github)
![Issues](https://img.shields.io/github/issues/LpMashinini/Spa-website-project?style=for-the-badge&logo=github)
![Last Commit](https://img.shields.io/github/last-commit/LpMashinini/Spa-website-project?style=for-the-badge&logo=github)

A full-stack spa booking platform that allows customers to explore treatments, book appointments, manage their bookings, and initiate online payments. Built with **React, Spring Boot, and MySQL**, with Docker support for deployment.

---

## ✨ Features

- 💆 **Treatment Listings** — Browse available spa treatments and prices.
- 📅 **Appointment Booking** — Select treatments, appointment dates, and number of guests.
- 🔐 **Authentication** — JWT-based authentication for protected API requests.
- 👤 **User Accounts** — Registration, login, and email verification.
- 🗓️ **My Appointments** — View personal appointment bookings.
- 💳 **Online Payments** — Paystack payment integration.
- 📧 **Email Integration** — Configuration for backend email functionality.
- 📱 **SMS Integration** — Twilio configuration for SMS-related functionality.
- 🗺️ **Map Component** — Location-related information.
- 📱 **Responsive UI** — React components styled with CSS.
- 🐳 **Containerization** — Dockerized frontend and backend.
- 🗄️ **Database Persistence** — MySQL with persistent Docker storage.
- 🌐 **Web Server** — Nginx configuration for serving the frontend.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend user interface |
| JavaScript | Frontend functionality |
| Vite | Frontend development and build tooling |
| Material UI | UI components |
| Axios | HTTP requests |
| Java | Backend programming language |
| Spring Boot | REST API and backend services |
| Maven | Backend dependency management and builds |
| MySQL | Relational database |
| JWT | Token-based authentication |
| Paystack | Payment integration |
| Twilio | SMS integration |
| Docker | Application containerization |
| Docker Compose | Multi-container orchestration |
| Nginx | Frontend web server |

---

## 📁 Project Structure

```text
Spa-website-project/
├── Backend/
│   ├── .mvn/
│   ├── Dockerfile
│   ├── mvnw
│   ├── mvnw.cmd
│   ├── pom.xml
│   └── src/
│       ├── main/
│       │   ├── java/com/...
│       │   └── resources/
│       │       └── application.properties
│       └── test/java/com/...
│
└── Frontend/
    ├── Dockerfile
    ├── docker-compose.yml
    ├── nginx.conf
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── Components/
        │   └── SPA/
        ├── Pages/
        │   ├── Appointment.jsx
        │   ├── Contact.jsx
        │   ├── Login.jsx
        │   ├── Signup.jsx
        │   ├── VerifyEmail.jsx
        │   ├── MyAppointments.jsx
        │   ├── PaymentCallback.jsx
        │   ├── ProfileMenu.jsx
        │   └── MapComponent.jsx
        ├── assets/
        ├── index.css
        └── main.jsx
```

---

## 🚀 Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [Java JDK](https://www.oracle.com/java/technologies/downloads/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) or Docker Engine
- Docker Compose

### 1. Clone the Repository

```bash
git clone https://github.com/LpMashinini/Spa-website-project.git
cd Spa-website-project
```

### 2. Configure Environment Variables

Configure the environment variables required by your backend integrations in a `.env` file alongside the applicable Docker Compose configuration.

```env
PAYSTACK_SECRET_KEY=your_paystack_secret_key
PAYSTACK_CALLBACK_URL=your_paystack_callback_url

TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
TWILIO_ACCOUNT_SID=your_twilio_account_sid

MAIL_USERNAME=your_email_address
MAIL_PASSWORD=your_email_password
```

Ensure your database settings match your Docker Compose configuration.

**Security:** Never commit real credentials, API keys, passwords, or `.env` files to GitHub.

### 3. Run with Docker Compose

Run the command from the directory containing your `docker-compose.yml` file:

```bash
docker compose up -d
```

Check the running containers:

```bash
docker compose ps
```

View backend logs:

```bash
docker compose logs -f spa-backend
```

### 4. Access the Application

| Service | Address |
|---|---|
| Frontend | [http://localhost](http://localhost) |
| Backend | [http://localhost:8080](http://localhost:8080) |
| MySQL from host | `localhost:3307` |

The ports may vary depending on your Docker Compose configuration.

---

## 🐳 Docker Management

**Start the application:**

```bash
docker compose up -d
```

**Stop the application:**

```bash
docker compose down
```

**View service logs:**

```bash
docker compose logs -f
```

The MySQL database uses a persistent volume to preserve data when containers are recreated. Removing containers does not normally delete this volume.

---

## 👥 Contributors

Developed by [LpMashinini](https://github.com/LpMashinini).

[View all contributors](https://github.com/LpMashinini/Spa-website-project/graphs/contributors)

---

## 🤝 Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m "feat: describe your changes"`.
4. Push your branch: `git push origin feature/your-feature`.
5. Open a pull request.

Please follow the existing code style and include tests where appropriate.

---

## 📄 License

No license has been specified. Add a `LICENSE` file if you intend to publish the project under a particular open-source license.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/LpMashinini">LpMashinini</a>
</p>
