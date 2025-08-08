import "./App.css";
import "./BlogPage.css";
import Header from "./header";

function BlogPage() {
  return (
    <div className="app">
      <div className="content">
        <Header />

        <h2>March 29, 2025</h2>
        <p>
          I have started a contract position as a Principal Engineer at Peerhaul! 
          Check out our website: <a href="https://www.peerhaul.ca" target="_blank" rel="noopener noreferrer" className="light-blue-link">www.peerhaul.ca</a>
        </p>

        <h2>January 10, 2025</h2>
        <p>
          I joined Dr. Tong's research team under the Stephen Jarislowsky Chair.
        </p>

        <h2>October 3, 2024</h2>
        <p>
          I started a new internship position at FlyTogether as a Full-Stack Developer.
        </p>

        <h2>August 26, 2024</h2>
        <p>I climbed Gros Morne Mountain.</p>
        <div className="image-container">
          <img
            src={process.env.PUBLIC_URL + "/grosMorne1.jpg"}
            alt="Gros Morne Mountain View 1"
            className="responsive-image"
          />
          <img
            src={process.env.PUBLIC_URL + "/grosMorne2.jpg"}
            alt="Gros Morne Mountain View 2"
            className="responsive-image"
          />
        </div>

        <footer className="footer"></footer>
      </div>
    </div>
  );
}

export default BlogPage;
