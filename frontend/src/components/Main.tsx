import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import profileImage from "../assets/images/me.jpg";
import "../assets/styles/Main.scss";

const Main = () => {
  return (
    <div className="container">
      <div className="about-section">
        <div className="image-wrapper">
          <img src={profileImage} alt="Avatar" />
        </div>
        <div className="content">
          <div className="social_icons">
            <a href="https://github.com/dgamboa1605" target="_blank" rel="noreferrer">
              <GitHubIcon />
            </a>
            <a href="https://linkedin.com/in/dennis-gamboa" target="_blank" rel="noreferrer">
              <LinkedInIcon />
            </a>
          </div>
          <h1>Dennis Gamboa</h1>
          <p>Full Stack Engineer</p>

          <div className="mobile_social_icons">
            <a href="https://github.com/dgamboa1605" target="_blank" rel="noreferrer">
              <GitHubIcon />
            </a>
            <a href="https://linkedin.com/in/dennis-gamboa" target="_blank" rel="noreferrer">
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
