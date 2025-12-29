import Link from "next/link";
import React from "react";
import { Anchor, Frame } from "react95";
import eggplant from "react95/dist/themes/eggplant";
import styled, { ThemeProvider } from "styled-components";
import { Center, Grid } from "./Layout";
import { ExpensiveToys } from "./UI/Typography";
import { SITE_URL } from "../utils";

const StyledFooter = styled(Frame)`
  width: 100%;
  padding: 0;
  padding: 16px 0px;
  position: sticky;
  top: 100vh;

  @media only screen and (max-width: 1176px) {
    padding: 16px;
  }
`;

const Links = styled.div`
  grid-column: 8 / span 5;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  padding: 16px;
  @media only screen and (max-width: 460px) {
    grid-column: 1 / span 12;
    justify-content: center;
  }
`;

const LogoWrapper = styled.div`
  grid-column: 1 / span 6;
  display: flex;
  align-self: center;
  @media only screen and (max-width: 460px) {
    grid-column: 1 / span 12;
    justify-content: center;
  }
`;

const Footer = () => {
  return (
    <ThemeProvider theme={eggplant}>
      <StyledFooter forwardedAs={"footer"}>
        <Center>
          <Grid>
            <LogoWrapper>
              <Link href="/">
                <ExpensiveToys />
              </Link>
            </LogoWrapper>
            <Links>
              <Anchor
                href="https://x.com/danishhharoon"
                target="_blank"
                rel="noreferrer"
              >
                X
              </Anchor>
              <Anchor
                href="https://github.com/mdanishharoon"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </Anchor>
              <Anchor
                href="https://linkedin.com/in/mdanishh"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </Anchor>
            </Links>
          </Grid>
        </Center>
      </StyledFooter>
    </ThemeProvider>
  );
};

export default Footer;
