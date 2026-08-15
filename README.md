# 🎂 Birthday Surprise Website

A birthday website that unlocks at a chosen date and time, featuring photos, music, animations, and a special celebration.

## 📁 Project Structure

birthday_surprise/
│
├── index.html
├── style.css
├── script.js
│
├── images/
│   ├── older.jpeg
│   ├── instant.jpeg
│   ├── photo1.jpeg
│   ├── photo2.jpeg
│   ├── photo3.jpeg
│   └── final.jpeg
│
└── audio/
    ├── waiting-music.mp3
    └── birthday-music.mp3


## ⏰ Change the Countdown

Open script.js and find:

const TARGET = new Date("2026-08-20T23:59:00");

Change the date and time using this format:

YYYY-MM-DDTHH:MM:00

Example:

const TARGET = new Date("2026-08-21T23:59:00");

This sets the countdown to 21 August 2026 at 11:59 PM.


## ✏️ Change the Text

Open index.html.

You can change:

- Birthday messages
- Headings
- Captions
- Birthday wishes
- Button text
- Other text displayed on the website

Example:

<h1>
  Another year around the sun.
</h1>

Change only the text inside the HTML tags.


## 🖼️ Change the Photos

Open the images folder and replace the existing photos.

Keep the same filenames:

older.jpeg
instant.jpeg
photo1.jpeg
photo2.jpeg
photo3.jpeg
final.jpeg

If you use different filenames, update the corresponding image path in index.html.

## 🎵 Change the Music

Open the audio folder.

Replace:

waiting-music.mp3
birthday-music.mp3

waiting-music.mp3 is used on the countdown page.

birthday-music.mp3 is used after the countdown unlocks the birthday page.

If you use different filenames, update the audio paths in index.html.

## 🎨 Change the Design

Open style.css.

This file controls the visual appearance of the website, including:

- Colors
- Fonts
- Sizes
- Spacing
- Buttons
- Animations
- Background effects
- Birthday scenes
- Mobile layout


## ▶️ Run the Website

You can open index.html directly in a browser.

For development, using VS Code with Live Server is recommended.

1. Open the project folder in VS Code.
2. Open index.html.
3. Click "Go Live".
4. The website will open in your browser.


## 🌐 GitHub Pages

To host the website using GitHub Pages:

1. Open the GitHub repository.
2. Go to Settings → Pages.
3. Under Build and deployment, select:
   Source: Deploy from a branch
   Branch: main
   Folder: / (root)
4. Click Save.

GitHub will generate a public website URL.


## 🔄 Update the Website

After making changes in VS Code, open the terminal inside the project folder and run:

git add .
git commit -m "Update website"
git push

Your latest changes will then be uploaded to GitHub.


## 📝 Main Files

index.html
Contains the website structure and text.

style.css
Controls the design, layout, colors, fonts, and animations.

script.js
Controls the countdown, music, interactions, and website behavior.

images/
Contains all birthday photos.

audio/
Contains the website music.


## 💡 Quick Customization Guide

Date & time → script.js

Text → index.html

Photos → images/

Music → audio/

Design → style.css


## ⚠️ Important

Keep the folder structure and filenames correct.

The image and audio paths used by the website must match the actual filenames.

For example:

images/older.jpeg
audio/birthday-music.mp3

If you rename a file, update its path in index.html or script.js accordingly.
