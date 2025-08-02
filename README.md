# BusinessMadeEasy - E-commerce Billing Software

The world's best billing software with voice-controlled inventory management, advanced analytics, and comprehensive e-commerce features.

## Features

- 🎯 **Smart Billing System** - Generate professional invoices and receipts
- 🗣️ **Voice-Controlled Inventory** - Add/remove inventory by speaking
- 📊 **Advanced Analytics** - Real-time sales and inventory insights
- 📈 **Interactive Dashboards** - Beautiful charts and graphs
- 🔔 **Smart Alerts** - Low inventory notifications
- 💳 **Multiple Payment Methods** - Support for various payment options
- 📱 **Responsive Design** - Works on all devices
- 🔐 **Secure Authentication** - JWT-based security

## Tech Stack

### Backend
- Node.js + Express.js
- MongoDB with Mongoose
- JWT Authentication
- Socket.io for real-time updates
- Voice processing APIs

### Frontend
- React with TypeScript
- Material-UI for components
- Recharts for analytics
- Socket.io client for real-time updates
- Web Speech API for voice control

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd businessmadeEasy
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**
   ```bash
   cd ../server
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Start the development servers**
   
   **Backend (Terminal 1):**
   ```bash
   cd server
   npm run dev
   ```
   
   **Frontend (Terminal 2):**
   ```bash
   cd client
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Project Structure

```
businessmadeEasy/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── utils/         # Utility functions
│   │   └── types/         # TypeScript types
│   └── public/
├── server/                # Node.js backend
│   ├── routes/           # API routes
│   ├── models/           # Database models
│   ├── middleware/       # Custom middleware
│   ├── utils/            # Utility functions
│   └── index.js          # Server entry point
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Sales
- `GET /api/sales` - Get all sales
- `POST /api/sales` - Create new sale/bill
- `GET /api/sales/:id` - Get specific sale

### Inventory
- `GET /api/inventory` - Get inventory status
- `POST /api/inventory/voice-update` - Voice-controlled updates
- `GET /api/inventory/low-stock` - Low stock alerts

### Analytics
- `GET /api/analytics/sales` - Sales analytics
- `GET /api/analytics/inventory` - Inventory analytics
- `GET /api/analytics/dashboard` - Dashboard data

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

For support, email support@businessmadeeasy.com or create an issue in this repository.