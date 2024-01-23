import profileKatakana from 'assets/katakana-profile.svg?url';
import profileImgPlaceholder from 'assets/profile-placeholder.jpg';
import { Button } from 'components/Button';
import { DecoderText } from 'components/DecoderText';
import { Divider } from 'components/Divider';
import { Heading } from 'components/Heading';
import { Image } from 'components/Image';
import { Link } from 'components/Link';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { Transition } from 'components/Transition';
import { Fragment, useState } from 'react';
import { media } from 'utils/style';
import styles from './Profile.module.css';

const ProfileText = ({ visible, titleId }) => (
  <Fragment>
    <Heading
      className={styles.title}
      data-visible={visible}
      level={3}
      id={titleId}
    >
      <DecoderText text="Hi there" start={visible} delay={500} />
    </Heading>
    <Text
      className={styles.description}
      data-visible={visible}
      size="l"
      as="p"
    >
      I&apos;m Ajay Patidar, a seasoned technologist specializing in
      developing and delivering modern applications for both web and
      mobile platforms. With extensive experience as a Senior
      JavaScript Engineer, I possess proficiency in technologies like
      Node.js, Docker, React, Redux, and both SQL and NoSQL databases.
      Explore my work samples, which include contributions at{' '}
      <Link href="https://acceleratorapp.co">Acceleratorapp</Link>,{' '}
      <Link href="https://glints.com">Glints</Link>, and my role as a
      Frontend Engineer at{' '}
      <Link href="https://app.santiment.net/">SanUI</Link>. At SanUI,
      I played a pivotal role in building an internal component
      library for the Santiment app, emphasizing highly reusable
      components through a Test-Driven Development (TDD) approach.
    </Text>{' '}
    <Text
      className={styles.description}
      data-visible={visible}
      size="l"
      as="p"
    >
      I&apos;m looking to work with a great product engineer team, a
      team that keeps charging and challenging to ideate and innovate
      new cool features and adds value to the company&apos;s growth.
      I&apos;d also like to contribute to the team&apos;s growth by
      the means of a healthy and open discussion.
    </Text>
  </Fragment>
);

export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.profile}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {(visible) => (
          <div className={styles.content}>
            <div className={styles.column}>
              <ProfileText visible={visible} titleId={titleId} />
              <Button
                secondary
                className={styles.button}
                data-visible={visible}
                href="/contact"
                icon="send"
              >
                Send me a message
              </Button>
            </div>
            <div className={styles.column}>
              <div className={styles.tag} aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={!visible}
                  collapseDelay={1000}
                />
                <div
                  className={styles.tagText}
                  data-visible={visible}
                >
                  About Me
                </div>
              </div>
              <div className={styles.image}>
                <Image
                  reveal
                  delay={100}
                  placeholder={profileImgPlaceholder}
                  srcSet={[
                    profileImgPlaceholder,
                    profileImgPlaceholder,
                  ]}
                  sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                  alt="Me standing in front of the Torii on Miyajima, an island off the coast of Hiroshima in Japan"
                />
                <svg
                  aria-hidden="true"
                  width="135"
                  height="765"
                  viewBox="0 0 135 765"
                  className={styles.svg}
                  data-visible={visible}
                >
                  <use href={`${profileKatakana}#katakana-profile`} />
                </svg>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};
