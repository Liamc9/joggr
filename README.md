# Joggr

Joggr is a single-page web application built with Create React App (React 19) that helps runners explore nearby runs, keep up with pals, manage personal settings, and handle payments or subscriptions.

## Key Technologies
- React with React Router for routing and navigation.
- Tailwind CSS and styled-components for styling.
- Firebase (Auth, Firestore, Storage, Analytics) for backend services.
- Stripe for payments via a Firebase Cloud Function.
- A custom UI/utilities library `liamc9npm` for reusable components and helpers.

## Application Structure
### `src/`
- `firebase-config.js` initializes Firebase services (auth, db, storage, functions).
- Contexts like `AuthContext.js` and `NotificationContext.js` wrap authentication logic and user notification flags.
- Components such as `RunCard.jsx` and folders like `search/` or `stripe/` provide UI for run info, search, and payments.
- Routes under `src/routes/` include pages like `Explore`, `Search`, `Runs`, `Pals`, `Account`, `Profile`, and more, with protected routes handled by a `RequireAuth` wrapper in `index.js`.
- Views (e.g., `AccountView.jsx`, `ProfileView.jsx`, `SearchView.jsx`) supply presentational components for the routes.

### `functions/`
- `index.js` exposes an Express endpoint `createPaymentIntentWithCustomer` to manage Stripe customers and PaymentIntents.

### `public/`
- Static assets such as the HTML template and icons.

## Notable Features
- **Authentication & User Profile**: email/password, Google, or Apple OAuth with profile editing and account deletion.
- **Notifications**: Firestore-backed notification flags displayed in navigation. 
- **Search & Explore**: browse runs by distance, apply filters, and view a map in a bottom sheet.
- **Account Settings**: modular settings pages using `liamc9npm` templates.
- **Payments**: Stripe Elements UI with PaymentIntents fetched from the Firebase function.

## Available Scripts
- `npm start` – run the app in development mode.
- `npm run build` – build the app for production.
- `npm test` – launch the test runner (no tests currently included).
