# simple-todo-app
A high-performance, mission-themed To-Do List application built with a focus on sleek UI/UX and 3D design principles. Features secure user authentication, real-time task management, and persistent local storage.
🚀 Mission Workspace (To-Do List App)
A high-performance, mission-themed To-Do List application built with a focus on sleek UI/UX and 3D design principles. This application allows users to manage daily tasks (missions) with a professional command-center interface.

✨ Key Features
3D Secured Authentication: A robust registration and login system featuring real-time password strength validation (Uppercase, Numbers, and Special Characters).

Mission Intelligence (CRUD):

Create missions with detailed "Intel" (descriptions).

Update mission status to "Mission Accomplished."

Edit or abort (delete) missions with instant feedback.

Dynamic Command Center: Automatically separates "Pending Missions" from "Accomplished" tasks to keep your focus sharp.

Real-Time Search: Integrated search bar to filter through your mission history instantly.

Account Recovery: A simulated OTP-based password reset flow for enhanced user experience.

Persistent Data: Uses Browser localStorage to ensure your data remains saved on your device even after closing the browser.

🛠️ Tech Stack
Frontend: HTML5, CSS3 (Custom 3D styling), Vanilla JavaScript (ES6+)

UI Framework: Bootstrap 5

Typography: Inter Font Family

Icons: Bootstrap Icons

📂 Project Structure
Plaintext
├── index.html       # Main Workspace/Dashboard
├── login.html       # User Authentication Portal
├── register.html    # Account Creation & Security Validation
├── style.css        # Custom 3D & Responsive Styling
├── script.js        # Core Application Logic & Storage Management
└── database.db      # SQLite database reference
🚀 How to Get Started
Clone the Repository:

Bash
git clone

Launch the App:
Using VS Code "Live Server" (Recommended for Developers)
If you are using Visual Studio Code, this is the best way to see changes in real-time:

Open your project folder in VS Code.

Go to the Extensions view (click the square icon on the left or press Ctrl+Shift+X).

Search for and install "Live Server" by Ritwick Dey.

Once installed, go back to login.html.

Click the "Go Live" button at the bottom right corner of the window.

Your browser will automatically open the login page at

Create an Account:
Use the registration page to set up your profile. Note: Passwords must meet the "3D Security Standard" (Upper case, number, and special character).(eg:- Test@123)

Start Your Mission:
Log in and begin adding tasks to your workspace.

📱 Responsiveness
The application is fully optimized for all screen sizes, from mobile devices to large desktop monitors, using a fluid Bootstrap grid system.
