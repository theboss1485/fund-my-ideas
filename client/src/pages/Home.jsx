
import Carousel from 'react-bootstrap/Carousel';
import { GET_ALL_PROJECTS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Project from '../components/Project'
import { Link } from "react-router-dom";

export default function Home() {

    const {data, loading, error} = useQuery(GET_ALL_PROJECTS);
    // Homepage
    return (
        <>
            {/* Villy: For testing, ready for map implementation */}
            <Carousel className="custom-slider-pictures-container">
                <Carousel.Item className="">
                    <figure className="custom-slider-pictures">
                        <img className="d-block w-100" src="/test1.jpg" alt="First slide"/>
                    </figure>
                    <Carousel.Caption>
                    <h3>First Project</h3>
                    <p>description</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="">
                    <figure className="custom-slider-pictures">
                        <img className="d-block w-100" src="/test2.jpg" alt="Second slide"/>
                    </figure>
                    <Carousel.Caption>
                    <h3>Second project</h3>
                    <p>description</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="">
                    <figure className="custom-slider-pictures">
                        <img className="d-block w-100" src="/test3.jpg" alt="Third slide"/>
                    </figure>
                    <Carousel.Caption>
                    <h3>Third project</h3>
                    <p>description</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            {/* List of projects from newest to old? */}
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                data.allProjects.map((item, index) => (
                    <Link to={`/projects/${item._id}`} state={{projectData: item}} style={{textDecoration: 'none'}}>
                        <Project key={index} {...item} className="home-project"/>
                    </Link>
                ))
            )}
        </>
    )
}
