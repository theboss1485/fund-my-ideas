export default function Project (props) {

    return (
        <section className="custom-tab project">
            <div>
                <h1>{props.name}</h1>
                <ul>
                    <li>{props.description}</li>
                    <li>Funding Goal: ${props.fundingGoal}</li>
                    <li>Campaign Time Period: {props.timePeriod} days</li>
                </ul>
            </div>
        </section>
    )
}