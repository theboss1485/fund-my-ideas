// This component displays is for displaying the indvidual projects on the page.
const Project = (props) =>  {

    let projectData = [];

    if(props.projectData){

        projectData.push(props.projectData.name)
        projectData.push(props.projectData.name)
        projectData.push(props.projectData.name)
        projectData.push(props.projectData.name)
    }

    let funded = false;

    if(props.fundingGoal  - props.currentFundingAmount <= 0){

        funded = true
    }

    const projectRemovalClicked = (projectId) =>{

        console.log("props", props)

        props.onProjectRemoved(projectId);
    }

    return (
        <section className="custom-tab project mx-auto col-11">
            <div className="custom-project-boxes">
                <h1>
                    {props.name}
                </h1>
                <h1 className="mb-0">

                    {funded ? (
                        <span className="money-color"> $$$ Funded! $$$</span> 
                    ) : null}

                </h1>
                
                <ul>
                    <li><span>Description: </span> {props.description}</li>
                    <li><span>Funding Goal:</span> ${props.fundingGoal}</li>
                    <li><span>Current Funding Amount:</span> ${props.currentFundingAmount}</li>
                    <li><span>Campaign Time Period:</span> {props.timePeriod} days</li>
                </ul>
            </div>

            {props.profile && (
                <button className="custom-delete-this-project mt-6 px-3 py-2" 
                        data-projectid={`${props._id}`} 
                        onClick={() => projectRemovalClicked(props._id)}
                >   
                    Delete This Project
                </button>
            )}
        </section>
    )
}

export default Project;