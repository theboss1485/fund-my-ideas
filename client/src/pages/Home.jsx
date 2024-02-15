
import Carousel from 'react-bootstrap/Carousel';
import { GET_ALL_PROJECTS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Project from '../components/Project'
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/* This function renders the home page. */
const Home = () => {

    const navigate = useNavigate();

    const {data, loading, error, refetch} = useQuery(GET_ALL_PROJECTS);


    const [projects, setProjects] = useState([]);

    let keys = undefined;

    useEffect(() => {

        if (data) {

            setProjects(data.allProjects);

            // Here, we give each project a unique key.
            keys = data.allProjects.map(() => uuidv4());
        }

    }, [data]);

    // This is to allow a new project to appear after a user creates one and then navigates to the Home page.
    useEffect(() => {

        const previousURL = localStorage.getItem('currentUrl');

        if(previousURL){

            if(previousURL.includes("/me")){

                refetch();
            }

            localStorage.setItem("currentUrl", window.location.href)
        }

        

    }, [])

    return (
        <>
            {data &&(
            <Carousel className="custom-slider-pictures-container">
                <Carousel.Item>
                    <figure className="custom-slider-pictures">
                        <img className="d-block w-100" src="/test1.jpg" alt="First slide"/>
                    </figure>
                    <Carousel.Caption>
                        <h3 className="custom-carousel-title">{data.allProjects[0].name}</h3>
                        <p className="custom-carousel-description">{data.allProjects[0].description}</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <figure className="custom-slider-pictures">
                        <img className="d-block w-100" src="/test2.jpg" alt="Second slide"/>
                    </figure>
                    <Carousel.Caption>
                        <h3 className="custom-carousel-title">{data.allProjects[1].name}</h3>
                        <p className="custom-carousel-description">{data.allProjects[1].description}</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <figure className="custom-slider-pictures">
                        <img className="d-block w-100" src="/test3.jpg" alt="Third slide"/>
                    </figure>
                    <Carousel.Caption>
                        <h3 className="custom-carousel-title">{data.allProjects[2].name}</h3>
                        <p className="custom-carousel-description">{data.allProjects[2].description}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            )}

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

export default Home;
