
 Trip Diary – A Progressive Web App (PWA)

This is a React + Vite based PWA that allows users to create, view, edit, and delete travel logs (trips), including geolocation data and image uploads. The app supports offline mode and can be installed as a mobile app.

Deployed on Vercel: [https://pwa-app-kp1r.vercel.app](https://pwa-app-kp1r.vercel.app)

Tech Stacks
- React 18
- Vite
- React Router
- Axios
- Firebase Messaging (optional push)
- LocalStorage (offline queue)
- PWA (manifest + service worker)
- Express.js (backend)
- MongoDB (backend DB)

 Features
 Create a trip with location and image
View all trips in a list
 Update or delete existing trips
 GPS geolocation support
Camera upload via `<input type="file">`
Works offline using LocalStorage + Service Worker
Deployable as .apk or PWA

Project Structure
PWA-APP/
├── backend/           # Express server + API routes
├── frontend/          # Main React PWA frontend


 Local Installation

cd pwa-app/frontend
npm install
npm run dev
The app will open at: 'http://localhost:5173'
or open at 'https://pwa-app-kp1r.vercel.app'


How to Use
- Visit 'Add Trip' to add a new trip
- Click 'Get Location' to capture GPS coordinates
- Upload a photo (camera supported on mobile)
- Submit to save
- View and manage trips via 'My trips'


To set up Git and push this project to the github:
git init
git remote add origin https://github.com/John-max-spec/pwa-app.git
git add .
git commit -m "Initial commit"
git push -u origin main

