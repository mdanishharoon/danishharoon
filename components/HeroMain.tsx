import React from "react";
import styled, { keyframes } from "styled-components";
import balloons from "./balloons";
import CTAButton, { LinkCTAButton } from "./UI/CTAButton";
import { Grid } from "./Layout";
import Monitor from "./Monitor";
import T from "./UI/Typography";
import { HStack, VStack } from "./UI/Stack";
import windowsWallpaper from "../public/windows-wallpaper.png";

const PHRASES = [
  "am figuring stuff out",
  "am waiting on my AWS CCP exam voucher",
  "am making pixels behave... mostly",
  "am breaking things(cursor is) and calling it learning",
  "am probably debugging (using cursor)",
  "am asking 'what if?' way too often",
  "am convinced AI will take my job... ",
  "think inspiration has no schedule",
];

const useTypewriter = (phrases: string[], typingSpeed = 80, deletingSpeed = 40, pauseDuration = 2000) => {
  const [displayText, setDisplayText] = React.useState("");
  const [phraseIndex, setPhraseIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentPhrase.length) {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        } else {
          // Finished typing, pause then start deleting
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          // Finished deleting, move to next phrase
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  return displayText;
};

const blink = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 3px;
  height: 1em;
  background: currentColor;
  margin-left: 2px;
  animation: ${blink} 1s infinite;
  vertical-align: text-bottom;
`;

const EasterEggText = styled.span`
  font-size: 11px;
  color: #888;
  cursor: default;
  user-select: none;
  margin-top: 4px;
  &:hover {
    color: #666;
  }
`;

const HeroMain = () => {
  const removeBalloonsRef = React.useRef<() => void | null>(null);
  const [clickCount, setClickCount] = React.useState(0);
  const typedText = useTypewriter(PHRASES);

  const releaseBalloons = () => {
    removeBalloonsRef.current?.();
    removeBalloonsRef.current = balloons();

    // Easter egg: redirect to 404 after 3 clicks
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 3) {
      window.location.href = "/i-told-you-so";
    }
  };

  React.useEffect(() => {
    return () => removeBalloonsRef.current?.();
  }, []);

  return (
    <Wrapper>
      <Grid style={{ alignItems: "center" }}>
        <Monitors>
          <div className="left-monitor">
            <Monitor
              backgroundStyles={{
                backgroundColor: "#dead25",
                backgroundImage: `url(${windowsWallpaper.src})`,
                backgroundSize: "cover",
              }}
            />
          </div>

          <div className="right-monitor">
            <Monitor
              backgroundStyles={{
                backgroundColor: "black",
              }}
            />
          </div>
          <div className="center-monitor">
            <Monitor
              backgroundStyles={{
                backgroundImage: `url(https://i.pinimg.com/originals/a7/a2/0e/a7a20e9a4c0c5ed6af6cbaf3c268d701.png)`,
                backgroundSize: "cover",
              }}
            />
          </div>
        </Monitors>
        {/* <BrokenPopup /> */}
        <HeroText>
          <T.H1>
            Hi, I&apos;m Danish Haroon. and I
            <br />
            <TypewriterWrapper>
              {/* Invisible placeholder to reserve space for longest phrase */}
              <TypewriterPlaceholder aria-hidden="true">
                {PHRASES.reduce((a, b) => a.length > b.length ? a : b)}
              </TypewriterPlaceholder>
              {/* Actual typed text positioned on top */}
              <TypewriterText>
                {typedText}
                <Cursor />
              </TypewriterText>
            </TypewriterWrapper>
          </T.H1>
          <HStack gap={16}>
            <LinkCTAButton primary href="/projects">
              View Projects
            </LinkCTAButton>
            <CTAButton onClick={releaseBalloons}>Release balloons</CTAButton>
          </HStack>
          <EasterEggText>
            don&apos;t release too many balloons
          </EasterEggText>
        </HeroText>
      </Grid>
    </Wrapper>
  );
};

const TypewriterWrapper = styled.span`
  display: block;
  position: relative;
`;

const TypewriterPlaceholder = styled.span`
  visibility: hidden;
  display: block;
`;

const TypewriterText = styled.span`
  position: absolute;
  top: 0;
  left: 0;
`;

export default HeroMain;

const Wrapper = styled.div`
  min-height: 60vh;
  display: flex;
  padding-top: 100px;
  padding-bottom: 120px;
  @media only screen and (max-width: 1176px) {
    padding-top: 72px;
  }
  @media only screen and (max-width: 796px) {
    margin-left: 32px;
    margin-right: 32px;
  }
  @media only screen and (max-width: 510px) {
    padding-top: 48px;
  }
`;

const HeroText = styled.div`
  grid-column: 8 / span 5;
  display: flex;
  flex-direction: column;
  gap: 48px;
  @media only screen and (max-width: 1176px) {
    grid-column: 3 / span 8;
    margin-top: 48px;
    gap: 24px;

    align-items: center;
    h1 {
      text-align: center;
    }
  }
  @media only screen and (max-width: 796px) {
    grid-column: 1 / span 12;
  }
  @media only screen and (max-width: 510px) {
    align-items: flex-start;
    h1 {
      text-align: left;
    }
  }
`;

const Monitors = styled.div`
  contain: layout;
  grid-column: 1 / span 7;
  @media only screen and (max-width: 1176px) {
    grid-column: 3 / span 8;
    left: 0;
    --monitor-width: 280;
  }
  @media only screen and (max-width: 796px) {
    grid-column: 1 / span 12;
    left: 0;
    --monitor-width: 280;
  }
  position: relative;
  left: -50px;
  --monitor-width: 300;

  .left-monitor {
    display: inline-block;
    position: absolute;
    transform: scale(0.88);
    mask-image: linear-gradient(to right, black, transparent);
    filter: opacity(0.5) brightness(0.2) blur(3px);
  }
  .center-monitor {
    display: inline-block;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    filter: brightness(0.85);
  }
  .right-monitor {
    display: inline-block;
    position: absolute;
    right: 0;
    transform: scale(0.92);
    mask-image: linear-gradient(to top left, black, transparent);
    filter: opacity(0.8) brightness(0.2) blur(1px);
  }
  @media only screen and (max-width: 678px) {
    .left-monitor {
      left: -70px;
    }
    .right-monitor {
      right: -70px;
    }
  }
  @media only screen and (max-width: 510px) {
    --monitor-width: 220;
    .left-monitor {
      left: -120px;
    }
    .right-monitor {
      right: -120px;
    }
  }
`;
