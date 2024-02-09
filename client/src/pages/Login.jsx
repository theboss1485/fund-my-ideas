import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {

    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);

    // update state based on form input changes
    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormState({

            ...formState,
            [name]: value,
        });
    };

    // submit form
    const handleFormSubmit = async (event) => {

        event.preventDefault();
        console.log(formState);
    
        try {

            const { data } = await login({

                variables: { ...formState },
            });

            Auth.login(data.login.token);

        } catch (e) {

            console.error(e);
        }

        // clear form values
        setFormState({

            email: '',
            password: '',
        });
    };

    return (
        <main className="flex-row justify-center mb-4">
            <div className="col-12 col-md-9 col-lg-6 mx-auto">
                <div className="card">
                    <h4 className="card-header bg-dark text-light p-2">Login</h4>
                    <div className="card-body">
                        {data ? (
                            <p>
                                Login successful!{' '}
                                <Link to="/">back to the homepage.</Link>
                            </p>
                        ) : (
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-2">
                                <label htmlFor="email" className="mb-1">Email:</label>
                                <div>
                                    <input
                                        id="email"
                                        className="form-input col-lg-8"
                                        placeholder="Your email"
                                        name="email"
                                        type="email"
                                        value={formState.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="mb-2">
                                <label htmlFor="password" className="mb-1">Email:</label>
                                <div>
                                    <input
                                        id="password"
                                        className="form-input col-lg-8"
                                        placeholder="password"
                                        name="password"
                                        type="password"
                                        value={formState.password}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <button
                                className="btn btn-block btn-primary mt-1"
                                style={{ cursor: 'pointer' }}
                                type="submit"
                            >
                            Submit
                            </button>
                        </form>
                        )}

                        {error && (
                        <div className="my-3 p-3 bg-danger text-white">
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
