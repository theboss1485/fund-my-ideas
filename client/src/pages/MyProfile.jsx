import { ADD_PROJECT } from '../utils/mutations';
import { GET_PROJECTS_BY_USERNAME } from '../utils/queries';
import { REMOVE_PROJECT } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { v4 as uuidv4 } from 'uuid';

import Project from '../components/Project';
import ProjectForm from '../components/ProjectForm';

const MyProfile = () => {

    const { data, loading: projectLoading, error: projectError, refetch } = useQuery(GET_PROJECTS_BY_USERNAME, {
        variables: { username: Auth.getProfile().data.username }
    });
    
    const [displayProjectForm, setDisplayProjectForm] = useState(false);
    const [projectAdded, setProjectAdded] = useState(false);
    const [projectRemoved, setProjectRemoved] = useState(false);
    
    const [removeProject, {loading, error}] = useMutation(REMOVE_PROJECT);

    const toggleProjectForm = () => {

        if(displayProjectForm === true){

            setDisplayProjectForm(false);
        
        } else if(displayProjectForm === false){

            setDisplayProjectForm(true);
        }
        
        
    }

    const handleProjectCreation = () => {

        setProjectAdded(true)
        toggleProjectForm();
    }

    const handleProjectRemoval = async (event) => {

        let projectId = event.target.dataset.projectid

        let removedProject = await removeProject({

            

            variables: {
                projectId: projectId
            }
        });

        if(removedProject){

            setProjectRemoved(true)
        }
    }

    useEffect(() => {

        console.log("testing")

        if(projectAdded) {

            refetch()
            setProjectAdded(false);
            
        }

        if(projectRemoved) {

            refetch();
            setProjectRemoved(false)
            
        }

    }, [projectAdded, projectRemoved])

    



    return (
        <section className="custom-my-profile-main col-12">
            <div className="custom-start-project-section">
                {/* Add content for the start project section here */}
            </div>
            <h1 className="custom-my-project-title mb-4">My Projects</h1>
                {Auth.loggedIn() && displayProjectForm && (
                    
                    <ProjectForm onProjectCreation={handleProjectCreation}/>
                )}
                {!displayProjectForm && Auth.loggedIn() && (
                    <button className="btn btn-outline-primary custom-create-a-project" onClick={toggleProjectForm}>Create a Project</button>
                )}

                {displayProjectForm && Auth.loggedIn() && (
                    <button className="btn btn-outline-primary custom-create-a-project" onClick={toggleProjectForm}>Close Create Project Form</button>
                )}
            {projectLoading ? (
                <p>Loading...</p>
            ) : projectError ? (
                <p>Error: {JSON.stringify(projectError)}</p>
            ) : (
                <div className="custom-delete-this-project-container col-12">
                    {data && data.projectsByUsername.map((item, index) => (
                        <>
                            <Project key={uuidv4()} {...item} />
                            {Auth.loggedIn() && (

                                <button className="custom-delete-this-project mt-6" data-projectid={`${item._id}`} onClick={handleProjectRemoval}>Delete The Above Project</button>
                            )}
                        </>
                    ))}


                    

                    
                </div>
            )}
        </section>
    );
}

export default MyProfile;