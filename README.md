# ✅ v0 Work Plan – Tunetic

## 🗂️ Project Setup & Architecture
- [ ] Initialize Next.js app with TypeScript
- [ ] Install Tailwind CSS
- [ ] Setup folder structure
- [ ] Configure `.env.local` with:
  - [ ] MongoDB URI
  - [ ] Spotify Client ID & Secret
  - [ ] JWT Secret
- [ ] Allow external images from Spotify (next.config.js)

## 🔐 Auth Setup
- [ ] Install NextAuth.js
- [ ] Add Google/GitHub auth
- [ ] Configure MongoDB adapter
- [ ] Store user profile on first login
- [ ] Secure routes (only logged-in users can suggest)

## 🔍 Spotify Search
- [ ] Create `/api/search` route
  - [ ] Fetch access token using client credentials
  - [ ] Call Spotify search endpoint
  - [ ] Format & return track data
- [ ] Frontend search bar with debounce
- [ ] Show search results in dropdown
- [ ] Display selected track info
- [ ] Add Submit button

## 📰 Suggest a Song
- [ ] Create `/api/suggest` route
  - [ ] Validate input
  - [ ] Save to MongoDB with userId, timestamp
- [ ] Display confirmation or success alert

## 📃 Feed with Infinite Scroll
- [ ] Build homepage with feed
- [ ] Fetch suggestions from `/api/feed`
- [ ] Display track info, album art, user, time
- [ ] Implement infinite scroll (cursor-based)
- [ ] Show skeleton loading while fetching

## 👤 User Profile
- [ ] Create dynamic route: `/user/[username]`
- [ ] Fetch user info + suggestions
- [ ] Create `/api/user/[username]` endpoint

## 💅 Styling & UX
- [ ] Tailwind CSS responsive UI
- [ ] Smooth transitions & dropdowns
- [ ] Skeleton loaders
- [ ] Handle empty states + errors

## 🚀 Deployment
- [ ] Test all flows thoroughly
- [ ] Deploy to Vercel
- [ ] Use MongoDB Atlas
- [ ] Configure environment variables

## 🧠 Bonus (Optional)
- [ ] Timestamp as "x mins ago"
- [ ] Dark mode
- [ ] Settings page
- [ ] Song bookmarks or likes
- [ ] Spotify login integration
