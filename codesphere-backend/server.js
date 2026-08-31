const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const navbarRoutes = require('./routes/navbarRoutes');
dotenv.config();
connectDB();

const app = express();

const allowedOrigins = ['http://localhost:5173', 'https://yourdeployeddomain.com'];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ---- Socket.io setup ----
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        credentials: true,
    },
});

io.on('connection', (socket) => {
    console.log('🔌 Client connected:', socket.id);
    socket.on('disconnect', () => {
        console.log('❌ Client disconnected:', socket.id);
    });
});

// route/controller file gulo theke `req.app.get('io')` diye access korar jonno
app.set('io', io);

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/team', require('./routes/teamRoutes'));
app.use('/api/testimonials', require('./routes/testimonialRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/stats', require('./routes/statsRoutes'));
app.use('/api/hero', require('./routes/heroRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/navbar', navbarRoutes);
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/blog-page', require('./routes/blogPageRoutes'));
app.use('/api/home-sections', require('./routes/homeSectionsRoutes'));
app.use('/api/explore-page', require('./routes/explorePageRoutes'));
app.use('/api/contact-page', require('./routes/contactPageRoutes'));
app.use('/api/articles-page', require('./routes/articlesPageRoutes'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/footer', require('./routes/footerRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));
app.get('/', (req, res) => res.json({ message: 'CodeSphere IT API Running ✅' }));

const PORT = process.env.PORT || 5000;

// ⚠️ app.listen na kore ekhon theke server.listen — socket.io er jonno dorkar
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));