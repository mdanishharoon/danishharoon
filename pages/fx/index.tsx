import React from "react";
import { Center, Grid, Normal } from "../../components/Layout";
import Head from "next/head";
import styled from "styled-components";
import { HStack, VStack } from "../../components/UI/Stack";
import { Frame, Slider } from "react95";
import T from "../../components/UI/Typography";

const LogoText = styled.div`
  font-size: 28px;
  font-weight: bold;
  flex-shrink: 0;
  @media only screen and (max-width: 1176px) {
    font-size: 20px;
  }
`;

export const AmbilightLogo = () => (
  <LogoText>
    <T.Embossed>Ambilight</T.Embossed>
  </LogoText>
);

const images = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmoO9i44yg_tLoLIHhWH5K9te_K9vEybp5sg&usqp=CAU",
  "https://e0.pxfuel.com/wallpapers/708/203/desktop-wallpaper-80s-retro-futuristic-sci-fi-seamless-loop-retrowave-vj-videogame-landscape-with-neon.jpg",
  "https://wallpaperaccess.com/full/803492.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe_whs9Yvlq0O0_K5wcrIKRs1OVoZmsJHuTg&usqp=CAU",
  "https://media.istockphoto.com/id/1302615589/photo/futuristic-conception-studio-shot-in-dark-studio-with-neon-light-portrait-of-serious-man.jpg?s=612x612&w=0&k=20&c=onUK_DeGPYKzQHN_spq-PFGvtOWFSN4TBlmEea4M27Y=",
  "https://i.pinimg.com/736x/ca/be/d1/cabed1caf6cc3a5ee2cfaf309fd4c41f--creative-portraits-rimmel.jpg",
];
const Workspace = styled.div`
  background: #222;

  width: 100%;
  height: 100%;
  display: flex;
`;

const Canvas = styled.div`
  flex: 1;
  display: grid;
  overflow: hidden;
`;
const ImagePreview = styled.div`
  align-self: center;
  justify-self: center;
  svg {
    width: 0px;
    height: 0px;
    position: absolute;
    pointer-events: none;
  }
  img {
    display: block;
    max-height: 500px;
    max-width: 600px;
    filter: url(#ambilight);
  }
  /* outline: 50px solid white; */
  outline-offset: -50px;
`;
const Sidebar = styled(Frame)`
  flex-shrink: 0;
  height: 100%;
  width: 500px;
  justify-self: flex-end;
  padding: 24px;
`;

const AmbilightEffect = () => {
  const [isLight, setIsLight] = React.useState(true);
  const [imageIndex, setImageIndex] = React.useState(0);

  const [colorArea, setColorArea] = React.useState(80);
  const [blur, setBlur] = React.useState(50);
  const [dilation, setDilation] = React.useState(20);
  const [saturation, setSaturation] = React.useState(1);
  const [spread, setSpread] = React.useState(0);

  const sliders = (
    <VStack gap={24}>
      <HStack as="label" gap={16} alignItems="center">
        <span style={{ width: 100 }}>Color area</span>
        <Slider
          style={{ marginBottom: 0 }}
          min={0}
          max={160}
          step={5}
          value={colorArea}
          onChange={(value) => {
            setColorArea(value);
          }}
        />
      </HStack>
      <HStack as="label" gap={16} alignItems="center">
        <span style={{ width: 100 }}>Dilation</span>
        <Slider
          style={{ marginBottom: 0 }}
          value={dilation}
          step={2}
          min={0}
          max={40}
          onChange={(value) => {
            setDilation(value);
          }}
        />
      </HStack>
      {/* <HStack as="label" gap={16} alignItems="center">
        <span style={{ width: 100 }}>Saturation</span>
        <Slider
          style={{ marginBottom: 0 }}
          value={saturation}
          step={1}
          min={0}
          max={15}
          onChange={(value) => {
            setSaturation(value);
          }}
        />
      </HStack> */}
      <HStack as="label" gap={16} alignItems="center">
        <span style={{ width: 100 }}>Spread</span>
        <Slider
          style={{ marginBottom: 0 }}
          value={spread}
          step={1}
          min={0}
          max={50}
          onChange={(value) => {
            setSpread(value);
          }}
        />
      </HStack>
      <HStack as="label" gap={16} alignItems="center">
        <span style={{ width: 100 }}>Blur</span>
        <Slider
          style={{ marginBottom: 0 }}
          value={blur}
          step={2}
          min={0}
          max={100}
          onChange={(value) => {
            setBlur(value);
          }}
        />
      </HStack>
    </VStack>
  );
  return (
    <>
      <Workspace>
        <Canvas
          style={{ background: isLight ? "white" : "black" }}
          onClick={() => setIsLight((state) => !state)}
        >
          <ImagePreview
            onClick={(e) => {
              e.stopPropagation();
              setImageIndex((imageIndex) => {
                if (images.length - 1 == imageIndex) {
                  return 0;
                } else {
                  return imageIndex + 1;
                }
              });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <defs>
                <filter
                  id="ambilight"
                  width="300%"
                  height="300%"
                  x="-0.75"
                  y="-0.75"
                  color-interpolation-filters="sRGB"
                >
                  <feOffset
                    in="SourceGraphic"
                    dx="0"
                    dy="0"
                    result="backdrop"
                  />
                  <feGaussianBlur
                    in="SourceAlpha"
                    stdDeviation={colorArea}
                    result="color-area"
                  />
                  <feComponentTransfer in="color-area" result="outline">
                    <feFuncA type="discrete" tableValues="0 0 0 0 0 0 0 0 1" />
                  </feComponentTransfer>
                  <feComposite
                    in="backdrop"
                    in2="outline"
                    operator="out"
                    result="outlined"
                  />
                  <feColorMatrix
                    in="outlined"
                    type="matrix"
                    values={`1 0 0 0 0
                            0 1 0 0 0
                            0 0 1 0 0
                            0.333 0.333 0.333 -${0.19} 0`}
                    result="remove-dark-colors"
                  />
                  <feColorMatrix
                    type="saturate"
                    in="remove-dark-colors"
                    values={(7).toString()}
                    result="saturated"
                  />
                  <feMorphology
                    in="saturated"
                    operator="dilate"
                    radius={dilation}
                    result="dilated-lumin"
                  />
                  {/* <feComposite
                    in="dilated-lumin"
                    in2="SourceGraphic"
                    operator="in"
                    result="clipped"
                  />
                  <feComposite
                    in="clipped"
                    in2="outlined"
                    operator="in"
                    result="clipped-again"
                  /> */}
                  <feGaussianBlur
                    stdDeviation={spread}
                    in="dilated-lumin"
                    result="blurred"
                  />

                  <feComponentTransfer in="blurred" result="lumin">
                    <feFuncA
                      type="discrete"
                      tableValues="0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1"
                    />
                  </feComponentTransfer>

                  <feGaussianBlur
                    stdDeviation={blur}
                    in="lumin"
                    result="swag"
                  />

                  <feComposite in="SourceGraphic" in2="swag" operator="over" />
                </filter>
              </defs>
            </svg>
            {/* {images.map((imgSrc) => (
              <img src={imgSrc} alt="" />
            ))} */}
            {/* <img src={images[imageIndex]} alt="" /> */}
          </ImagePreview>
        </Canvas>
        <Sidebar>
          <VStack gap={24}>
            <AmbilightLogo />
            {sliders}
          </VStack>
        </Sidebar>
      </Workspace>
    </>
  );
};

AmbilightEffect.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <>
      <Head>
        <title>Ambilight Effect | Danish Haroon</title>
        <meta property="og:type" content="website" />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="675" />

        {/* <meta name="description" content={frontMatter.abstract} /> */}
        <meta name="og:title" content={"Ambilight Effect | Danish Haroon"} />
        <meta
          name="og:description"
          content={"figuring out the edges of whats possible"}
        />
        {/* <meta name="og:image" content={frontMatter.heroImg} /> */}
        {/* <meta name="og:image:alt" content={frontMatter.heroImg} /> */}

        <meta name="twitter:title" content={"Danish Haroon"} />
        <meta
          name="twitter:description"
          content={"figuring out the edges of whats possible"}
        />
        {/* <meta name="twitter:image" content={frontMatter.heroImg} /> */}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@danishhharoon" />
      </Head>
      {page}
    </>
  );
};

export default AmbilightEffect;

const Fitler = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <defs>
      <filter
        id="ambilight"
        width="200%"
        height="200%"
        x="-0.5"
        y="-0.5"
        color-interpolation-filters="sRGB"
      >
        <feOffset in="SourceGraphic" dx="0" dy="0" result="copy" />
        <feOffset in="SourceGraphic" dx="0" dy="0" result="light" />
        <feColorMatrix
          in="light"
          type="matrix"
          values="1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0.33 0.33 0.33 0 -0.18"
          result="remove-dark-colors"
        />
        <feGaussianBlur
          stdDeviation="20"
          in="remove-dark-colors"
          result="blurred"
        />
        <feColorMatrix
          type="saturate"
          in="blurred"
          values="10"
          result="saturated"
        />
        <feColorMatrix
          in="saturated"
          type="matrix"
          values="1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 50 0"
          result="lumin"
        />
        <feGaussianBlur stdDeviation="40" in="lumin" result="blur" />
        <feComposite in="copy" in2="blur" operator="over" />
      </filter>
    </defs>
  </svg>
);
