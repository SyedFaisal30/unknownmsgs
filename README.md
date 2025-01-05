📩 Mystry Messages
Mystry Messages is a user messaging platform where users can manage their messages and customize their settings. It includes a dashboard where users can toggle whether they want to accept messages and view their received messages. The app features a seamless user interface with components for message management, URL copying, and message setting updates.

🚀 Features
🖥️ User Dashboard: Displays user information, messages, and settings.
🔄 Toggle Accepting Messages: Users can choose whether they want to accept messages from others.
📋 Copy Profile URL: Users can easily copy their unique profile URL.
🔄 Message Refresh: Refreshes the list of messages on-demand.
🗑️ Delete Messages: Users can delete their received messages.
🔒 OTP Verification: Users can verify their email using OTP (One-Time Password).
🔄 Debouncing: Optimized API calls with debouncing for smoother performance.
🎨 Shadcn UI Components: Utilizes Shadcn for rich UI components.

⚙️ Technologies
⚛️ React: For building the user interface.
🌐 Next.js: For server-side rendering and routing.
📝 React Hook Form: For easy and efficient form handling.
🌍 Axios: For making API requests to the backend.
✅ Zod: For form validation.
🎨 Tailwind CSS: For styling the components.
🔑 NextAuth.js: For user authentication.
🦄 usehookts: For leveraging React hooks with TypeScript to manage application logic.
🔒 Email OTP Verification: For verifying users via OTP.
💨 Debouncing: For optimizing API calls and improving performance.
🎨 Shadcn: For using modern UI components from Shadcn library.
🛠️ Installation
To run the project locally, follow these steps:

🧰 Prerequisites
Node.js (version >= 16.0.0)
npm or yarn
📋 Steps
Clone the repository:


git clone https://github.com/SyedFaisal30/unknownmsgs.git
Navigate to the project directory:


cd unknownmsgs
Install the dependencies:


npm install
Start the development server:


npm run dev
Open the app in your browser at http://localhost:3000.

🧑‍💻 Usage
User Dashboard: After logging in, users can access their dashboard where they can:

Copy their unique profile URL.
Toggle whether they accept messages via the switch.
View their messages and refresh them on demand.
Delete individual messages.
Message Handling: Users can receive messages in their inbox, and they can toggle whether they want to accept new messages through the switch.

Profile URL: Each user has a unique URL that can be copied to the clipboard by clicking the Copy button.

OTP Verification: Users can receive an OTP via email to verify their account during the registration process.

Debouncing: API requests such as message fetching are debounced to avoid unnecessary calls, improving performance and responsiveness.

Shadcn UI Components: Various UI components are designed using the Shadcn library for a modern look and feel.

📡 API Endpoints
POST /api/accept-messages: Updates the user's settings on whether they accept messages.

Request body: { acceptMessages: boolean }
Response: { message: string }
GET /api/get-messages: Fetches the user's messages.

Response: { messages: Message[] }
POST /api/verify-otp: Verifies the OTP sent to the user's email.

Request body: { email: string, otp: string }
Response: { message: string }
GET /api/check-username-unique: Checks if a username is available during the sign-up process.

Query parameter: username={string}
Response: { message: string }
🤝 Contributing
We welcome contributions to the project. If you find a bug or want to add a feature, feel free to submit a pull request.

📝 Steps to Contribute:
Fork the repository.

Clone your fork:


git clone https://github.com/SyedFaisal30/unknownmsgs.git
Create a new branch:


git checkout -b feature-name
Make your changes and commit them:


git commit -m 'Add feature'
Push your changes:


git push origin feature-name
Open a pull request on GitHub.

📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

🔔 Notes:
Replace the https://github.com/SyedFaisal30/unknownmsgs.git link with your actual GitHub repository link.
Update the LICENSE file if you’re using a specific license type (e.g., MIT, GPL).