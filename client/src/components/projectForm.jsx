import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_PROJECT } from '../utils/mutations';
import React, { useState} from 'react';

import Auth from '../utils/auth';

const ProjectForm = (props) => {

    const [formState, setFormState] = useState({
        name: '',
        description: '',
        funding: 0,
        time: 0
    });
    // const [name, setProjectName] = useState('');
    // const [characterCount, setCharacterCount] = useState(0);
    const [formError, setFormError] = useState(undefined);

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

        const handleChange = (event) => {

            event.preventDefault();

            const { name, value } = event.target;
    
            setFormState({
    
                ...formState,
                [name]: value,
            });
        }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        

        try {

            if((formState.name !== '') && (formState.description !== '') && (formState.funding !== 0) && (formState.time !== 0)){
                
                const {data} = await addProject({
                    
                    variables: {
                        name: formState.name,
                        description: formState.description,
                        fundingGoal: parseInt(formState.funding),
                        timePeriod: parseInt(formState.time)
                    },
                });

                if(data.addProject.project && data.addProject.user){

                    props.onProjectCreation()
                }

                setFormData('');
            } else {

                throw new Error("You didn't fill in all of the fields.")
            }
            if(error){

                console.log(JSON.stringify(err));
            }

        } catch (err) {

            console.log(JSON.stringify(err));

            
        }
    };


    return (
        <div className='custom-add-project-section-title'>
            <h3>Show off your project idea!</h3>

            {Auth.loggedIn() ? (
                <>
                    <form
                        className="flex-row justify-center justify-space-between-md align-center"
                        onSubmit={handleFormSubmit}
                    >
                        <div className="col-12 col-lg-9 custom-add-project-section">
                            <label for="project-name">Project Name:</label>
                            <input type="text" id="project-name" name="name" onChange={handleChange} required />
                            <label for="project-description">Project Description:</label>
                            <textarea
                                name="description"
                                placeholder="project concept"
                                className="form-input w-100"
                                style={{ lineHeight: '1.5', resize: 'vertical' }}
                                onChange={handleChange}
                            ></textarea>
                            <label for="funding-goal">Funding Goal:</label>
                            <input type="number" id="funding-goal" name="funding" required onChange={handleChange} />
                            <label for="time-period">Time Period (in days):</label>
                            <input type="number" id="time-period" name="time" required onChange={handleChange}/>
                        </div>

                        <div className="col-12 col-lg-3 custom-add-this-project-button-container">
                            <button onClick={handleFormSubmit}className="btn btn-primary btn-block py-3 custom-add-this-project-button" type="submit">
                                Add this project
                            </button>
                        </div>
                        {(formError) && (
                            <div className="col-12 my-3 bg-danger text-white p-3">
                                {formError}
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



