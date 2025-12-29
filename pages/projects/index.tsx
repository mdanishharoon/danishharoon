import { GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Separator } from "react95";
import eggplant from "react95/dist/themes/eggplant";
import { ThemeProvider } from "styled-components";
import { Center, Grid, Normal } from "../../components/Layout";
import { HStack, VStack } from "../../components/UI/Stack";
import T from "../../components/UI/Typography";
import Head from "next/head";
import { getSortedPosts } from "../../utils/mdxUtils";

const filterOptions = ["All", "Past", "Present"] as const;
type FilterOption = (typeof filterOptions)[number];

interface Project {
    frontmatter: {
        title: string;
        subtitle?: string;
        period: string;
        status: string;
        tags: string[];
        abstract: string;
        isPublished: boolean;
        publishedOn: string;
    };
    slug: string;
}

const ProjectCard = ({
    title,
    subtitle,
    period,
    abstract,
    slug,
    tags,
}: {
    title: string;
    subtitle?: string;
    period: string;
    abstract: string;
    slug: string;
    tags: string[];
}) => {
    return (
        <VStack as="article" gap={20} pt={32} pb={32}>
            <VStack gap={4}>
                <Link href={`/projects/${slug}`}>
                    <T.H2 color="anchor" style={{ textDecoration: "underline" }}>
                        {title}
                    </T.H2>
                </Link>
                <HStack>
                    <T.BodySmall color="materialTextDisabled">
                        <span>{period}</span>
                        {subtitle && ` • ${subtitle}`}
                    </T.BodySmall>
                </HStack>
                <HStack gap={4} style={{ flexWrap: "wrap", marginTop: 8 }}>
                    {tags.map((tag) => (
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
            </VStack>
            <T.Body>{abstract}</T.Body>
        </VStack>
    );
};

const Projects = ({ projects }: { projects: Project[] }) => {
    const { filter } = useRouter().query;
    const router = useRouter();

    const currentFilter = (filter as FilterOption) || "All";

    const filteredProjects =
        currentFilter === "All"
            ? projects
            : projects.filter((p) => p.frontmatter.status === currentFilter);

    return (
        <>
            <Head>
                <title>Projects | Danish Haroon</title>
                <meta property="og:type" content="website" />
                <meta property="og:image:width" content="1280" />
                <meta property="og:image:height" content="675" />
                <meta name="og:title" content={"Projects | Danish Haroon"} />
                <meta
                    name="og:description"
                    content={"figuring out the edges of whats possible"}
                />
                <meta name="twitter:title" content={"Danish Haroon"} />
                <meta
                    name="twitter:description"
                    content={"figuring out the edges of whats possible"}
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:creator" content="@danishhharoon" />
            </Head>
            <Center>
                <Grid>
                    <Normal>
                        <VStack mt={96} mb={96}>
                            <HStack justifyContent={"space-between"} alignItems="baseline">
                                <T.H1>Projects</T.H1>
                                <T.BodyLarge>{filteredProjects.length} Projects</T.BodyLarge>
                            </HStack>
                            <HStack mt={16} gap={4}>
                                <ThemeProvider theme={eggplant}>
                                    {filterOptions.map((option) => (
                                        <Button
                                            key={option}
                                            variant="raised"
                                            active={currentFilter === option}
                                            onClick={() =>
                                                router.push(
                                                    option === "All"
                                                        ? `/projects`
                                                        : `/projects?filter=${option}`
                                                )
                                            }
                                        >
                                            {option}
                                        </Button>
                                    ))}
                                </ThemeProvider>
                            </HStack>
                            <VStack as="ul" mt={48}>
                                {filteredProjects.length > 0 ? (
                                    filteredProjects.map((project) => (
                                        <li key={project.slug}>
                                            <ProjectCard
                                                slug={project.slug}
                                                title={project.frontmatter.title}
                                                subtitle={project.frontmatter.subtitle}
                                                period={project.frontmatter.period}
                                                abstract={project.frontmatter.abstract}
                                                tags={project.frontmatter.tags}
                                            />
                                            <Separator />
                                        </li>
                                    ))
                                ) : (
                                    <T.Body color="materialTextDisabled">
                                        No projects in this category yet.
                                    </T.Body>
                                )}
                            </VStack>
                        </VStack>
                    </Normal>
                </Grid>
            </Center>
        </>
    );
};

export default Projects;

export const getStaticProps: GetStaticProps<{ projects: Project[] }> =
    async () => {
        const projects = getSortedPosts("Toy") as unknown as Project[];

        return {
            props: {
                projects,
            },
        };
    };
