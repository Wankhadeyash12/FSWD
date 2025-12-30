@echo off
echo 🚀 Setting up Portfolio Backend...
echo.

cd backend

echo 📦 Installing dependencies...
npm install
echo.

echo 📝 Setting up environment variables...
if not exist .env (
    copy .env.example .env
    echo ✅ Created .env file from template
    echo.
    echo ⚠️  IMPORTANT: Please edit the .env file with your actual values:
    echo    - EMAIL_USER: Your Gmail address
    echo    - EMAIL_PASS: Your Gmail App Password (not regular password)
    echo    - RECIPIENT_EMAIL: Where you want to receive messages
    echo.
    echo 🔗 How to get Gmail App Password:
    echo    1. Enable 2FA on your Google account
    echo    2. Go to https://support.google.com/accounts/answer/185833
    echo    3. Generate App Password for 'Mail'
    echo.
) else (
    echo ✅ .env file already exists
)

echo.
echo 🎯 To start the server:
echo    cd backend
echo    npm run dev
echo.
echo 📧 Then test your contact form at http://localhost:3001
echo.
echo 📚 For detailed setup instructions, see README.md
echo.
pause