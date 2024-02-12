import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_PROJECT } from '../utils/mutations';
import React, { useState} from 'react';

import Auth from '../utils/auth';

const ProjectForm = (props) => {
    // const [name, setProjectName] = useState('');
    // const [characterCount, setCharacterCount] = useState(0);
    const [description, setDescription] = useState('');

    // const [fundingGoal, setFundingGoal] = useState('0');

    const [addProject, { error }] = useMutation(ADD_PROJECT);


        // (ADD_PROJECT, {
        //     refetchQueries: [
        //         GET_PROJECTS,
        //         'getProjects',
        //         GET_ME,
        //         'me'
        //     ]
        // });

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addProject({
                variables: {
                    description,
                    fundingGoal,
                    timePeriod
                },
            });

            if(data){

                props.onProjectCreation()
            }

            setFormData('');

        } catch (err) {
            console.error(err);
        }
    };


    return (
        <div>
            <h3>Show off your project idea!</h3>

            {Auth.loggedIn() ? (
                <>
                    <form
                        className="flex-row justify-center justify-space-between-md align-center"
                        onSubmit={handleFormSubmit}
                    >
                        <div className="col-12 col-lg-9">
                            <label for="project-name">Project Name:</label>
                            <input type="text" id="project-name" name="project-name" required />
                            <label for="project-description">Project Description:</label>
                            <textarea
                                name="description"
                                placeholder="project concept"
                                value={description}
                                className="form-input w-100"
                                style={{ lineHeight: '1.5', resize: 'vertical' }}
                                onChange={handleChange}
                            ></textarea>
                            <label for="funding-goal">Funding Goal:</label>
                            <input type="number" id="funding-goal" name="funding-goal" required/>
                            <label for="time-period">Time Period (in days):</label>
                            <input type="number" id="time-period" name="time-period" required/>
                        </div>

                        <div className="col-12 col-lg-3">
                            <button onClick={handleFormSubmit}className="btn btn-primary btn-block py-3" type="submit">
                                Add this project
                            </button>
                        </div>
                        {error && (
                            <div className="col-12 my-3 bg-danger text-white p-3">
                                {error.message}
                            </div>
                        )}
                    </form>
                </>
            ) : (
                <p>
                    You need to be logged in to share your thoughts. Please{' '}
                    <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                </p>
            )}
        </div>
    );

};

export default ProjectForm;



