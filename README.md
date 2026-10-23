
# FoodFlow 🍃

**Rescuing surplus food. Connecting communities. Reducing waste.**

FoodFlow is a full-stack food redistribution platform that connects surplus-food donors with people and communities in need through volunteer-powered deliveries.

The platform helps coordinate food donations, requests, volunteer assignments, and delivery tracking in one place, with the goal of reducing avoidable food waste and making surplus food more accessible.

**Live Demo:** [FoodFlow](https://food-flow-pi.vercel.app/)

**Source Code:** [GitHub Repository](https://github.com/JoelJamesMiranda/FoodFlow)

---

## ✨ Features

- **Authentication and Sessions** — User registration, login, and session-based authentication.
- **Food Donation Management** — Create donations with food details, categories, quantities, availability, and best-before information.
- **Food Discovery and Requests** — Browse available food donations and request food.
- **Role-Based Dashboards** — Separate experiences for donors, receivers, and volunteers.
- **Volunteer Delivery Workflow** — Coordinate food pickups and deliveries through different delivery statuses.
- **Location-Based Delivery Tracking** — Use location information to calculate distances and estimated delivery times.
- **Delivery History** — Review previous requests and completed deliveries.
- **Food Image Uploads** — Upload and manage donation images using Cloudinary.
- **Responsive Interface** — Interfaces designed for desktop and mobile devices.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | Full-stack application framework and routing |
| React | Interactive user interfaces |
| Tailwind CSS | Styling and responsive layouts |
| MySQL | Relational database |
| mysql2 | MySQL database connectivity |
| REST APIs | Communication between application components |
| bcrypt | Password hashing |
| Cloudinary | Food image storage and management |
| Mapbox | Location and geocoding integration |

## 🔄 How It Works

1. **Donate:** A donor lists surplus food with its quantity and availability.
2. **Discover:** A receiver browses available donations.
3. **Request:** The receiver requests a suitable donation.
4. **Deliver:** A volunteer helps coordinate pickup and delivery.
5. **Track:** Delivery status, distance, and estimated arrival time help coordinate the handoff.

The goal is to make the journey from surplus food to a person who needs it easier to coordinate.

## 🧰 Getting Started

### Prerequisites

Install the following before running the project locally:

- [Node.js](https://nodejs.org/)
- npm
- [MySQL](https://dev.mysql.com/downloads/)
- [Git](https://git-scm.com/)

Depending on the features you use, you will also need credentials for the configured database, Mapbox, and Cloudinary services.

### 1. Clone the repository

```bash
git clone https://github.com/JoelJamesMiranda/FoodFlow.git
cd FoodFlow
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root.

Use the following as a template, and ensure that the variable names match those referenced by the application:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=Foodflow
DB_SSL=false

MAPBOX_ACCESS_TOKEN=your_mapbox_access_token

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**Important:** This is an example configuration. Verify the exact environment variable names against the source code before running the application. Only configure variables required by your implementation.

Never commit `.env.local`, database passwords, API secrets, or production credentials to GitHub.

### 4. Configure the database

FoodFlow uses MySQL to store user accounts, addresses, donations, claims, deliveries, sessions, and volunteer locations.

For a fresh local installation:

1. Start your MySQL server.
2. Create the database:

   ```bash
   mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS Foodflow;"
   ```

3. Import the schema:

   ```bash
   mysql -u root -p Foodflow < database/schema.sql
   ```

4. Configure your database credentials and required service credentials in `.env.local`.
5. Start the application using `npm run dev`.

The `database/schema.sql` file contains the database structure, not the existing application records. Use a fresh database when importing it; don't import it over an existing database without checking for table conflicts first.

Never commit passwords, API secrets, private certificates, or production credentials to GitHub.


### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build for production

```bash
npm run build
npm run start
```

Run the production server after a successful build.

## 📁 Project Structure

```text
FoodFlow/
├── app/           # Application pages and API routes
├── components/    # Reusable UI components
├── lib/            # Shared utilities and application logic
├── public/         # Static assets
├── package.json
├── package-lock.json
└── README.md
```

## 🎯 Project Goals

FoodFlow aims to:

- Reduce avoidable food waste.
- Improve access to surplus food for underserved communities.
- Simplify coordination between donors, receivers, and volunteers.
- Encourage food redistribution through a centralized platform.

## 🚀 Potential Improvements

- Automated notifications for new donations and delivery updates.
- Automated testing for critical API endpoints and delivery workflows.
- Improved concurrency handling for donation claims.
- Performance monitoring and database query optimization.
- Analytics for food rescued and meals redistributed.

## 👨‍💻 Author

**Joel James Miranda**

- GitHub: [@JoelJamesMiranda](https://github.com/JoelJamesMiranda)
- Project: [FoodFlow on GitHub](https://github.com/JoelJamesMiranda/FoodFlow)

---

Built as a full-stack development project focused on solving a real-world food redistribution problem.
