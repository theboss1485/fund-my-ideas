
import Carousel from 'react-bootstrap/Carousel';

export default function Home() {
    // Homepage
    return (
        <>
            {/* Villy: For testing, ready for map implementation */}
            <Carousel>
                <Carousel.Item>
                    <figure className="custom-slider-pictures">
                        <img className="d-block w-100" src="src/images/test1.jpg" alt="First slide"/>
                    </figure>
                    <Carousel.Caption>
                    <h3>First project</h3>
                    <p>description</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <figure className="custom-slider-pictures">
                        <img className="d-block w-100" src="src/images/test2.jpg" alt="Second slide"/>
                    </figure>
                    <Carousel.Caption>
                    <h3>Second project</h3>
                    <p>description</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <figure className="custom-slider-pictures">
                        <img className="d-block w-100" src="src/images/test3.jpg" alt="Third slide"/>
                    </figure>
                    <Carousel.Caption>
                    <h3>Third project</h3>
                    <p>description</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            {/* List of projects from newest to old? */}
            <section className="custom-projects-tab">
                <div>
                    <h1>Project Name</h1>
                    <ul>
                        <li>project description</li>
                        <li>project funding amount/goal</li>
                        <li>project time period</li>
                        <li>etc.</li>
                    </ul>
                </div>
            </section>
        </>
    )
}
