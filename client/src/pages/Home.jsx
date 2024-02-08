export default function Home() {
    // Homepage
    return (
        <>
            {/* <header className="custom-homepage-header">
                <h1>HomePage</h1>
            </header> */}
            <div id="homepageProjects" className="carousel slide custom-projects-slider" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#homepageProjects" data-slide-to="0" className="active"></li>
                    <li data-target="#homepageProjects" data-slide-to="1"></li>
                    <li data-target="#homepageProjects" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100" src="src/images/test1.jpg" alt="First slide"/>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src="src/images/test2.jpg" alt="Second slide"/>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src="src/images/test3.jpg" alt="Third slide"/>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#homepageProjects" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only"></span>
                </a>
                <a className="carousel-control-next" href="#homepageProjects" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only"></span>
                </a>
            </div>
        </>
    )
}