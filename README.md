# Tunetic

**Tunetic** is a music suggestion platform designed to make discovering and sharing songs effortless and social. Built with a clean, modern UI and real-time interactions, Tunetic brings users together around their favorite tunes.

---

## Overview

Tunetic lets users:

-  Suggest songs to the community.
-  Discover what others are recommending in real-time.
-  View user profiles and see their shared music.
-  Enjoy a minimal, distraction-free interface focused on music sharing.

The platform is ideal for small music communities, friend circles, or fan clubs who want a lightweight alternative to bloated music apps.

---

##  Features

-  **Auth via Google/Twitter**: Secure sign-in for suggesting and viewing songs.
-  **User Profiles**: View your suggestions and others’ in a dedicated profile.
-  **Responsive Design**: Optimized for mobile and desktop.
-  **Glassmorphic UI**: Aesthetic layout with subtle gradients and soft visuals.

---

##  Tech Stack

- **Frontend**: Next.js (App Router), Tailwind CSS
- **Backend**: MongoDB, REST API
- **Auth**: NextAuth (Google, Twitter)
- **Deployment**: Vercel

---

##  Project Structure

```bash
/tunetic
├── app/              # Next.js App Router pages and layout
├── components/       # Reusable UI components
├── lib/              # Helpers, DB connections
├── models/           # Mongoose models
├── public/           # Static assets
