const { useState } = React;

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setError('');
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!email || !password) {
            setError('Email and password are required');
            return;
        }

        if (!email.includes('@')) {
            setError('Please enter a valid email');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        // If validation passes
        setSubmitted(true);
        setError('');
        console.log('Login attempt:', { email, password });

        // Reset form after 2 seconds
        setTimeout(() => {
            setEmail('');
            setPassword('');
            setSubmitted(false);
        }, 2000);
    };

    const handleReset = () => {
        setEmail('');
        setPassword('');
        setSubmitted(false);
        setError('');
    };

    return (
        <div className="container">
            <div className="login-box">
                <h1>Login</h1>

                {submitted && (
                    <div className="success-message">
                        ✓ Login successful! Welcome back.
                    </div>
                )}

                {error && (
                    <div className="error-message">
                        ✗ {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>

                    <div className="form-buttons">
                        <button type="submit" className="btn btn-login">
                            Login
                        </button>
                        <button type="button" className="btn btn-reset" onClick={handleReset}>
                            Clear
                        </button>
                    </div>
                </form>

                <p className="signup-link">
                    Don't have an account? <a href="#">Sign up</a>
                </p>
            </div>
        </div>
    );
}

// Render the component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<LoginForm />);
