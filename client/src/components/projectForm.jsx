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
    
    const [formError, setFormError] = useState(undefined);

 

    const [addProject, { error }] = useMutation(ADD_PROJECT);

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
        <div className='custom-add-project-section-title col-11 col-lg-9'>
            <h3 className='text-center mt-3'>Show off your project idea!</h3>

            {Auth.loggedIn() ? (
                <>
                    <form
                        className="flex-row d-flex justify-content-center align-center"
                        onSubmit={handleFormSubmit}
                    >
                        <div className="col-12 col-md-9 col-lg-6 custom-add-project-section">
                            <label htmlFor="project-name" className='text-white'>Project Name:</label>
                            <input type="text" id="project-name" name="name" className="custom-input-field-color mt-1 text-white" onChange={handleChange} required />
                            <label htmlFor="project-description">Project Description:</label>
                            <textarea
                                name="description"
                                placeholder="project concept"
                                className="form-input w-100 custom-input-field-color mt-1 text-white border-none"
                                style={{ lineHeight: '1.5', resize: 'vertical' }}
                                onChange={handleChange}
                            ></textarea>
                            <label htmlFor="funding-goal" className='text-white'>Funding Goal:</label>
                            <input type="number" id="funding-goal" min="100" max="10000000" name="funding" className="custom-input-field-color mt-1 text-white" required onChange={handleChange} />
                            <label htmlFor="time-period" className='text-white'>Time Period (in days):</label>
                            <input type="number" id="time-period" min="7" max="365" name="time" className="custom-input-field-color mt-1 text-white"required onChange={handleChange}/>
                            <div className="col-12 custom-add-this-project-button-container mx-0">
                            <button onClick={handleFormSubmit}className="btn btn-primary btn-block p2-3 custom-add-this-project-button" type="submit">
                                Add this project
                            </button>
                        </div>
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



