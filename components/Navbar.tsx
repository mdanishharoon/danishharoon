import React from "react";
import { Button, Frame } from "react95";
import { createHatchedBackground } from "react95/dist/common";
import original from "react95/dist/themes/original";
import styled, { ThemeProvider } from "styled-components";
import CTAButton, { LinkCTAButton } from "./UI/CTAButton";
import { Center, Grid } from "./Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { ExpensiveToys } from "./UI/Typography";

const AppBar = styled(Frame)`
  z-index: 2;
  position: sticky;
  top: 0;
  width: 100%;
  padding: 16px 0;
  z-index: 10;
  @media only screen and (max-width: 1176px) {
    padding: 16px;
  }
`;

const NavButtons = styled.nav`
  display: flex;
  gap: 8px;
  grid-column: 8 / span 5;
  justify-content: flex-end;
  button, > a > span {
    height: 50px;
  }
  @media only screen and (max-width: 1176px) {
    gap: 4px;
    grid-column: 7 / span 6;
    button, > a > span {
      height: 36px !important;
      font-size: 13px !important;
      padding-left: 8px !important;
      padding-right: 8px !important;
    }
  }
`;

const LogoLink = styled.div`
  grid-column: 1 / span 4;
  @media only screen and (max-width: 1176px) {
    grid-column: 1 / span 5;
  }
`;

const pages = [
  { name: "Projects", href: "/projects" },
  { name: "Experience", href: "/experience" },
];

const Navbar = () => {
  const router = useRouter();

  return (
    <AppBar variant="window">
      <Center>
        <Grid style={{ alignItems: "center" }}>
          <LogoLink>
            <Link href="/">
              <ExpensiveToys />
            </Link>
          </LogoLink>

          <NavButtons>
            {pages.map((page) => (
              <LinkCTAButton
                href={page.href}
                key={page.name}
                active={router.pathname === page.href}
                variant="thin"
              >
                {page.name}
              </LinkCTAButton>
            ))}
          </NavButtons>
        </Grid>
      </Center>
    </AppBar>
  );
};

export default Navbar;
