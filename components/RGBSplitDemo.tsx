import copy from "copy-to-clipboard";
import Image from "next/image";
import React from "react";
import { Button, Checkbox, Frame, NumberInput, Separator } from "react95";
import styled, { useTheme } from "styled-components";
import BulbIcon from "../public/icons/bulb.png";
import ProfilePic from "../public/profile-pic.jpeg";
import ColorPreview from "./UI/ColorPreview";
import { HStack, VStack } from "./UI/Stack";
import T from "./UI/Typography";
import { HighlightChange } from "./UI/HighlightChange";

const LogoText = styled.div`
  font-size: 22px;
  font-weight: bold;
  flex-shrink: 0;
`;

const filterId = "rgb-split";

const generateInlineCSS = ({
  dxRed,
  dyRed,
  dxCyan,
  dyCyan,
  clipSource,
}: {
  dxRed: number;
  dyRed: number;
  dxCyan: number;
  dyCyan: number;
  clipSource: boolean;
}) =>
  `filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1'><filter id='${filterId}'><feOffset in='SourceGraphic' dx='${dxRed}' dy='${dyRed}' result='layer-one' /><feComponentTransfer in='layer-one' result='red'><feFuncR type='identity' /><feFuncG type='discrete' tableValues='0' /><feFuncB type='discrete' tableValues='0' /></feComponentTransfer><feOffset in='SourceGraphic' dx='${dxCyan}' dy='${dyCyan}' result='layer-two' /><feComponentTransfer in='layer-two' result='cyan'><feFuncR type='discrete' tableValues='0' /><feFuncG type='identity' /><feFuncB type='identity' /></feComponentTransfer><feBlend in='red' in2='cyan' mode='screen' result='color-split' />${
    clipSource
      ? `<feComposite in='color-split' in2='SourceGraphic' operator='in' />`
      : ""
  }</filter></svg>#${filterId}");`;

export const GeneratorLogo = () => (
  <LogoText>
    <T.Embossed>RGB Split Effect</T.Embossed>
  </LogoText>
);

const RGBSplitEditorWrapper = styled.div`
  background: #808080;
`;
export const Highlight = styled.span`
  position: absolute;
  inset: -4px;
`;

export const Interactive = () => {
  const theme = useTheme();

  const [dxRed, setDxRed] = React.useState(2);
  const [dyRed, setDyRed] = React.useState(2);

  const [dxCyan, setDxCyan] = React.useState(-2);
  const [dyCyan, setDyCyan] = React.useState(-2);

  const [clipSource, setClipSource] = React.useState(false);

  const [debugMode, setDebugMode] = React.useState(false);

  const codeRef = React.useRef<null | HTMLElement>(null);

  const onCopySVGcode = () => {
    if (codeRef.current) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(codeRef.current);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy");
      selection.removeAllRanges();
    }
  };

  return (
    <div>
      <svg width="0" height="0">
        <filter id={filterId}>
          <feOffset
            in="SourceGraphic"
            dx={dxRed}
            dy={dyRed}
            result="layer-one"
          />
          <feComponentTransfer in="layer-one" result="red">
            <feFuncR type="identity" />
            <feFuncG type="discrete" tableValues="0" />
            <feFuncB type="discrete" tableValues="0" />
          </feComponentTransfer>

          <feOffset
            in="SourceGraphic"
            dx={dxCyan}
            dy={dyCyan}
            result="layer-two"
          />
          <feComponentTransfer in="layer-two" result="cyan">
            <feFuncR type="discrete" tableValues="0" />
            <feFuncG type="identity" />
            <feFuncB type="identity" />
          </feComponentTransfer>

          <feBlend in="red" in2="cyan" mode="screen" result="color-split" />
          {clipSource ? (
            <feComposite in="color-split" in2="SourceGraphic" operator="in" />
          ) : (
            false
          )}
        </filter>
      </svg>

      <RGBSplitEditorWrapper>
        <Frame style={{ width: "100%", zIndex: 1 }}>
          <HStack p={16} alignItems="center" justifyContent="space-between">
            <GeneratorLogo />
            <Button
              square
              size="lg"
              active={debugMode}
              onClick={() => setDebugMode((state) => !state)}
              aria-label="Toggle debug mode"
              title="Toggle debug mode"
            >
              <Image
                src={BulbIcon}
                width={24}
                height={24}
                alt="Light bulb icon"
                style={{
                  imageRendering: "pixelated",
                }}
              />
            </Button>
          </HStack>
        </Frame>
        <VStack>
          <div style={{ position: "relative" }}>
            <HStack
              p={32}
              alignItems="center"
              justifyContent="center"
              style={{ position: "relative" }}
            >
              <Image
                src={ProfilePic}
                alt="Danish Haroon"
                style={{
                  filter: `url(#${filterId})`,
                  maxWidth: "100%",
                  height: "auto",
                  transform: "translateZ(0)",
                }}
              />
            </HStack>

            <Frame
              style={{
                position: "absolute",
                top: -2,
                bottom: -2,
                left: 0,
                right: 0,
                opacity: debugMode ? "1" : "0",
                pointerEvents: debugMode ? "auto" : "none",
              }}
              variant="well"
            >
              <code
                ref={codeRef}
                style={{
                  display: "block",
                  whiteSpace: "pre",
                  fontSize: 12,
                  padding: 16,
                  height: "100%",
                  width: "100%",
                  overflow: "auto",
                }}
              >
                {`<svg width="0" height="0">
  <filter id="`}
                {filterId}
                {`">
    <feOffset in="SourceGraphic" dx="`}
                <HighlightChange key={`dxRed-${dxRed}`}>
                  {dxRed}
                </HighlightChange>
                {`" dy="`}
                <HighlightChange key={`dyRed-${dyRed}`}>
                  {dyRed}
                </HighlightChange>
                {`" result="layer-one" />
    <feComponentTransfer in="layer-one" result="red">
        <feFuncR type="identity" />
        <feFuncG type="discrete" tableValues="0" />
        <feFuncB type="discrete" tableValues="0" />
    </feComponentTransfer>
    <feOffset in="SourceGraphic" dx="`}
                <HighlightChange key={`dxCyan-${dxCyan}`}>
                  {dxCyan}
                </HighlightChange>
                {`" dy="`}
                <HighlightChange key={`dyCyan-${dyCyan}`}>
                  {dyCyan}
                </HighlightChange>
                {`" result="layer-two" />
    <feComponentTransfer in="layer-two" result="cyan">
        <feFuncR type="discrete" tableValues="0" />
        <feFuncG type="identity" />
        <feFuncB type="identity" />
    </feComponentTransfer>
    <feBlend in="red" in2="cyan" mode="screen" result="color-split" />
    `}
                <HighlightChange key={`clipSource-${clipSource}`}>
                  {clipSource
                    ? `<feComposite in="color-split" in2="SourceGraphic" operator="in" />`
                    : ""}
                </HighlightChange>
                {`
  </filter>
</svg>
`}
              </code>
            </Frame>
          </div>
          <Frame>
            <VStack gap={16} p={16}>
              <HStack
                gap={16}
                alignItems="center"
                justifyContent="space-between"
              >
                <HStack alignItems="center" gap={8}>
                  <ColorPreview color="red" />
                  <span>
                    <strong>Red</strong>
                  </span>
                </HStack>
                <HStack gap={16}>
                  <HStack gap={8} alignItems="center">
                    <span>dx</span>
                    <NumberInput
                      value={dxRed}
                      onChange={setDxRed}
                      width={76}
                      aria-label="Red layer dx"
                    />
                  </HStack>
                  <HStack gap={8} alignItems="center">
                    <span>dy</span>
                    <NumberInput
                      value={dyRed}
                      onChange={setDyRed}
                      width={76}
                      aria-label="Red layer dy"
                    />
                  </HStack>
                </HStack>
              </HStack>
              <HStack
                gap={16}
                alignItems="center"
                justifyContent="space-between"
              >
                <HStack alignItems="center" gap={8}>
                  <ColorPreview color="cyan" />
                  <span>
                    <strong>Cyan</strong>
                  </span>
                </HStack>
                <HStack gap={16}>
                  <HStack gap={8} alignItems="center">
                    <span>dx</span>
                    <NumberInput
                      value={dxCyan}
                      onChange={setDxCyan}
                      width={76}
                      aria-label="Cyan layer dx"
                    />
                  </HStack>
                  <HStack gap={8} alignItems="center">
                    <span>dy</span>
                    <NumberInput
                      value={dyCyan}
                      onChange={setDyCyan}
                      width={76}
                      aria-label="Cyan layer dy"
                    />
                  </HStack>
                </HStack>
              </HStack>
              <Separator />
              <HStack justifyContent="space-between" alignItems="center">
                <Checkbox
                  label="Overflow hidden"
                  checked={clipSource}
                  onChange={() => setClipSource((state) => !state)}
                />
                <HStack gap={4}>
                  <Button
                    style={{ whiteSpace: "nowrap" }}
                    size="lg"
                    onClick={() =>
                      copy(
                        generateInlineCSS({
                          dxRed,
                          dyRed,
                          dxCyan,
                          dyCyan,
                          clipSource,
                        })
                      )
                    }
                  >
                    Copy inline filter
                  </Button>
                  <Button
                    style={{ whiteSpace: "nowrap" }}
                    size="lg"
                    primary
                    onClick={onCopySVGcode}
                  >
                    Copy SVG
                  </Button>
                </HStack>
              </HStack>
            </VStack>
          </Frame>
        </VStack>
      </RGBSplitEditorWrapper>
    </div>
  );
};

const DemoButton = () => {
  const [filterEnabled, setFilterEnabled] = React.useState(false);

  React.useEffect(() => {
    if (filterEnabled) {
      document.body.style.filter = `url(#${filterId})`;
      document.body.style.transform = `translateZ(0)`;
    } else {
      document.body.style.filter = ``;
      document.body.style.transform = ``;
    }

    return () => {
      document.body.style.filter = ``;
      document.body.style.transform = ``;
    };
  }, [filterEnabled]);
  return (
    <HStack fullWidth justifyContent="center" mb={32} mt={32}>
      <Button
        active={filterEnabled}
        size="lg"
        variant="raised"
        style={{ minWidth: 120, fontWeight: "bold" }}
        onClick={() => setFilterEnabled((state) => !state)}
        primary
      >
        Try it out !
      </Button>
    </HStack>
  );
};

const RGBSplitDemo = {
  DemoButton,
  Interactive,
};

export default RGBSplitDemo;
