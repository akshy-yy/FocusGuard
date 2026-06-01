# FocusGuard

A personalised Chrome Extension that helps users block distracting websites and stay focused on their work by setting custom block durations and managing blocked websites through a modern dashboard.

## Features

* Website blocking
* Custom block durations
* Dashboard management
* Chrome storage persistence
* Blocked page redirection
* Live countdown timers
* Toggle-based website activation
* Website favicon support
* Custom extension branding

## Tech Stack

* HTML
* CSS
* JavaScript
* Chrome Extension Manifest V3

## Project Structure

```text
FocusGuard/
│
├── assets/
│   ├── img16.png
│   ├── img48.png
│   ├── img128.png
│   └── delete.png
│
├── background/
│   └── background.js
│
├── blocked/
│   ├── blocked.html
│   ├── blocked.css
│   └── blocked.js
│
├── dashboard/
│   ├── dashboard.html
│   ├── dashboard.css
│   └── dashboard.js
│
├── popup/
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
│
├── manifest.json
├── README.md
└── .gitignore
```

## How to Use

### 1. Download the Project

Clone the repository:

```bash
git clone https://github.com/your-username/FocusGuard.git
```

Or download the ZIP file and extract it.

### 2. Open Chrome Extensions

Navigate to:

```text
chrome://extensions
```

### 3. Enable Developer Mode

Turn on the **Developer Mode** toggle located in the top-right corner of the Extensions page.

### 4. Load the Extension

Click:

```text
Load unpacked
```

Then select the **FocusGuard** project folder.

### 5. Pin the Extension

Click the Extensions icon in the Chrome toolbar and pin **FocusGuard** for quick access.

### 6. Add a Website

1. Open the FocusGuard Dashboard.
2. Enter the website domain (e.g., `instagram.com`).
3. Enter the block duration in minutes.
4. Click **Add Website**.

### 7. Enable Website Blocking

1. Locate the website in the Blocked Websites section.
2. Turn on the toggle.
3. Enter the desired block duration when prompted.
4. Confirm the action.

### 8. During the Block Period

* Attempts to access the blocked website will redirect to a custom blocked page.
* A live countdown timer will display the remaining blocked time.
* The dashboard will show the remaining time for each active block.

### 9. Automatic Unblocking

Once the timer reaches zero:

* The toggle automatically switches off.
* The website becomes accessible again.
* The blocked page automatically redirects back to the original website.

### 10. Remove a Website

Click the delete icon beside the website entry to permanently remove it from the blocked websites list.

## Future Enhancements

* Productivity analytics
* Focus session statistics
* Website categories
* Daily usage reports
* Focus streak tracking
* Enhanced dashboard visualizations
* Cloud synchronization

## Status

Phase 1 Completed
