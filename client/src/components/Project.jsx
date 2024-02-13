export default function Project (props) {

    let projectData = [];

    if(props.projectData){

        projectData.push(props.projectData.name)
        projectData.push(props.projectData.name)
        projectData.push(props.projectData.name)
        projectData.push(props.projectData.name)
    }

    return (
        <section className="custom-tab project">
            <div className="custom-project-boxes">
                <h1>{props.name}</h1>
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