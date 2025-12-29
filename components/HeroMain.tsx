import React from "react";
import styled from "styled-components";
import balloons from "./balloons";
import CTAButton, { LinkCTAButton } from "./UI/CTAButton";
import { Grid } from "./Layout";
import Monitor from "./Monitor";
import T from "./UI/Typography";
import { HStack, VStack } from "./UI/Stack";
import windowsWallpaper from "../public/windows-wallpaper.png";
const HeroMain = () => {
  const removeBalloonsRef = React.useRef<() => void | null>(null);

  const releaseBalloons = () => {
    removeBalloonsRef.current?.();
    removeBalloonsRef.current = balloons();
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
            Hi, I&apos;m Danish Haroon.
            <br /> figuring out the edges of <T.Rainbow title="whats possible">whats possible</T.Rainbow>
          </T.H1>
          <HStack gap={16}>
            <LinkCTAButton primary href="/blog">
              Read my blog
            </LinkCTAButton>
            <CTAButton onClick={releaseBalloons}>Release balloons</CTAButton>
          </HStack>
        </HeroText>
      </Grid>
    </Wrapper>
  );
};

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
