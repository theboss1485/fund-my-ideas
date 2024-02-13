
import Carousel from 'react-bootstrap/Carousel';
import { GET_ALL_PROJECTS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Project from '../components/Project'
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

export default function Home() {

    const {data, loading, error} = useQuery(GET_ALL_PROJECTS);

    let keys = undefined;



    if(data){

        keys = data.allProjects.map(() => uuidv4())
    }
    // Homepage
    return (
        <>
            {/* Villy: For testing, ready for map implementation */}
            {data &&(
            <Carousel className="custom-slider-pictures-container">
                <Carousel.Item>
                    <figure className="custom-slider-pictures">
                        <img className="d-block w-100" src="/test1.jpg" alt="First slide"/>
                    </figure>
                    <Carousel.Caption>
                    <h3>{data.allProjects[0].name}</h3>
                    <p>{data.allProjects[0].description}</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="">
                    <figure className="custom-slider-pictures">
                        <img className="d-block w-100" src="/test2.jpg" alt="Second slide"/>
                    </figure>
                    <Carousel.Caption>
                    <h3>{data.allProjects[1].name}</h3>
                    <p>{data.allProjects[1].description}</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="">
                    <figure className="custom-slider-pictures">
                        <img className="d-block w-100" src="/test3.jpg" alt="Third slide"/>
                    </figure>
                    <Carousel.Caption>
                    <h3>{data.allProjects[2].name}</h3>
                    <p>{data.allProjects[2].description}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            )}

            {/* List of projects from newest to old? */}
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                data.allProjects.map((item, index) => (
                    <Link key={uuidv4()} to={`/projects/${item._id}`} state={{projectData: item}} style={{textDecoration: 'none'}}>
                        <Project {...item} className="home-project"/>
                    </Link>
                ))
            )}
        </>
    )
}
