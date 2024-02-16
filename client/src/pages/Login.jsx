import { useState } from 'react';

import { setLoggedInUser } from '../../store/reducers/slices/userSlice';

import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { LOGIN_USER } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';

const Login = (props) => {

    const navigate = useNavigate();

    localStorage.setItem("currentUrl", window.location.href)

    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);
    const dispatch = useDispatch();

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

            

            dispatch(setLoggedInUser(
            
                {
                    user: data.login.user
                }
            ));

            Auth.login(data.login.token);

            /* I moved the redirection logic out of the Auth.login function so that I could use
            the useNavigate() hook to keep the page from doing a complete reload.*/
            setTimeout(function() {

                navigate('/');

            }, 1500);

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
                            <p className="text-white text-center mt-2">
                                Login successful!  You will now be redirected to the homepage.
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
