# Deployment Fix

You reported "Cannot connect to server" on Vercel. This happened because the code was set to connect to `localhost`.

I have updated the frontend to use an Environment Variable: `NEXT_PUBLIC_API_URL`.

## Steps to Fix

1.  **Vercel Project Settings (Frontend)**:
    -   Go to your Vercel Dashboard -> Project -> Settings -> Environment Variables.
    -   Add `NEXT_PUBLIC_API_URL` with value: `https://your-backend-url.vercel.app/api` (Replace with your actual backend URL).

2.  **Deploy Backend**:
    -   You MUST deploy the backend changes (the new auth logic and database config) to Vercel for the login to work.
    -   If you haven't deployed the backend yet, the frontend is talking to an old backend that doesn't support the new signin/signup.

3.  **Deploy Frontend**:
    -   Redeploy the frontend to pick up the code change in `service/auth.js`.
