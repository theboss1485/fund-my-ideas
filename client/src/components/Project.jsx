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
                    <li><a>Description</a>: {props.description}</li>
                    <li><a>Funding Goal</a>: ${props.fundingGoal}</li>
                    <li><a>Campaign Time Period</a>: {props.timePeriod} days</li>
                </ul>
            </div>
        </section>
    )
}