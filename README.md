# PokerBoss Office APP

## Pre-requisites 
  Do `npm install` to download the node modules required for the project.

## Scripts

- **Development:** `dev`  
  Starts the Next.js development server.

- **Build:** `tsc -b && vite build`  
  Builds the app for production.

- **Preview:** `vite preview`  
  Boots up a local static web server that serves the files from dist at http://localhost:4173 

---

## Usage

Start the development server:

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

---


## Project Structure


src/
├── api/
│   └── mockData.json            # Local mock API data
│
├── components/
│   └── HeaderComponent/         # Shared layout component (e.g., navbar/header)
│       └── HeaderComponent.jsx
│
├── context/
│   └── StoreContext.jsx         # Global state management using Context API + useReducer
│
├── pages/                       # Route-based folder structure
│   ├── CartComponent/
│   │   ├── index.jsx
│   │   └── index.css
│   │
│   ├── CheckoutPage/
│   │   ├── index.jsx
│   │   └── index.css
│   │
│   ├── ProductPage/
│   │   ├── index.jsx
│   │   └── index.css
│   │
│   └── TenantStore/
│       ├── index.jsx
│       └── index.css
│
├── App.jsx                      # Root component that defines all routes
├── main.jsx                     # React app entry point
├── App.css                      # Global styles for App component
└── index.css                    # Global styles and resets


## Design Principles 

- **Component Resuability:** 
  Can create all the resuable components with the app logic inside this folder, promotes cleaner way to resue the UI/layout

- **Centralised State:** 
   Used Context Api and reducer just like we do it in redux but imitated the global state handling. It helps to keep the state in one place and makes it easier to manage and to avoid prop dirlling.

- **Single Source of Routing:** 
   All routing is handled centrally in App.jsx using React Router v6+.

- **Separation of Concerns:** 
   Used components folder for the resuable elements, pages for all the wrapper elements, context for the centralised state logic and the api for the adding the mock data or maybe api calling functions in the future.


## Trade off and Assumptions

- **Project Structure:**  
Flat Folder Structure:
We decided to keep things simple and go with a flat folder structure. It’s easier to manage when the project is still relatively small, and it helps keep things straightforward. The downside is, if the project grows, this structure might get a little messy, and it could be harder to scale.
What we assumed: For now, it’s fine. We don’t expect this to be an issue until we add a lot more features or complexity.

Context API with useReducer:
Instead of using a bigger state management library like Redux, we opted for the Context API combined with useReducer. It keeps things light and works perfectly for what we need right now. The downside? If the app grows and we have a lot of state, we could run into performance issues.
What we assumed: Since our app is still pretty simple, this approach should be more than enough. We’ll switch to something more powerful if needed later on.

- **Routing:**  
All Routes in App.jsx:
We’ve kept all the routes in a single file, App.jsx. It’s simple, easy to manage, and perfect for a small app. But as we add more pages, it could start getting a little cluttered, and managing everything in one file could become a hassle.
What we assumed: Right now, this works great because we don’t have too many routes. But if the app grows, we’ll split it up and organize things better.

Using Mock Data:
For now, we’re using mock data from mockData.json instead of connecting to a real API. It’s a great way to speed up development and testing, but we know that once we move to production, we’ll need to replace it with actual API calls.
What we assumed: We’re in the early stages, so mock data is fine for now. Real API integration will happen when we’re ready to go live.

- **Performace Optimisations:**  
No Advanced Optimizations Yet:
We haven’t implemented things like lazy loading or code splitting yet. So, the entire app loads at once, which might slow things down a little as it gets bigger.
What we assumed: For now, the app isn’t large enough to cause performance issues. As the project grows, we’ll optimize it with lazy loading or other strategies.

## Known issues or incomplete feature
There aren't any known issues or the incomplete features but there are certain advancements that could be done 
    - Lazy Loading
    - Use backend apis for the real time data 
    - Use redux to scale the application 
    - Write unit, integration and end-to-end test cases
    - Follow the test driven architecture
