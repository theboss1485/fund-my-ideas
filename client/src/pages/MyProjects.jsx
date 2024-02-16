import { ADD_PROJECT } from '../utils/mutations';
import { GET_PROJECTS_BY_USERNAME } from '../utils/queries';
import { REMOVE_PROJECT } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { v4 as uuidv4 } from 'uuid';

import Project from '../components/Project';
import ProjectForm from '../components/ProjectForm';

// This file deals with rendering the My Projects component.
const MyProjects = () => {

    localStorage.setItem("currentUrl", window.location.href)

    const { data, loading: projectLoading, error: projectError, refetch } = useQuery(GET_PROJECTS_BY_USERNAME, {
        variables: { username: Auth.getProfile().data.username }
    });
    
    const [displayProjectForm, setDisplayProjectForm] = useState(false);
    const [projectAdded, setProjectAdded] = useState(false);
    const [projectRemoved, setProjectRemoved] = useState(false);
    
    const [removeProject, {loading, error}] = useMutation(REMOVE_PROJECT);

    // This function displays and hides the project form.
    const toggleProjectForm = () => {

        if(displayProjectForm === true){

            setDisplayProjectForm(false);
        
        } else if(displayProjectForm === false){

            setDisplayProjectForm(true);
        }
    }

    /* The function is called to do housekeeping 
    after a project is added to the database.*/
    const handleProjectCreation = () => {

        setProjectAdded(true)
        toggleProjectForm();
    }

    // This function removes a project from the database.
    const handleProjectRemoval = async (projectId) => {

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

        if(projectAdded) {

            refetch()
            setProjectAdded(false);
            
        }

        if(projectRemoved) {

            refetch();
            setProjectRemoved(false)
            
        }

    }, [projectAdded, projectRemoved])

    const profile = true;

    // Here, we render the My Projects page.
    return (
        <section className="custom-my-profile-main col-12">
            <div className="custom-start-project-section">
            </div>
            <h1 className="custom-my-project-title mb-4">My Projects</h1>

                {Auth.loggedIn() && displayProjectForm && (
                    
                    // Here, we render the form to create a project.
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
                    {data && data.projectsByUsername.map((item, index) => {

                        const projectId = item._id
                        return (

                            <React.Fragment key={uuidv4()}>
                                <Project {...item} profile= {profile} onProjectRemoved={() => handleProjectRemoval(projectId)}/>
                            </React.Fragment>
                        ) 
                        
                    })}
                </div>
            )}
        </section>
    );
}

export default MyProjects;