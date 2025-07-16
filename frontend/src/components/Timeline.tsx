import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import 'react-vertical-timeline-component/style.min.css';
import "../assets/styles/Timeline.scss";

const experiences = [
  {
    title: "QA Automation Engineer",
    subtitle: "Jalasoft · Bolivia",
    date: "2023 – Present",
    description:
      "Design and maintain robust automated test frameworks using Playwright, Pytest, and SpecFlow. Integrated tests into CI/CD pipelines with GitLab, improved test coverage, and accelerated release cycles.",
  },
  {
    title: "QA Engineer (Freelance)",
    subtitle: "Remote",
    date: "2022 – 2023",
    description:
      "Performed end-to-end testing for mobile and web applications. Conducted API testing with Postman, functional testing of microservices, and performance testing using JMeter.",
  },
  {
    title: "QA Intern",
    subtitle: "Private University · Cochabamba, Bolivia",
    date: "2021 – 2022",
    description:
      "Executed manual test cases, documented bugs, and collaborated with developers on issue resolution. Contributed to the creation of detailed test plans and early defect identification.",
  },
];

function Timeline() {
  return (
    <div id="history">
      <div className="items-container">
        <h1>Career History</h1>
        <VerticalTimeline>
          {experiences.map((exp, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work"
              contentStyle={{ background: "white", color: "rgb(39, 40, 34)" }}
              contentArrowStyle={{ borderRight: "7px solid white" }}
              date={exp.date}
              iconStyle={{ background: "#5000ca", color: "white" }}
              icon={<FontAwesomeIcon icon={faBriefcase} />}
            >
              <h3 className="vertical-timeline-element-title">{exp.title}</h3>
              <h4 className="vertical-timeline-element-subtitle">{exp.subtitle}</h4>
              <p>{exp.description}</p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;
