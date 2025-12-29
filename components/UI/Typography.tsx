import React from "react";
import { createHatchedBackground } from "react95/dist/common";
import { Theme } from "react95/dist/types";
import styled from "styled-components";

const StyledEmbossedText = styled.div<{ pixelSize?: number }>`
  position: relative;
  color: ${(p) => p.theme.borderDark};
  --pixel-size: ${(p) => p.pixelSize || 1}px;
  text-shadow: calc(-1 * var(--pixel-size)) calc(-1 * var(--pixel-size)) 0px
      ${(p) => p.theme.materialText},
    var(--pixel-size) var(--pixel-size) 0px ${(p) => p.theme.borderLightest};
  font-style: italic;
  &::before {
    display: block;
    pointer-events: none;
    content: attr(data-text);
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;
    ${(p) =>
    createHatchedBackground({
      mainColor: p.theme.material,
      pixelSize: p.pixelSize || 1,
    })}
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    text-shadow: none;
  }
`;

const EmbossedText = ({
  children,
  ...otherProps
}: React.ComponentProps<typeof StyledEmbossedText> & {
  children: string;
}) => {
  return (
    <StyledEmbossedText data-text={children} {...otherProps}>
      {children}
    </StyledEmbossedText>
  );
};

const BaseFont = styled.span<{ color?: keyof Theme; disabled?: boolean }>`
  font-family: arial;
  color: ${(p) =>
    p.disabled
      ? p.theme.materialTextDisabled
      : p.color
        ? p.theme[p.color]
        : p.theme.materialText};
  text-shadow: ${(p) =>
    p.disabled ? `1px 1px 0px ${p.theme.materialTextDisabledShadow}` : "none"};
  a {
    /* TODO: fix duplicated anchor styles */
    color: ${(p) => p.theme.anchor};
    text-decoration: underline;
  }
  b,
  strong {
    font-weight: bold;
  }
`;

const T = {
  H1: styled(BaseFont.withComponent("h1"))`
    font-size: 40px;
    line-height: 1.5;
    font-family: arial;
    font-weight: bold;
    @media only screen and (max-width: 1050px) {
      font-size: 30px;
    }
  `,
  H2: styled(BaseFont.withComponent("h2"))`
    font-size: 22px;
    line-height: 1.5;
    font-family: arial;
    font-weight: 600;
  `,
  Body: styled(BaseFont.withComponent("p"))`
    font-size: 18px;
    font-family: arial;
    font-weight: normal;
  `,
  BodySmall: styled(BaseFont.withComponent("p"))`
    font-size: 14px;
    font-family: arial;
    font-weight: normal;
  `,
  BodyLarge: styled(BaseFont.withComponent("p"))`
    font-size: 24px;
    font-family: arial;
    line-height: 1.75;
  `,

  Rainbow: styled(BaseFont.withComponent("span"))`
    color: #333;
    /* This is for non-webkit browsers */
    -webkit-text-fill-color: transparent;
    position: relative;
    display: inline-block;
    font-weight: bold;
    font-size: inherit;

    &:before {
      content: attr(title);
      position: absolute;
      left: 0;
      top: 0;
      z-index: 2;
      background: -webkit-linear-gradient(
        left,
        rgb(176, 9, 151) 0%,
        rgb(227, 33, 107) 10%,
        rgb(249, 96, 30) 25%,
        rgb(255, 180, 18) 40%,
        rgb(255, 216, 45) 50%,
        rgb(185, 221, 23) 61%,
        rgb(65, 160, 60) 75%,
        rgb(19, 54, 180) 90%,
        rgb(116, 27, 157) 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    &:after {
      content: attr(title);
      position: absolute;
      z-index: 199;
      left: -6px;
      bottom: -10px;
      z-index: 1;
      -webkit-text-fill-color: #000;
      -webkit-transform: skew(40deg, 0deg) scaleY(0.5);
      opacity: 0.3;
    }
  `.withComponent("span"),
  Spray: styled(BaseFont.withComponent("span"))`
    color: red;
    font-weight: bold;
    font-style: oblique;
    filter: url(#spray);
  `,
  Embossed: EmbossedText,
};

export default T;

export const TextFiltersProvider = () => {
  return (
    <div style={{ display: "none" }}>
      <svg width="0">
        <filter id="spray">
          <feTurbulence
            id="turbulence"
            type="fractalNoise"
            baseFrequency=".9"
            numOctaves="12"
          />
          <feDisplacementMap in="SourceGraphic" scale="14" />
        </filter>
      </svg>
    </div>
  );
};

const LogoText = styled.div`
  font-size: 28px;
  font-weight: bold;
  flex-shrink: 0;
  @media only screen and (max-width: 1176px) {
    font-size: 20px;
  }
`;

export const ExpensiveToys = () => (
  <LogoText>
    <T.Embossed>danish.haroon</T.Embossed>
  </LogoText>
);
