News Today - News Feed Application

A responsive news feed application built with React and Vite, powered by the NewsAPI. This application displays the latest headlines, provides search functionality, and allows filtering by categories.

Features

-  **Latest Headlines**: Display top news articles from the US
-  **Search Functionality**: Search for news articles by keywords
-  **Category Filters**: Filter news by categories (All, Top Stories, World, Politics, Business, Tech)
-  **Article Detail Pages**: Full article view with content, related articles, and comments
-  **Modern UI**: Clean, responsive design matching professional news websites
-  **Loading States**: Smooth loading indicators while fetching data
-  **Error Handling**: User-friendly error messages with retry functionality
-  **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
-  **Routing**: React Router for seamless navigation between pages

Tech Stack

- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **NewsAPI** - News data provider

## Setup Instructions

Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- NewsAPI account and API key

Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd newsfeed
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_NEWS_API_KEY=your_api_key_here
   ```
   
   Or get your API key from [NewsAPI.org](https://newsapi.org/):
   ```env
   VITE_NEWS_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Building for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variable:
   - Name: `VITE_NEWS_API_KEY`
   - Value: Your NewsAPI key (get it from [newsapi.org](https://newsapi.org/))
4. Deploy

**Important:** The project includes Vercel serverless functions (`/api/top-headlines` and `/api/everything`) to handle CORS issues. These functions proxy requests to NewsAPI server-side, avoiding browser CORS restrictions.

The app automatically uses:
- **Serverless functions** in production (Vercel)
- **Direct API calls** in development (local)

### Netlify

1. Push your code to GitHub
2. Import your repository in Netlify
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variable:
   - Key: `VITE_NEWS_API_KEY`
   - Value: Your NewsAPI key
5. Deploy

## API Usage

This application uses the [NewsAPI](https://newsapi.org/) service:

- **Top Headlines Endpoint**: Fetches latest headlines by country and category
- **Everything Endpoint**: Searches all articles by query

### API Limits (Free Tier)

- 100 requests per day
- 1 request per second

### Component Architecture

The application follows a component-based architecture with routing:

#### Pages
1. **HomePage**: Main news feed page with search, filters, hero section, and article grid

2. **ArticleDetail**: Full article view page with:
   - Article content and hero image
   - Engagement bar (likes, comments, save, share)
   - Related articles section
   - Comments section with interactive commenting

#### Components
1. **Header Component**: Contains the logo (clickable to navigate home), navigation links, and utility icons

2. **SearchBar Component**: Handles user input for searching articles. Supports both form submission and real-time search clearing.

3. **CategoryFilter Component**: Provides category buttons that filter news by topic. The active category is visually highlighted.

4. **HeroSection Component**: Displays the featured/breaking news article in a large, prominent format with background image and "Read More" button that navigates to detail page.

5. **ArticleCard Component**: Reusable card component for displaying individual articles. Clicking anywhere on the card navigates to the article detail page.

6. **ArticleGrid Component**: Responsive grid layout (1 column mobile, 2 columns tablet, 3 columns desktop) that renders article cards.

7. **ArticleDetail Component**: Full article view with breadcrumbs, content, engagement bar, related articles, and comments.

8. **EngagementBar Component**: Interactive bar with like, comment count, save, and share buttons.

9. **RelatedArticles Component**: Displays related articles in a grid, clickable to navigate to their detail pages.

10. **CommentsSection Component**: Shows existing comments and allows users to add new comments.

11. **LoadingSpinner Component**: Animated spinner shown during data fetching.

12. **ErrorMessage Component**: Displays error messages with retry functionality.

13. **Footer Component**: Standard footer with links and copyright information.

### Service Layer

**newsApi.js**: Centralized API service that:
- Handles all NewsAPI requests
- Manages API key configuration
- Provides methods for fetching headlines and searching articles
- Handles error responses and throws meaningful errors

### State Management

The main `App.jsx` component manages:
- `articles`: Array of news articles
- `loading`: Boolean for loading state
- `error`: Error message string
- `searchQuery`: Current search input
- `activeCategory`: Currently selected category
- `isSearchMode`: Boolean to differentiate search vs category views

### Routing Structure

- `/` - Home page with news feed, search, and category filters
- `/article` - Article detail page (receives article data via React Router state)

### Data Flow

**Home Page:**
1. User interacts with UI (search, category filter)
2. Event handlers update state and call `fetchNews()`
3. `fetchNews()` calls the appropriate NewsAPI method
4. Response is processed and articles are set in state
5. Components re-render with new data
6. Loading/error states are displayed as needed

**Article Detail Page:**
1. User clicks on an article card or "Read More" button
2. Article data is passed via React Router navigation state
3. ArticleDetail component receives and displays the article
4. Related articles are fetched based on article keywords
5. Comments are managed in local state (can be extended to use a backend)

## Features Implementation Details

### Search Functionality
- Uses NewsAPI's "Everything" endpoint
- Searches across all articles
- Sorted by publication date (newest first)
- Clears search when category is changed

### Category Filtering
- Maps UI categories to NewsAPI category parameters
- "All" and "Top Stories" show all headlines
- Other categories filter by NewsAPI category values

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Grid adapts from 1 to 3 columns based on screen size

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for assessment purposes.

## Author

Built as part of a technical assessment task.

