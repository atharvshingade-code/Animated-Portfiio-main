import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Developer Intern</h4>
                <h5>CodeQuell</h5>
              </div>
              <h3>Present</h3>
            </div>
            <p>
              Developed backend services using Node.js and Express for production-level applications. Designed REST APIs supporting scalable and modular system architecture.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Freelance Developer</h4>
                <h5>Sindhudurg Vacancy Platform</h5>
              </div>
              <h3>Previous</h3>
            </div>
            <p>
              Built and deployed a web platform currently used by 7 taluka-level government offices. Digitized monthly vacancy data collection, replacing manual offline processes.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech in CSE</h4>
                <h5>KIT College of Engineering, Kolhapur</h5>
              </div>
              <h3>2025-2029</h3>
            </div>
            <p>
              Pursuing Bachelor of Technology in Computer Science. Expected Graduation: 2029.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
