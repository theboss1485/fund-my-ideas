import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = (props) => {

    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);

    // Here, we update the state based on form input changes
    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormState({

            ...formState,
            [name]: value,
        });
    };

    // This function gets called when the user clicks the button to submit the form.
    const handleFormSubmit = async (event) => {

        event.preventDefault();
    
        try {

            const { data } = await login({

                variables: { ...formState },
            });

            Auth.login(data.login.token);

        } catch (e) {

            console.log("Something went wrong with the login process.");
        }

        //Here, we reset the form values to empty strings.
        setFormState({

            email: '',
            password: '',
        });
    };


    return (
        <main className="flex-row justify-center mb-4 custom-login-page">
            <div className="col-10 col-md-8 col-lg-6 mx-auto">
                <div className="card custom-login-signup-border">
                    <h4 className="card-header text-light p-2 custom-login-title">Login</h4>
                    <div className="card-body login-signup-form custom-login-signup-form-body">
                        {data ? (
                            <p>
                                Login successful!{' '}
                                <Link to="/">back to the homepage.</Link>
                            </p>
                        ) : (
                        <form onSubmit={handleFormSubmit} className="custom-login-section">
                            <div className="mb-2">
                                <label htmlFor="email" className="mb-1 text-white">Email:</label>
                                <div>
                                    <input
                                        id="email"
                                        className="form-input col-lg-12 custom-input-field-color text-white"
                                        placeholder="Your email"
                                        name="email"
                                        type="email"
                                        value={formState.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="mb-2">
                                <label htmlFor="password" className="mb-1 text-white">Password:</label>
                                <div>
                                    <input
                                        id="password"
                                        className="form-input col-lg-12 custom-input-field-color text-white"
                                        placeholder="password"
                                        name="password"
                                        type="password"
                                        value={formState.password}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <button
                                className="btn btn-primary btn-block custom-button-color mt-1"
                                style={{ cursor: 'pointer' }}
                                type="submit"
                            >
                            Submit
                            </button>
                        </form>
                        )}

                        {error && (
                        <div className="my-3 p-3 custom-error-message text-white">
                            {error.message}
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Login;
