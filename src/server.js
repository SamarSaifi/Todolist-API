const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const todoRoutes = require('./routes/todoRoutes');
const { initializeDatabase } = require('./database/db');
const auth = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize database
(async () => {
  await initializeDatabase();
})();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(auth);

// Routes
app.use('/api/todos', todoRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;