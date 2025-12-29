import fs from "fs";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import path from "path";
import { Separator } from "react95";
import { createHatchedBackground } from "react95/dist/common";
import styled from "styled-components";
import { Center, Grid, Normal } from "../../components/Layout";
import CTAButton from "../../components/UI/CTAButton";
import Code from "../../components/UI/Code";
import { HStack } from "../../components/UI/Stack";
import T from "../../components/UI/Typography";
import { TOYS_PATH, toysFilePaths } from "../../utils/mdxUtils";

const h1 = styled(T.H1)`
  margin-top: 3rem;
  margin-bottom: 2rem;
`;
const h2 = styled(T.H2)`
  margin-top: 3rem;
  margin-bottom: 2rem;
`;
const p = styled(T.Body)`
  margin-bottom: 1.5rem;
`;

const ul = styled.ul`
  list-style-type: disc;
  margin-bottom: 1.5rem;
`;
const li = styled(T.Body.withComponent("li"))`
  list-style-type: disc;
  margin-bottom: 1rem;
  margin-inline-start: 2em;
  b,
  strong {
    font-weight: bold;
  }
  list-style-type: square;
`;

export const components = {
    h1: h1,
    h2: h2,
    p: p,
    code: Code,
    ul,
    li,
};

const Warning = styled.div`
  font-family: arial;
  padding: 1em 1.5em;
  font-size: 16px;
  line-height: 1.75;
  position: relative;
  border-radius: 8px;
  border: 2px solid ${(p) => p.theme.borderDarkest};
  background: ${(p) => p.theme.tooltip};

  &::before {
    content: "";
    z-index: -1;
    position: absolute;
    inset: 0;
    border-radius: inherit;
    ${createHatchedBackground({})};
    transform: translate(8px, 8px);
  }

  margin-bottom: 40px;

  b,
  strong {
    font-weight: bold;
  }
  a {
    color: ${(p) => p.theme.anchor};
    text-decoration: underline;
  }
  p {
    margin-bottom: 0;
  }
`;

const renderers = {
    CTAButton,
    T,
    Warning,
    Separator,
    ...components,
};

export default function ProjectPage({ source, frontMatter }) {
    return (
        <>
            <Head>
                <title>{frontMatter.seoTitle || frontMatter.title}</title>
                <meta property="og:title" content={frontMatter.title} />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:creator" content="@danishhharoon" />
                <meta name="theme-color" content="#c6c6c6" />
                <meta name="description" content={frontMatter.abstract} />
                <meta property="og:description" content={frontMatter.abstract} />
                <meta name="twitter:title" content={frontMatter.title} />
                <meta name="twitter:description" content={frontMatter.abstract} />
            </Head>
            <Center>
                <Article>
                    <Grid>
                        <Normal>
                            <T.H1>{frontMatter.title}</T.H1>
                            {frontMatter.subtitle && (
                                <T.H2 style={{ marginTop: 8, marginBottom: 8 }}>
                                    {frontMatter.subtitle}
                                </T.H2>
                            )}
                            <T.Body color="materialTextDisabled" as="span">
                                {frontMatter.period || frontMatter.publishedOn}
                            </T.Body>
                            {frontMatter.tags && (
                                <HStack gap={4} style={{ flexWrap: "wrap", marginTop: 16 }}>
                                    {frontMatter.tags.map((tag: string) => (
                                        <T.BodySmall
                                            key={tag}
                                            style={{
                                                background: "#c0c0c0",
                                                padding: "2px 8px",
                                                border: "1px solid #808080",
                                            }}
                                        >
                                            {tag}
                                        </T.BodySmall>
                                    ))}
                                </HStack>
                            )}
                            <ContentWrapper>
                                <MDXRemote {...source} components={renderers} />
                            </ContentWrapper>
                        </Normal>
                    </Grid>
                </Article>
            </Center>
        </>
    );
}

export const getStaticProps = async ({ params }) => {
    const postFilePath = path.join(TOYS_PATH, `${params.slug}.mdx`);
    const source = fs.readFileSync(postFilePath);

    const { content, data } = matter(source);

    const mdxSource = await serialize(content, {
        mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [],
        },
        scope: data,
    });

    return {
        props: {
            source: mdxSource,
            frontMatter: {
                ...data,
                publishedOn: new Date(data.publishedOn).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }),
            },
        },
    };
};

export const getStaticPaths = async () => {
    const paths = toysFilePaths
        .map((path) => path.replace(/\.mdx?$/, ""))
        .map((slug) => ({ params: { slug } }));

    return {
        paths,
        fallback: false,
    };
};

const Article = styled.article`
  padding: 96px 0px;
`;

const ContentWrapper = styled.div`
  margin-top: 48px;
`;
