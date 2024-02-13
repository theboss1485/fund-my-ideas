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
                    <li><strong>Description</strong>: {props.description}</li>
                    <li><strong>Funding Goal</strong>: ${props.fundingGoal}</li>
                    <li><strong>Campaign Time Period</strong>: {props.timePeriod} days</li>
                </ul>
            </div>
        </section>
    )
}