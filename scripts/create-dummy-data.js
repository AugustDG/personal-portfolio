#!/usr/bin/env node

const { createDirectus, rest, authentication, createItem } = require('@directus/sdk');

// Configuration
const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const DIRECTUS_EMAIL = process.env.DIRECTUS_ADMIN_EMAIL || 'admin@example.com';
const DIRECTUS_PASSWORD = process.env.DIRECTUS_ADMIN_PASSWORD || 'd1r3ctu5';

// Initialize Directus client
const directus = createDirectus(DIRECTUS_URL).with(rest()).with(authentication());

async function authenticateDirectus() {
    try {
        await directus.login(DIRECTUS_EMAIL, DIRECTUS_PASSWORD);
        console.log('✅ Successfully authenticated with Directus');
    } catch (error) {
        console.error('❌ Failed to authenticate with Directus:', error.message);
        process.exit(1);
    }
}

async function createDummyBlogPosts() {
    console.log('\n📝 Creating dummy blog posts...');

    const blogPosts = [
        {
            title: "Getting Started with Next.js 14",
            slug: "getting-started-nextjs-14",
            date: new Date('2024-01-15').toISOString(),
            excerpt: "Explore the latest features and improvements in Next.js 14, including the new App Router and enhanced performance optimizations.",
            tags: JSON.stringify(["Next.js", "React", "JavaScript", "Web Development"]),
            published: true,
            body: `# Getting Started with Next.js 14

Next.js 14 brings exciting new features and performance improvements that make building modern web applications even more enjoyable.

## What's New

### App Router Stability
The App Router is now stable and production-ready, offering:
- Improved routing performance
- Better code splitting
- Enhanced developer experience

### Server Components
React Server Components are now the default, providing:
- Reduced bundle sizes
- Better SEO
- Faster initial page loads

## Getting Started

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

Start building amazing applications with Next.js 14 today!`
        },
        {
            title: "The Future of Web Development",
            slug: "future-of-web-development",
            date: new Date('2024-02-01').toISOString(),
            excerpt: "Exploring emerging trends and technologies that will shape the future of web development.",
            tags: JSON.stringify(["Web Development", "Technology", "Future", "Trends"]),
            published: true,
            body: `# The Future of Web Development

The web development landscape is constantly evolving. Let's explore what's coming next.

## Emerging Technologies

### WebAssembly
- Near-native performance in browsers
- Language-agnostic development
- Better suited for compute-intensive tasks

### Edge Computing
- Reduced latency
- Better user experiences
- Distributed architecture

### AI Integration
- Automated code generation
- Enhanced user interactions
- Smart content optimization

The future is bright for web developers willing to adapt and learn!`
        },
        {
            title: "Building Responsive Layouts with CSS Grid",
            slug: "css-grid-responsive-layouts",
            date: new Date('2024-02-15').toISOString(),
            excerpt: "Master CSS Grid to create complex, responsive layouts with ease and flexibility.",
            tags: JSON.stringify(["CSS", "Grid", "Responsive Design", "Frontend"]),
            published: true,
            body: `# Building Responsive Layouts with CSS Grid

CSS Grid revolutionizes how we create layouts on the web. Let's dive into its powerful features.

## Grid Basics

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
\`\`\`

## Advanced Techniques

### Named Grid Lines
\`\`\`css
.grid {
  grid-template-columns: [sidebar-start] 250px [content-start] 1fr [content-end];
}
\`\`\`

### Grid Areas
\`\`\`css
.layout {
  grid-template-areas: 
    "header header"
    "sidebar content"
    "footer footer";
}
\`\`\`

CSS Grid makes complex layouts simple and maintainable!`
        },
        {
            title: "TypeScript Best Practices for React",
            slug: "typescript-react-best-practices",
            date: new Date('2024-03-01').toISOString(),
            excerpt: "Learn essential TypeScript patterns and best practices for building robust React applications.",
            tags: JSON.stringify(["TypeScript", "React", "Best Practices", "JavaScript"]),
            published: false, // Draft post
            body: `# TypeScript Best Practices for React

TypeScript enhances React development with static typing and better developer experience.

## Component Typing

### Props Interface
\`\`\`typescript
interface ButtonProps {
  variant: 'primary' | 'secondary';
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant, disabled, onClick, children }) => {
  return (
    <button
      className={\`btn btn-\${variant}\`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
\`\`\`

More content coming soon...`
        }
    ];

    for (const post of blogPosts) {
        try {
            await directus.request(createItem('blog', post));
            console.log(`✅ Created blog post: ${post.title}`);
        } catch (error) {
            console.error(`❌ Failed to create blog post "${post.title}":`, error.message);
        }
    }
}

async function createDummyProjects() {
    console.log('\n🚀 Creating dummy projects...');

    const projects = [
        {
            title: "E-Commerce Dashboard",
            slug: "ecommerce-dashboard",
            description: "A comprehensive admin dashboard for managing e-commerce operations with real-time analytics and inventory management.",
            technologies: JSON.stringify(["React", "TypeScript", "Node.js", "PostgreSQL", "Charts.js", "Tailwind CSS"]),
            live_url: "https://ecommerce-dashboard-demo.vercel.app",
            github_url: "https://github.com/yourusername/ecommerce-dashboard",
            date: new Date('2024-01-20').toISOString(),
            featured: true,
            body: `# E-Commerce Dashboard

A powerful admin dashboard for e-commerce businesses built with modern web technologies.

## Features

### Analytics & Reporting
- Real-time sales tracking
- Customer behavior insights
- Revenue analytics
- Performance metrics

### Inventory Management
- Product catalog management
- Stock level monitoring
- Automated reorder alerts
- Supplier integration

### Order Processing
- Order status tracking
- Payment processing
- Shipping management
- Customer communication

## Technical Stack

- **Frontend**: React 18 with TypeScript
- **Backend**: Node.js with Express
- **Database**: PostgreSQL with Prisma ORM
- **Charts**: Chart.js for data visualization
- **Styling**: Tailwind CSS with custom components

## Key Achievements

- 40% improvement in order processing time
- Real-time data updates across all modules
- Mobile-responsive design for on-the-go management
- Comprehensive role-based access control

This dashboard significantly improved operational efficiency for small to medium e-commerce businesses.`
        },
        {
            title: "AI-Powered Chat Application",
            slug: "ai-chat-application",
            description: "An intelligent chat application with AI-powered responses, real-time messaging, and advanced conversation management.",
            technologies: JSON.stringify(["Next.js", "OpenAI API", "Socket.io", "MongoDB", "Redis", "Vercel"]),
            live_url: "https://ai-chat-demo.vercel.app",
            github_url: "https://github.com/yourusername/ai-chat-app",
            date: new Date('2024-02-10').toISOString(),
            featured: true,
            body: `# AI-Powered Chat Application

An intelligent chat platform that combines real-time messaging with AI-powered responses and conversation management.

## Core Features

### AI Integration
- OpenAI GPT integration for intelligent responses
- Context-aware conversations
- Custom prompt engineering
- Response streaming for better UX

### Real-time Messaging
- WebSocket-based communication
- Typing indicators
- Message delivery status
- Online presence tracking

### Conversation Management
- Chat history preservation
- Conversation search
- Message threading
- Export capabilities

## Architecture

### Frontend
- Next.js 14 with App Router
- Real-time updates with Socket.io
- Responsive design with Tailwind CSS
- Optimistic UI updates

### Backend
- Node.js API with Express
- OpenAI API integration
- MongoDB for data persistence
- Redis for session management

### Deployment
- Vercel for frontend hosting
- Railway for backend services
- MongoDB Atlas for database
- Redis Cloud for caching

## Technical Challenges Solved

1. **Token Management**: Efficient handling of OpenAI API tokens and rate limits
2. **Real-time Sync**: Synchronizing AI responses with live chat updates
3. **Performance**: Optimizing for low latency and high concurrent users
4. **Scalability**: Designing for horizontal scaling

This project demonstrates advanced integration of AI services with real-time web applications.`
        },
        {
            title: "Mobile-First PWA",
            slug: "mobile-first-pwa",
            description: "A progressive web application built with mobile-first principles, featuring offline functionality and native app-like experience.",
            technologies: JSON.stringify(["React", "PWA", "Service Workers", "IndexedDB", "Web Push", "Workbox"]),
            live_url: "https://mobile-pwa-demo.netlify.app",
            github_url: "https://github.com/yourusername/mobile-pwa",
            date: new Date('2024-03-05').toISOString(),
            featured: false,
            body: `# Mobile-First Progressive Web Application

A cutting-edge PWA that delivers native app experiences through web technologies.

## PWA Features

### Offline Functionality
- Service worker implementation
- Cache-first strategies
- Background sync
- Offline data storage with IndexedDB

### Native-like Experience
- App shell architecture
- Smooth animations and transitions
- Touch-friendly interfaces
- Native app installation

### Push Notifications
- Web Push API integration
- User engagement features
- Targeted messaging
- Notification preferences

## Performance Optimizations

- Lighthouse score: 98/100
- First Contentful Paint: <1.5s
- Time to Interactive: <2.5s
- Bundle size optimization

## Key Technologies

- **React 18**: Component architecture
- **Workbox**: Service worker management
- **IndexedDB**: Client-side data storage
- **Web Push API**: Notification system
- **Web App Manifest**: Installation capabilities

This PWA showcases the potential of web technologies to compete with native mobile applications.`
        }
    ];

    for (const project of projects) {
        try {
            await directus.request(createItem('projects', project));
            console.log(`✅ Created project: ${project.title}`);
        } catch (error) {
            console.error(`❌ Failed to create project "${project.title}":`, error.message);
        }
    }
}

async function createDummyGalleries() {
    console.log('\n🖼️ Creating dummy galleries...');

    const galleries = [
        {
            name: "Web Development Screenshots",
            description: "Screenshots from various web development projects showcasing modern UI designs and user interfaces.",
            images: JSON.stringify([
                {
                    filename: "dashboard-main.jpg",
                    url: "https://picsum.photos/800/600?random=1",
                    thumbnail: "https://picsum.photos/200/150?random=1",
                    alt: "Main dashboard interface",
                    caption: "Modern dashboard with clean design and intuitive navigation"
                },
                {
                    filename: "mobile-responsive.jpg",
                    url: "https://picsum.photos/800/600?random=2",
                    thumbnail: "https://picsum.photos/200/150?random=2",
                    alt: "Mobile responsive design",
                    caption: "Responsive layout adapting to different screen sizes"
                },
                {
                    filename: "chat-interface.jpg",
                    url: "https://picsum.photos/800/600?random=3",
                    thumbnail: "https://picsum.photos/200/150?random=3",
                    alt: "Chat application interface",
                    caption: "Real-time chat interface with modern design patterns"
                }
            ])
        },
        {
            name: "UI/UX Design Process",
            description: "Visual documentation of the design process from wireframes to final implementations.",
            images: JSON.stringify([
                {
                    filename: "wireframe-sketch.jpg",
                    url: "https://picsum.photos/800/600?random=4",
                    thumbnail: "https://picsum.photos/200/150?random=4",
                    alt: "Initial wireframe sketches",
                    caption: "Hand-drawn wireframes for initial concept exploration"
                },
                {
                    filename: "design-system.jpg",
                    url: "https://picsum.photos/800/600?random=5",
                    thumbnail: "https://picsum.photos/200/150?random=5",
                    alt: "Design system components",
                    caption: "Comprehensive design system with reusable components"
                },
                {
                    filename: "user-flow.jpg",
                    url: "https://picsum.photos/800/600?random=6",
                    thumbnail: "https://picsum.photos/200/150?random=6",
                    alt: "User flow diagram",
                    caption: "User journey mapping and flow optimization"
                }
            ])
        },
        {
            name: "Development Tools & Setup",
            description: "Screenshots of development environments, tools, and coding setups used in various projects.",
            images: JSON.stringify([
                {
                    filename: "vscode-setup.jpg",
                    url: "https://picsum.photos/800/600?random=7",
                    thumbnail: "https://picsum.photos/200/150?random=7",
                    alt: "VS Code development environment",
                    caption: "Customized VS Code setup with productivity extensions"
                },
                {
                    filename: "terminal-config.jpg",
                    url: "https://picsum.photos/800/600?random=8",
                    thumbnail: "https://picsum.photos/200/150?random=8",
                    alt: "Terminal configuration",
                    caption: "Optimized terminal setup for efficient development workflow"
                }
            ])
        },
        {
            name: "Project Presentations",
            description: "Screenshots from project presentations, demos, and client meetings.",
            images: JSON.stringify([
                {
                    filename: "demo-presentation.jpg",
                    url: "https://picsum.photos/800/600?random=9",
                    thumbnail: "https://picsum.photos/200/150?random=9",
                    alt: "Project demo presentation",
                    caption: "Live demo of project features and functionality"
                },
                {
                    filename: "client-feedback.jpg",
                    url: "https://picsum.photos/800/600?random=10",
                    thumbnail: "https://picsum.photos/200/150?random=10",
                    alt: "Client feedback session",
                    caption: "Collaborative feedback session with project stakeholders"
                }
            ])
        }
    ];

    for (const gallery of galleries) {
        try {
            await directus.request(createItem('galleries', gallery));
            console.log(`✅ Created gallery: ${gallery.name}`);
        } catch (error) {
            console.error(`❌ Failed to create gallery "${gallery.name}":`, error.message);
        }
    }
}

async function createDummyAbout() {
    console.log('\n👤 Creating dummy about content...');

    const aboutData = {
        name: "Alex Developer",
        title: "Full-Stack Developer & UI/UX Designer",
        bio: "Passionate full-stack developer with 5+ years of experience building modern web applications. I specialize in React, Node.js, and creating exceptional user experiences. When I'm not coding, you can find me exploring new technologies, contributing to open source projects, or sharing knowledge through blog posts and tutorials.",
        skills: JSON.stringify([
            "JavaScript/TypeScript",
            "React & Next.js",
            "Node.js & Express",
            "PostgreSQL & MongoDB",
            "Docker & DevOps",
            "UI/UX Design",
            "Git & Version Control",
            "REST & GraphQL APIs"
        ]),
        contact: JSON.stringify({
            email: "alex@example.com",
            github: "https://github.com/alexdeveloper",
            linkedin: "https://linkedin.com/in/alexdeveloper",
            twitter: "https://twitter.com/alexdevs"
        })
    };

    try {
        await directus.request(createItem('about', aboutData));
        console.log('✅ Created about content');
    } catch (error) {
        console.error('❌ Failed to create about content:', error.message);
    }
}

async function main() {
    console.log('🚀 Creating dummy data in Directus...');
    console.log(`📍 Directus URL: ${DIRECTUS_URL}`);

    try {
        await authenticateDirectus();
        await createDummyBlogPosts();
        await createDummyProjects();
        await createDummyGalleries();
        await createDummyAbout();

        console.log('\n🎉 Dummy data creation completed successfully!');
        console.log('\nCreated:');
        console.log('📝 4 Blog posts (3 published, 1 draft)');
        console.log('🚀 3 Projects (2 featured, 1 regular)');
        console.log('🖼️ 4 Image galleries with sample images');
        console.log('👤 1 About profile');
        console.log('\nNext steps:');
        console.log('1. Check your Directus admin panel to see the content');
        console.log('2. Generate a static token in Settings > Access Tokens');
        console.log('3. Update your .env.dev file with the token');
        console.log('4. Start your Next.js app: npm run dev');
    } catch (error) {
        console.error('\n💥 Dummy data creation failed:', error.message);
        process.exit(1);
    }
}

// Handle command line arguments
if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log(`
Directus Dummy Data Creation Script

Usage: node scripts/create-dummy-data.js [options]

Environment Variables:
  DIRECTUS_URL              Directus instance URL (default: http://localhost:8055)
  DIRECTUS_ADMIN_EMAIL      Admin email (default: admin@example.com)
  DIRECTUS_ADMIN_PASSWORD   Admin password (default: d1r3ctu5)

Options:
  --help, -h    Show this help message

Before running:
1. Make sure Directus is running: docker-compose -f docker-compose.dev.yml up -d
2. Make sure your Directus collections are set up (import schema first)
3. Verify admin credentials (or set environment variables)

Example:
  DIRECTUS_ADMIN_EMAIL=admin@mysite.com DIRECTUS_ADMIN_PASSWORD=mypassword node scripts/create-dummy-data.js
`);
    process.exit(0);
}

main();
