export default function SingleProject(props) {

    let projectData = props.location.state.projectData
    const {data, loading, error} = useQuery(['projectId', projectData._id]);

    return (

        <div>
            <Project projectData={projectData}/>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                data.getComments.map((item, index) => (
                    
                    <Comment key={index} {...item}/>
                ))  
            )}
        </div>

        
    )


}