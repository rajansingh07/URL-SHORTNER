# URL Shortener

A modern, responsive frontend for a URL Shortener application built with React and Vite. This project demonstrates a clean UI/UX design with features like real-time URL preview, dark mode, and local storage persistence.

## 🚀 Features

- **Modern UI/UX**: Glassmorphism design, smooth transitions, and responsive layout.
- **Real-time Preview**: Shows a floating preview bubble for long URLs as you type.
- **Dark/Light Mode**: Fully functional theme toggle with persistence.
- **Mocked Backend Logic**: Simulates URL shortening, custom aliases, and expiry dates without a real server.
- **Local Storage History**: Persists the last 5 shortened URLs in the browser's local storage.
- **Smart Routing**:
  - **Redirect Simulation**: Intercepts URL paths to simulate redirection to original URLs.
  - **Custom 404 Page**: Handles invalid short codes with a styled 404 error page.
- **Clipboard Integration**: One-click copy functionality for shortened links.

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) (v18)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📦 Installation & Run

1. **Clone the repository**
   ```bash
   git clone https://github.com/rajansingh07/URL-SHORTNER.git
   cd URL-SHORTNER
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Visit `http://localhost:5173` (or the port shown in your terminal).

## 📂 Project Structure

```
src/
├── components/
│   ├── History.jsx       # Displays list of recently shortened URLs
│   ├── ShortResult.jsx   # Result card with copy & QR mock
│   ├── ThemeToggle.jsx   # Dark/Light mode switcher
│   └── UrlInput.jsx      # Main input form with validation & preview
├── App.jsx               # Main application logic & mock routing
├── index.css             # Tailwind directives & global styles
└── main.jsx              # Entry point
```

## 🔧 Technical Details

### Mocked Backend & Routing
Since this is a frontend-only project, backend functionality is mocked directly in `App.jsx`:
- **Shortening**: Generates a random 6-character string or uses the provided custom alias.
- **Routing**: The app checks `window.location.pathname` on load.
  - If a path exists (e.g., `/abc123`), it searches `localStorage` for the matching short code.
  - **Found**: Displays a "Redirecting..." animation and forwards the user to the original URL.
  - **Not Found**: Renders a custom 404 component.

### State Management
- **Local Storage**: Used as a simple database to persist the `urlHistory` array.
- **React State**: Manages UI states like input values, theme preference, and active results.

### Styling
- **Tailwind CSS**: Used for all styling, including dark mode variants (`dark:bg-gray-900`) and animations (`animate-fade-in-up`).

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
