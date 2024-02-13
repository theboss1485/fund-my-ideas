import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {

    //const dispatch = useDispatch();

    const [formState, setFormState] = useState({

        username: '',
        email: '',
        password: '',
    });

    const [user, setUser] = useState()
    const [addUser, {loading, error: mutationError}] = useMutation(ADD_USER);

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormState({

            ...formState,
            [name]: value,
        });
    };


    const handleFormSubmit = async (event) => {

        console.log("addUser", addUser)
        
        event.preventDefault();
        console.log(formState);

        try {

            if((formState.username !== '') && (formState.email !== '') && (formState.password !== '')){

                const { data } = await addUser({

                    variables: { ...formState },
                });

                const { token, user } = data.addUser;
            
                Auth.login(token);

            } else {

                throw new Error("You didn't fill in all the fields.")
            }
        
        } catch (error) {

            console.log(JSON.stringify(error));
        }
    };

    
    
    return (
        <main className="flex-row justify-center mb-4 custom-login-page">
            <div className="col-10 col-md-8 col-lg-6 mx-auto ">
                <section id="signup-form" className="card custom-login-signup-border">
                    <h4 className="card-header text-light p-2 custom-login-title">Sign Up</h4>
                    <div className="card-body custom-login-signup-form-body">
                        {user ? (
                        <p>
                            Success! Profile has been created!{' '}
                            <Link to="/">back to the homepage.</Link>
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
