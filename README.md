My Loft — Backend
📌 Project Description

My Loft is the backend part of a project for managing media (photos and videos).
The administrator uploads images or videos via the frontend into one of 6 categories.

Files are stored in Cloudinary, while links with titles and descriptions are saved in MongoDB.

Features:

Pagination

Sorting

Categorization

🛠️ Technologies

Backend: Node.js + TypeScript, Express

Frontend: Next.js + TypeScript, Tailwind CSS

Database: MongoDB + Cloudinary (for media storage)

ODM: Mongoose

Code style: ESLint + Prettier

🚀 Installation and Running
Backend
# install dependencies
npm install
# run in development mode
npm run dev
# build
npm run build
# run in production
npm run start

Frontend
# run frontend
npm run dev
# access: http://localhost:3000


Backend is available at:

http://localhost:4000


Docker is not used yet.

⚙️ Environment Variables
Frontend
BACKEND_API_URL=
NEXT_PUBLIC_BACKEND_API_URL=

Backend
PORT=
MONGODB_USER=
MONGODB_PASSWORD=
MONGODB_URL=
MONGODB_DB=

EMAIL_FROM=
EMAIL_PASSWORD=
EMAIL_TO=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_URL=
ENABLE_CLOUDINARY=

📡 API

Use Postman collection for working with API (Swagger not implemented yet).

🧹 Testing and Linting

Tests: not available

Linting: ESLint + Prettier

🌍 Deployment

Backend: Render

Frontend: Vercel

👤 Author

Developed by: Yurii Merezhka
