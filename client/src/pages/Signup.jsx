import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ADD_USER } from '../utils/mutations';

import { setLoggedInUser } from '../../store/reducers/slices/userSlice';

import Auth from '../utils/auth';

// This function deals with the signup page functionality.
const Signup = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    localStorage.setItem("currentUrl", window.location.href)

    const [formState, setFormState] = useState({

        username: '',
        email: '',
        password: '',
    });

    const [user, setUser] = useState()
    const [addUser, {loading, error: mutationError, data}] = useMutation(ADD_USER);

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormState({

            ...formState,
            [name]: value,
        });
    };


    // This function is executed when the user submits the signup form.
    const handleFormSubmit = async (event) => {
        
        event.preventDefault();

        try {

            if((formState.username !== '') && (formState.email !== '') && (formState.password !== '')){

                const { data } = await addUser({

                    variables: { ...formState },
                });

                dispatch(setLoggedInUser(
            
                    {
                        user: data.addUser.user
                    }
                ));

                const { token, user } = data.addUser;
            
                Auth.login(token);

                /* I moved the redirection logic out of the Auth.login function so that I could use
                the useNavigate() hook to keep the page from doing a complete reload.*/
                setTimeout(function() {

                    navigate('/');

                }, 1500);
                
            } else {

                throw new Error("You didn't fill in all the fields.")
            }
        
        } catch (error) {

            console.log(JSON.stringify(error));
        }
    };

    
    // Here, we render the signup form.
    return (
        <main className="flex-row justify-center mb-4 custom-login-page">
            <div className="col-10 col-md-8 col-lg-6 mx-auto ">
                <section id="signup-form" className="card custom-login-signup-border">
                    <h4 className="card-header text-light p-2 custom-login-title">Sign Up</h4>
                    <div className="card-body custom-login-signup-form-body">

                        {data ? (

                            <p className="text-white text-center mt-2">
                                Profile Creation Successful!  You will now be redirected to the homepage.
                            </p>
                        ) : (

                            <form onSubmit={handleFormSubmit} className='custom-login-section'>
                                <div className="mb-2">
                                    <label htmlFor="username" className="mb-1 text-white">Username:</label>
                                    <div>
                                        <input
                                            id="username"
                                            className="form-input col-lg-12 custom-input-field-color text-white"
                                            placeholder="Your username"
                                            name="username"
                                            type="text"
                                            value={formState.username}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
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
                                            placeholder="Your password"
                                            name="password"
                                            type="password"
                                            value={formState.password}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <button
                                    className="btn btn-block btn-primary custom-button-color mt-1"
                                    style={{ cursor: 'pointer' }}
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </form>
                        )}

                        {mutationError && (
                            
                            <div className="my-3 p-3 custom-error-message text-white">
                                {mutationError.message}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Signup;
