# TipsHub

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge&labelColor=1a1a25" alt="Version" />
  <img src="https://img.shields.io/badge/React-18.x-61dafb?style=for-the-badge&labelColor=1a1a25&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Django-5.x-092e20?style=for-the-badge&labelColor=1a1a25&logo=django" alt="Django" />
  <img src="https://img.shields.io/badge/Docker-24.0-blue?style=for-the-badge&labelColor=1a1a25&logo=docker" alt="Docker" />
</p>

<p align="center">
  <strong>Your Complete Guide to Online Earnings</strong><br />
  A clean, futuristic directory for earning opportunities - surveys, videos, microtasks, cashback, and more.
</p>

---

## ✨ Features

- 🔍 **Real-time Search** - Find sites instantly as you type
- 🎯 **Advanced Filtering** - Filter by earning method, payout type, country, and more
- 🌎 **Nigeria Focus** - Special filters for Africa availability
- 🏆 **Featured Sites** - Highlighted top-picks for maximum earnings
- 📱 **Responsive Design** - Works beautifully on mobile, tablet, and desktop
- 🎨 **Futuristic UI** - Dark theme with glassmorphism and smooth animations

---

## 🚀 Quick Start

### Prerequisites

- [Docker](https://www.docker.com/get-started) (20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (2.0+)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/tipshub.git
   cd tipshub
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start the application**
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - Frontend: http://localhost
   - API: http://localhost/api
   - Admin: http://localhost/admin

---

## 🛠️ Development

### Local Development Setup

#### Backend (Django)

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run development server
python manage.py runserver
```

#### Frontend (React)

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

### Running with Docker Compose

```bash
# Build and start all services
docker-compose up --build

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Reset database
docker-compose down -v
```

---

## 📁 Project Structure

```
tipshub/
├── backend/                 # Django REST API
│   ├── tipshub/           # Main Django project
│   ├── sites/             # Earning sites app
│   ├── manage.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom hooks
│   │   ├── services/    # API services
│   │   └── store/       # State management
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   └── Dockerfile
│
├── nginx/                 # Nginx configuration
│   └── nginx.conf
│
├── docker-compose.yml     # Docker Compose config
├── .env.example          # Environment variables template
├── PRODUCT_SPEC.md        # Product specification
└── README.md             # This file
```

---

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DEBUG` | Django debug mode | `False` |
| `SECRET_KEY` | Django secret key | (required) |
| `ALLOWED_HOSTS` | Allowed hostnames | `localhost` |
| `DB_NAME` | PostgreSQL database name | `tipshub` |
| `DB_USER` | PostgreSQL username | `tipshub_user` |
| `DB_PASSWORD` | PostgreSQL password | (required) |
| `DB_HOST` | Database host | `db` |
| `DB_PORT` | Database port | `5432` |

### Ports

| Service | Port |
|---------|------|
| Nginx | 80, 443 |
| Django API | 8000 |
| React Dev | 5173 |
| PostgreSQL | 5432 |

---

## 📡 API Documentation

### Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/sites/` | GET | List all sites |
| `/api/sites/{slug}/` | GET | Get site details |
| `/api/sites/featured/` | GET | Featured sites only |
| `/api/methods/` | GET | Earning methods list |
| `/api/payouts/` | GET | Payout methods list |
| `/api/countries/` | GET | Countries list |
| `/api/filters/` | GET | All filter options |
| `/api/health/` | GET | Health check |

### Query Parameters

```bash
# Filter by status
GET /api/sites/?status=active

# Filter by earning method
GET /api/sites/?methods=surveys

# Filter by Nigeria availability
GET /api/sites/?nigeria=true

# Combined filters
GET /api/sites/?status=active&methods=surveys&min_payout=5
```

---

## 🐳 Docker Commands

### Basic Commands

```bash
# Start all services
docker-compose up -d

# Rebuild services
docker-compose up -d --build

# View logs
docker-compose logs -f [service]

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Database Commands

```bash
# Run migrations
docker-compose exec backend python manage.py migrate

# Create migrations
docker-compose exec backend python manage.py makemigrations

# Create superuser
docker-compose exec backend python manage.py createsuperuser

# Collect static files
docker-compose exec backend python manage.py collectstatic --noinput
```

### Troubleshooting

```bash
# Restart a specific service
docker-compose restart backend

# View service status
docker-compose ps

# Access container shell
docker-compose exec backend bash
docker-compose exec frontend sh
```

---

## 🔐 Admin Panel

Access the Django admin panel at `/admin/` to:

- Add, edit, or delete earning sites
- Manage earning methods and payout options
- Update site verification status
- Import/export data via CSV or JSON

**Default admin credentials:** Created via `createsuperuser` command.

---

## 🎨 Design System

### Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Background | Pure Black | `#000000` |
| Surface | Near Black | `#0a0a0a` |
| Border | Charcoal | `#262626` |
| Text | White | `#ffffff` |
| Text Secondary | Gray | `#a3a3a3` |

### Typography

- **Headings:** Space Grotesk (600, 700)
- **Body:** Inter (400)
- **Monospace:** JetBrains Mono

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Django](https://www.djangoproject.com/) - The web framework
- [React](https://reactjs.org/) - The UI library
- [Tailwind CSS](https://tailwindcss.com/) - The styling framework
- [Docker](https://www.docker.com/) - Containerization platform

---

<p align="center">
  Made with ⚡ for earners everywhere
</p>
