require('dotenv').config();
const mongoose = require('mongoose');
const Blog = require('./models/Blog');

const blogs = [
    {
        title: 'Essential Features Your Website Should Have in 2026',
        excerpt: 'A modern business website needs more than a homepage. Here are the features we recommend to every client before launch.',
        content: `A modern business website needs more than a homepage. Here are the features we recommend to every client before launch:

1. Mobile-first responsive design — most visitors browse on their phone first.
2. Fast load times — every extra second of load time costs conversions.
3. Clear calls-to-action — make it obvious how to contact or buy.
4. SEO-friendly structure — proper headings, meta tags, and clean URLs.
5. Secure contact forms with spam protection.
6. An easy-to-manage admin panel so content stays fresh without a developer.

At AMANAH IT, we build every website with these fundamentals baked in from day one.`,
        tags: ['Web Development'],
        published: true,
    },
    {
        title: 'Why MERN Stack Is Still a Great Choice for Startups',
        excerpt: 'React, Node, MongoDB and Express remain one of the fastest ways to go from idea to a working product.',
        content: `React, Node, MongoDB and Express remain one of the fastest ways to go from idea to a working product.

The MERN stack gives startups a few key advantages:

- One language (JavaScript) across the entire stack, which speeds up development and hiring.
- A huge ecosystem of libraries and community support.
- MongoDB's flexible schema is ideal for products that are still evolving.
- React's component model makes it easy to iterate on UI quickly.

For early-stage products where speed and flexibility matter more than anything else, MERN continues to be one of the most practical choices in 2026.`,
        tags: ['MERN Stack'],
        published: true,
    },
    {
        title: "A Founder's Guide to Choosing an E-commerce Platform",
        excerpt: 'Custom-built vs off-the-shelf — what actually matters when picking a platform for your online store.',
        content: `Custom-built vs off-the-shelf — what actually matters when picking a platform for your online store.

Off-the-shelf platforms (Shopify, WooCommerce) are great when:
- You need to launch fast with a limited budget.
- Your business model fits standard e-commerce patterns.

A custom-built platform makes sense when:
- You need specific workflows the off-the-shelf tools don't support.
- You expect to scale significantly and want full control over performance and cost.
- You want to avoid recurring platform fees as your revenue grows.

We help founders weigh these trade-offs honestly before writing a single line of code.`,
        tags: ['E-commerce'],
        published: true,
    },
    {
        title: 'Securing Your Web App: A Practical Checklist',
        excerpt: 'JWT auth, input validation, rate limiting and the other basics every production app needs.',
        content: `JWT auth, input validation, rate limiting and the other basics every production app needs.

A short checklist we run through on every project before launch:

1. Password hashing with bcrypt, never plain text.
2. JWT tokens with reasonable expiry, refreshed securely.
3. Input validation and sanitization on every endpoint.
4. Rate limiting on auth routes to prevent brute-force attacks.
5. HTTPS everywhere, no exceptions.
6. Environment variables for all secrets, never committed to Git.
7. Regular dependency updates to patch known vulnerabilities.

Security isn't a one-time task — it's a habit built into the development process from day one.`,
        tags: ['Security'],
        published: true,
    },
];

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');

        for (const b of blogs) {
            const exists = await Blog.findOne({ title: b.title });
            if (exists) {
                console.log(`Skip (already exists): ${b.title}`);
                continue;
            }
            await Blog.create(b);
            console.log(`Added: ${b.title}`);
        }

        console.log('\nDone! Shob blog post add hoye geche.');
        process.exit();
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
};

run();