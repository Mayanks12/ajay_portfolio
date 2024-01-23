import gamestackTexture2Placeholder from 'assets/gamestack-list-placeholder.jpg';
import gamestackTexturePlaceholder from 'assets/gamestack-login-placeholder.jpg';
import glints from 'assets/glints.png';
import glints2 from 'assets/glints2.png';
import sliceTexturePlaceholder from 'assets/slice-app-placeholder.jpg';
import sanui from 'assets/sanui.png';
import sprTexturePlaceholder from 'assets/spr-lesson-builder-dark-placeholder.jpg';
import acceleratorapp from 'assets/acceleratorapp.png';
import { Footer } from 'components/Footer';
import { Meta } from 'components/Meta';
import { Intro } from 'layouts/Home/Intro';
import { Profile } from 'layouts/Home/Profile';
import { ProjectSummary } from 'layouts/Home/ProjectSummary';
import { useEffect, useRef, useState } from 'react';

import styles from './Home.module.css';

const disciplines = [
  'Backend Engineer',
  'Software Architect',
  'DevOps Engineer',
  'UI/UX Designer',
];

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] =
    useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [
      intro,
      projectOne,
      projectTwo,
      projectThree,
      details,
    ];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections((prevSections) => [
              ...prevSections,
              section,
            ]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' },
    );

    sections.forEach((section) => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Meta
        title="Full-Stack Engineer | Ajay Patidar"
        description="Design portfolio of Ajay Patidar — a Technologist with knowledge of App development for web and mobile. Skilled in Node.js, React, Redux, Docker, Graphql, SQL/NoSQL databases, and real-time apps"
      />
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Senior Fullstack Engineer"
        description="Work in as a Kanban team member, where all of us self-responsible for
        grooming features (by communicating with PO), developing and
        ultimately delivering them"
        buttonText="View project"
        buttonLink="https://www.acceleratorapp.co/"
        model={{
          type: 'laptop',
          alt: 'Smart Sparrow lesson builder',
          textures: [
            {
              srcSet: [acceleratorapp, acceleratorapp],
              placeholder: sprTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="Senior Frontend Engineer"
        description="Created online talent recruitment and career discovery platform
         using ReactJS"
        buttonText="View website"
        buttonLink="https://glints.com/"
        model={{
          type: 'phone',
          alt: 'App login screen',
          textures: [
            {
              srcSet: [glints, glints],
              placeholder: gamestackTexturePlaceholder,
            },
            {
              srcSet: [glints2, glints2],
              placeholder: gamestackTexture2Placeholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="Frontend Engineer"
        description="SanUI is an internal component library of whole santiment app. 
        It is a collection on small react components on top of which
        santiment webapp is created"
        buttonText="View project"
        buttonLink="https://app.santiment.net/"
        model={{
          type: 'laptop',
          alt: 'Annotating a biomedical image in the Slice app',
          textures: [
            {
              srcSet: [sanui, sanui],
              placeholder: sliceTexturePlaceholder,
            },
          ],
        }}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
