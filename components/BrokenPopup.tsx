import React from "react";
import { Button, Window, WindowContent, WindowHeader } from "react95";
import styled from "styled-components";

const Outer = styled.div`
  position: relative;
`;
const Inner = styled.div``;
const Win95Left = styled.div`
  filter: drop-shadow(2px 0px 0px ${(p) => p.theme.borderDark})
    drop-shadow(2px 0px 0px ${(p) => p.theme.borderDarkest});
  & > * {
    /* clip-path: polygon(0 0, 65% 0, 39% 100%, 0% 100%); */
    clip-path: polygon(61% 24%, 48% 69%, 53% 86%, 44% 100%, 0 100%, 0 0, 57% 0);
  }
  height: 100%;
`;
const Win95Right = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  filter: drop-shadow(-1px -2px 0px ${(p) => p.theme.borderLight})
    drop-shadow(-1px -1px 0px ${(p) => p.theme.borderLightest});
  & > * {
    clip-path: polygon(
      73% 41%,
      56% 70%,
      55% 86%,
      46% 100%,
      100% 100%,
      100% 33%,
      87% 37%
    );
  }
  height: 100%;
`;
const bayerFilter = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAC7ElEQVR4nJXRNVPzYAAA4PfaoRzXAQgQJMgxcUx4cQsQJGgKAZri7u52TBwT7nZMHBPuxd3d3d3df8E3fOuzPgAAkJ6eLisrW11dzcfHl5mZKS8vX1tbS6PRMjIy5OTkampq+Pn5s7KyFBQU6urqQF9fn4GBwd7enru7+9jYmJmZ2dnZmb+//8DAgJGR0cHBgaen58TEhIWFxcXFRWBgIFBUVKyvrxcQEMjOztbQ0GhvbxcTEysuLlZWVm5sbBQSEsrNzdXS0urs7JSQkCgtLQV3d3fh4eFzc3O2trZvb2/x8fFra2tOTk4PDw+RkZELCwv29vYfHx+JiYkbGxsuLi40BEEQBKEoiqIoJpPJZDJxHMdx/F8OpqamcBy/uroKDg4eGhoyNjY+Ojry9vaemZmxtra+ubkJDQ0dGRkxNTU9OTnx9fUFOjo63d3dCIKUl5erqqo2NzcLCwvn5+fr6en19PRIS0tXVlaqq6u3traKiooWFhaCr6+v5OTkra0tiqKenp6io6OXlpbYbPbPz09qaurOzo6rq+vLy0tsbOzKyoqjoyONwWAwGAwMwzAMg2EYhmGSJEmSpNPpdDodRVEURSEIgiCIIAiCIMDg4CCKooeHh15eXpOTk5aWlpeXl0FBQf39/YaGhvv7+x4eHuPj4+bm5ufn5wEBAUBFRaWpqQmCoLy8PG1t7a6uLklJybKyMiUlpYaGBkFBwZycHE1NzY6ODnFx8ZKSEvD4+BgVFbW4uEgQxOfnZ1JS0ubmJofDub+/j4iImJ+ft7Oze39/T0hIWF9fd3Z2/v+H2dlZGxub29vbsLCw0dFRDMNOT0/9/Pymp6etrKyur69DQkKGh4dNTEyOj499fHyAvr5+b2+vjIxMVVUVi8Vqa2uDYbioqEhXV5fH40lJSVVUVKipqbW0tIiIiBQUFIDf39+0tLTd3V03N7fX19e4uLjV1VWSJL+/v1NSUra3t7lc7vPzc0xMzPLysoODwx+zF2jWbikL0wAAAABJRU5ErkJggg==`;
const GlassMaterial = styled.div`
  background: rgba(255, 255, 255, 0.27);
  border-radius: 16px;
  backdrop-filter: blur(5px) saturate(170%);
  -webkit-backdrop-filter: blur(5px) saturate(170%);
  border: 1px solid rgba(255, 255, 255, 0.31);
`;

const GlassButton = styled(GlassMaterial)`
  position: absolute;
  right: 12px;
  top: 12px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: grid;
  &::before,
  &::after {
    content: "";
    position: absolute;
    place-self: center;
    width: 20px;
    height: 2px;
    background: white;
    border-radius: 1px;
  }
  &::before {
    transform: rotate(90deg);
  }
  transform: rotate(45deg);
  /* mix-blend-mode: color-dodge; */
`;
const Glass = styled(GlassMaterial)`
  position: absolute;
  inset: 0;

  &::before {
    content: "";
    position: absolute;
    inset: 1px;
    background: url(${bayerFilter});
    opacity: 0.5;
    background-size: 10px;
    border-radius: 14px;
    mix-blend-mode: overlay;
  }
`;

const Paper = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 16px;
  background: white;
`;

const BrokenPopup = () => {
  return (
    <Outer>
      <Inner style={{ width: 362, height: 220 }}>
        <Glass>
          <GlassButton />
        </Glass>
        <Win95Left>
          <Window style={{ width: "100%", height: "100%" }} shadow={false}>
            <WindowHeader>Critical error</WindowHeader>
            <WindowContent>
              Something went really fucking wrong right now. your fault.
              <Button
                style={{
                  width: 120,
                  position: "absolute",
                  bottom: 16,
                  left: "50%",
                  transform: "translateX(-50%)",
                  pointerEvents: "none",
                }}
              >
                OK
              </Button>
            </WindowContent>
          </Window>
        </Win95Left>
        <Win95Right>
          <Window style={{ width: "100%", height: "100%" }} shadow={false}>
            <WindowHeader>Critical error</WindowHeader>
            <WindowContent>
              Something went really fucking wrong right now. your fault.
              <Button
                style={{
                  width: 120,
                  position: "absolute",
                  bottom: 16,
                  left: "50%",
                  transform: "translateX(-50%)",
                  pointerEvents: "none",
                }}
              >
                OK
              </Button>
            </WindowContent>
          </Window>
        </Win95Right>
      </Inner>
    </Outer>
  );
};

export default BrokenPopup;
