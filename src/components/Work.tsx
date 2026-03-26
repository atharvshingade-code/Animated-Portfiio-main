import { useState, useCallback, useEffect } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

interface Project {
  title: string;
  category: string;
  tools: string;
  image: string;
  link: string;
}

const Work = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/atharvshingade-code/repos?sort=pushed&per_page=5"
        );
        const data = await response.json();
        
        const formattedProjects = data.map((repo: any) => ({
          title: repo.name.replace(/-/g, " "),
          category: repo.topics && repo.topics.length > 0 ? repo.topics.join(", ") : "Open Source Project",
          tools: repo.language || "Multiple",
          image: "", // Blank image as repos don't have default images
          link: repo.html_url,
        }));
        
        setProjects(formattedProjects);
      } catch (error) {
        console.error("Failed to fetch repositories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    if (projects.length === 0) return;
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide, projects.length]);

  const goToNext = useCallback(() => {
    if (projects.length === 0) return;
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide, projects.length]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        {loading ? (
          <div style={{ textAlign: "center", padding: "50px 0", opacity: 0.6 }}>
            <h3 style={{ fontWeight: 300 }}>Loading repositories...</h3>
          </div>
        ) : (
          <div className="carousel-wrapper">
            {/* Navigation Arrows */}
            {projects.length > 1 && (
              <>
                <button
                  className="carousel-arrow carousel-arrow-left"
                  onClick={goToPrev}
                  aria-label="Previous project"
                  data-cursor="disable"
                >
                  <MdArrowBack />
                </button>
                <button
                  className="carousel-arrow carousel-arrow-right"
                  onClick={goToNext}
                  aria-label="Next project"
                  data-cursor="disable"
                >
                  <MdArrowForward />
                </button>
              </>
            )}

            {/* Slides */}
            <div className="carousel-track-container">
              <div
                className="carousel-track"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {projects.map((project, index) => (
                  <div className="carousel-slide" key={index}>
                    <div className="carousel-content">
                      <div className="carousel-info" style={{ width: project.image ? "auto" : "100%" }}>
                        <div className="carousel-number">
                          <h3>0{index + 1}</h3>
                        </div>
                        <div className="carousel-details" style={{ width: "100%" }}>
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noreferrer" 
                            data-cursor="disable"
                            style={{ textDecoration: "none", color: "inherit", display: "inline-block" }}
                          >
                            <h4 style={{ textTransform: "capitalize", borderBottom: "1px dashed transparent", transition: "0.3s" }}
                                onMouseEnter={(e) => e.currentTarget.style.borderBottom = "1px solid var(--accentColor)"}
                                onMouseLeave={(e) => e.currentTarget.style.borderBottom = "1px dashed transparent"}
                            >
                              {project.title}
                            </h4>
                          </a>
                          <p className="carousel-category">
                            {project.category}
                          </p>
                          <div className="carousel-tools">
                            <span className="tools-label">Language / Tools</span>
                            <p>{project.tools}</p>
                          </div>
                          
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noreferrer"
                            data-cursor="disable"
                            style={{
                              marginTop: '25px', 
                              display: 'inline-block', 
                              padding: '10px 24px', 
                              background: 'var(--accentColor)', 
                              color: '#000', 
                              borderRadius: '4px', 
                              textDecoration: 'none', 
                              fontWeight: 500,
                              fontSize: "15px",
                              transition: "0.3s",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 5px 15px rgba(94, 234, 212, 0.3)" }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none" }}
                          >
                            View Repository
                          </a>
                        </div>
                      </div>
                      
                      {project.image && (
                        <div className="carousel-image-wrapper">
                          <WorkImage image={project.image} alt={project.title} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dot Indicators */}
            {projects.length > 1 && (
              <div className="carousel-dots">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                      }`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to project ${index + 1}`}
                    data-cursor="disable"
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Work;
