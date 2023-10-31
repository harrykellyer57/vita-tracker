// Filename: complexCode.js
// Description: This code is a complex implementation of a blogging platform with user authentication and CRUD operations for blog posts.

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create express app
const app = express();

// Define BlogPost Model
const BlogPost = mongoose.model('BlogPost', {
  title: String,
  content: String,
  author: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

// Configure app
app.use(bodyParser.json());

// Define JWT secret key
const JWT_SECRET_KEY = 'supersecretkey';

// Middleware for user authentication
function authenticateUser(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'Missing token' });
  }

  jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Retrieve user from database
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Validate password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, { expiresIn: '1d' });

  res.json({ token });
});

// Routes for CRUD operations on blog posts
app.get('/blogposts', authenticateUser, async (req, res) => {
  const blogPosts = await BlogPost.find().sort({ date: -1 });
  res.json(blogPosts);
});

app.post('/blogposts', authenticateUser, async (req, res) => {
  const { title, content } = req.body;
  const author = req.user.userId;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const blogPost = new BlogPost({ title, content, author });
  await blogPost.save();

  res.json(blogPost);
});

app.put('/blogposts/:id', authenticateUser, async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const blogPost = await BlogPost.findById(id);
  if (!blogPost) {
    return res.status(404).json({ error: 'Blog post not found' });
  }

  if (title) {
    blogPost.title = title;
  }
  if (content) {
    blogPost.content = content;
  }

  await blogPost.save();

  res.json(blogPost);
});

app.delete('/blogposts/:id', authenticateUser, async (req, res) => {
  const { id } = req.params;

  const blogPost = await BlogPost.findByIdAndDelete(id);
  if (!blogPost) {
    return res.status(404).json({ error: 'Blog post not found' });
  }

  res.json({ message: 'Blog post deleted successfully' });
});

// Start server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
