
# FoodFlow 🍃

**Rescuing surplus food. Connecting communities. Reducing waste.**

FoodFlow is a full-stack food redistribution platform designed to connect surplus food donors with communities in need. It helps coordinate food donations, receiver requests, and volunteer-powered deliveries through a centralized platform.

The goal is simple: make surplus food easier to redistribute to people who need it.

## ✨ Features

- **User Authentication** — Secure signup, login, and session-based authentication.
- **Food Donations** — Donors can list surplus food with details such as category, quantity, availability, and best-before date.
- **Food Discovery & Requests** — Receivers can browse available donations and request food.
- **Volunteer Deliveries** — Volunteers can accept deliveries and help transport donated food.
- **Delivery Tracking** — Track delivery progress, locations, distance, and estimated arrival time.
- **Location Integration** — Geocoding and location-based calculations to help coordinate deliveries.
- **Dashboards** — Dedicated interfaces for donors, receivers, and volunteers.
- **Delivery History** — View completed deliveries and past activity.
- **Responsive UI** — Designed to work across desktop and mobile screens.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | Full-stack application and routing |
| React | Interactive user interfaces |
| Tailwind CSS | Styling and responsive layouts |
| MySQL | Relational database |
| Mapbox | Geocoding and location services |
| bcrypt | Password hashing |
| REST APIs | Communication between the frontend and backend |

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- MySQL Server
- Git

You'll also need a Mapbox access token for the location-related features.

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd FoodFlow
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root and add the environment variables required by your local configuration.

Example:

```env
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=Foodflow

MAPBOX_ACCESS_TOKEN=your_mapbox_access_token
```

Add any additional variables required by your application, such as your session configuration or image storage credentials.

**Important:** These names are examples. Use the exact variable names referenced in your source code.

### 4. Set up the database

1. Start your MySQL server.
2. Create the `Foodflow` database.
3. Create the required tables and relationships using your project's database schema.
4. Ensure your environment variables match your MySQL configuration.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000](https://food-flow-otg4ygr5z-joeljamesmirandas-projects.vercel.app/)) in your browser.

## 🌱 How It Works

1. **Donate:** A donor lists surplus food and provides its quantity and availability.
2. **Request:** A receiver browses available donations and requests the food they need.
3. **Deliver:** A volunteer accepts an available delivery and transports the food.
4. **Track:** Delivery progress and location information help coordinate the handoff.
5. **Make an impact:** Food that might otherwise go to waste can reach communities that need it.

## 🎯 Project Goals

FoodFlow aims to:

- Reduce avoidable food waste.
- Improve access to surplus food for underserved communities.
- Make coordination between donors, receivers, and volunteers easier.
- Encourage institutions and food providers to participate in food redistribution.

## 🔮 Future Improvements

- Cloud-based image uploads for food donations.
- Notifications for new donations and delivery status changes.
- Improved deployment and production infrastructure.
- Expanded analytics for food rescued and meals redistributed.

## 👨‍💻 Author

**Joel James Miranda**

GitHub: [JoelJamesMiranda](https://github.com/JoelJamesMiranda)

---

Built to explore full-stack development while working on a real-world problem.
