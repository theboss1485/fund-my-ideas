import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_PROJECT_BY_ID } from '../utils/queries';

import Project from '../components/Project';
import Comment from '../components/Comment'
import { useParams } from 'react-router-dom';


export default function SingleProject(props) {

    const { projectId } = useParams();

    const location = useLocation();

    let projectData = location.state?.projectData
    const {data, loading, error} = useQuery(GET_PROJECT_BY_ID, {

        variables: { projectId: projectId }
    });

    return (

        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                <div>
                    <Project {...data.projectById}/>
                    {data.projectById.comments.map((item, index) => (
                    
                        <Comment key={index} {...item}/>
                    ))}
                </div>
            )}
        </div>
    )
}