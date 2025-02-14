import { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth';

export default function Register() {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isRegistering, setIsRegistering] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [passwordValidations, setPasswordValidations] = useState([
        { text: ' At least 6 characters', valid: false },
        { text: ' At least one number', valid: false },
        { text: ' At least one special character', valid: false }
    ]);
    const [passwordMatchError, setPasswordMatchError] = useState<string>('');
    const [showValidations, setShowValidations] = useState<boolean>(false);

    const validatePassword = (password: string) => {
        const minLength = password.length >= 6;
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        setPasswordValidations([
            { text: ' At least 6 characters', valid: minLength },
            { text: ' At least one number', valid: hasNumber },
            { text: ' At least one special character', valid: hasSpecialChar }
        ]);
    };

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);
    };

    const onConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        if (password !== e.target.value) {
            setPasswordMatchError('Passwords do not match.');
        } else {
            setPasswordMatchError('');
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (passwordValidations.some(v => !v.valid) || password !== confirmPassword) return;

        if (!isRegistering) {
            setIsRegistering(true);
            try {
                await doCreateUserWithEmailAndPassword(email, password);
                navigate('/');
            } catch (error) {
                const errorMsg = (error as Error).message;
                if (errorMsg.includes('auth/email-already-in-use')) {
                    setErrorMessage('Email is already used.');
                } else {
                    setErrorMessage('Registration failed. Please try again.');
                }
                console.error(error);
            }
            setIsRegistering(false);
        }
    };

    if (userLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return (
        <main className="w-full h-screen flex self-center place-content-center place-items-center bg-[#18212C]">
            <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl bg-white">
                <div className="text-center mb-6">
                    <div className="mt-2">
                        <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">Create a New Account</h3>
                    </div>
                </div>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-600 font-bold">Email</label>
                        <input
                            type="email"
                            autoComplete='email'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600 font-bold">Password</label>
                        <input
                            disabled={isRegistering}
                            type="password"
                            autoComplete='new-password'
                            required
                            value={password}
                            onFocus={() => setShowValidations(true)}
                            onBlur={() => setShowValidations(false)}
                            onChange={onPasswordChange}
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                        />
                        {showValidations && (
                            <div className="mt-1 text-sm text-gray-600 space-y-1">
                                {passwordValidations.map((validation, index) => (
                                    <p
                                        key={index}
                                        className={`transition-opacity duration-500 flex items-center gap-2 ${validation.valid ? 'text-green-600 fade-out' : 'text-gray-500'}`}
                                    >
                                        {validation.valid ? '✔' : '✖'} {validation.text}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="text-sm text-gray-600 font-bold">Confirm Password</label>
                        <input
                            disabled={isRegistering}
                            type="password"
                            autoComplete='off'
                            required
                            value={confirmPassword}
                            onChange={onConfirmPasswordChange}
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                        />
                        {passwordMatchError && (
                            <p className="text-red-600 text-sm font-bold mt-1">{passwordMatchError}</p>
                        )}
                    </div>
                    {errorMessage && (
                        <span className='text-red-600 font-bold'>{errorMessage}</span>
                    )}
                    <button
                        type="submit"
                        disabled={isRegistering}
                        className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isRegistering ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
                    >
                        {isRegistering ? 'Signing Up...' : 'Sign Up'}
                    </button>
                    <div className="text-sm text-center">
                        Already have an account? {'   '}
                        <Link to={'/login'} className="text-center text-sm hover:underline font-bold">Continue</Link>
                    </div>
                </form>
            </div>
        </main>
    );
}