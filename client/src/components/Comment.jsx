export default function Comment(props) {

    console.log(props)

    return (

        <section className="custom-tab has-text-centered">
            
            <p>{props.commentText}</p>
            <p>Created by {props.username} on {props.createdAt}</p>
        </section>
    )
}