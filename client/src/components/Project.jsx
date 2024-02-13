export default function Project (props) {

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
        <section className="custom-tab project">
            <div className="custom-project-boxes">
                <h1>
                    {funded ? (
                        <span>
                            {props.name} <span className="money-color"> $$$ Funded! $$$</span> 
                        </span>
                    ) : props.name}
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