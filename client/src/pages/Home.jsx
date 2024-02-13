
import Carousel from 'react-bootstrap/Carousel';
import { GET_ALL_PROJECTS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Project from '../components/Project'
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Home() {

    const navigate = useNavigate();

    const {data, loading, error, refetch} = useQuery(GET_ALL_PROJECTS);

    const [projects, setProjects] = useState([]);

    let keys = undefined;

    const handleUrlChange = () => {

        refetch();
    }

    useEffect(() => {

        if (data) {

            setProjects(data.allProjects);
            keys = data.allProjects.map(() => uuidv4());
        }

    }, [data]);

    // This is to allow a new project to appear after a user creates one and then navigates to the Home page.
    useEffect(() => {

        console.log("testing123");

        let previousURL = localStorage.getItem('previousUrl')
        console.log("history", navigate);
        if(previousURL.includes("/me")){

            refetch();
        }

    }, [])

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
                        <Project {...item}/>
                    </Link>
                ))
            )}
        </>
    )
}
