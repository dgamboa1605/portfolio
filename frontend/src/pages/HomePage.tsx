// src/pages/HomePage.tsx
import Main from "../components/Main";
import Expertise from "../components/Expertise";
import Timeline from "../components/Timeline";
import Project from "../components/Project";
import Contact from "../components/Contact";
import FadeIn from "../components/FadeIn";

const HomePage = () => {
  return (
    <FadeIn transitionDuration={700}>
      <Main />
      <Expertise />
      <Timeline />
      <Project />
      <Contact />
    </FadeIn>
  );
};

export default HomePage;
