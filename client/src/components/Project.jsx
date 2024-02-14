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

    return (
        <section className="custom-tab project mx-auto col-11">
            <div className="custom-project-boxes">
                <h1>
                    {props.name}
                </h1>

                <h1 className="mb-0">
                    {funded ? (
                        <span>
                            <span className="money-color"> $$$ Funded! $$$</span> 
                        </span>
                    ) : null}
                </h1>
                
                <ul>
                    <li><span>Description: </span> {props.description}</li>
                    <li><span>Funding Goal:</span> ${props.fundingGoal}</li>
                    <li><span>Current Funding Amount:</span> ${props.currentFundingAmount}</li>
                    <li><span>Campaign Time Period:</span> {props.timePeriod} days</li>
                </ul>
            </div>
        </section>
    )
}

export default Project;