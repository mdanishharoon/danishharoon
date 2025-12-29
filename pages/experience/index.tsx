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

interface Experience {
    frontmatter: {
        title: string;
        role?: string;
        period: string;
        status: string;
        tags: string[];
        abstract: string;
        isPublished: boolean;
        publishedOn: string;
    };
    slug: string;
}

const ExperienceCard = ({
    title,
    role,
    period,
    abstract,
    slug,
    tags,
}: {
    title: string;
    role?: string;
    period: string;
    abstract: string;
    slug: string;
    tags: string[];
}) => {
    return (
        <VStack as="article" gap={20} pt={32} pb={32}>
            <VStack gap={4}>
                <Link href={`/experience/${slug}`}>
                    <T.H2 color="anchor" style={{ textDecoration: "underline" }}>
                        {title}
                    </T.H2>
                </Link>
                <HStack>
                    <T.BodySmall color="materialTextDisabled">
                        {role && <span>{role} • </span>}
                        <span>{period}</span>
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

const Experience = ({ experiences }: { experiences: Experience[] }) => {
    const { filter } = useRouter().query;
    const router = useRouter();

    const currentFilter = (filter as FilterOption) || "All";

    const filteredExperiences =
        currentFilter === "All"
            ? experiences
            : experiences.filter((e) => e.frontmatter.status === currentFilter);

    return (
        <>
            <Head>
                <title>Experience | Danish Haroon</title>
                <meta property="og:type" content="website" />
                <meta property="og:image:width" content="1280" />
                <meta property="og:image:height" content="675" />
                <meta name="og:title" content={"Experience | Danish Haroon"} />
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
                                <T.H1>Experience</T.H1>
                                <T.BodyLarge>
                                    {filteredExperiences.length} Entries
                                </T.BodyLarge>
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
                                                        ? `/experience`
                                                        : `/experience?filter=${option}`
                                                )
                                            }
                                        >
                                            {option}
                                        </Button>
                                    ))}
                                </ThemeProvider>
                            </HStack>
                            <VStack as="ul" mt={48}>
                                {filteredExperiences.length > 0 ? (
                                    filteredExperiences.map((exp) => (
                                        <li key={exp.slug}>
                                            <ExperienceCard
                                                slug={exp.slug}
                                                title={exp.frontmatter.title}
                                                role={exp.frontmatter.role}
                                                period={exp.frontmatter.period}
                                                abstract={exp.frontmatter.abstract}
                                                tags={exp.frontmatter.tags}
                                            />
                                            <Separator />
                                        </li>
                                    ))
                                ) : (
                                    <T.Body color="materialTextDisabled">
                                        No experience entries in this category yet.
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

export default Experience;

export const getStaticProps: GetStaticProps<{
    experiences: Experience[];
}> = async () => {
    const experiences = getSortedPosts("Article") as unknown as Experience[];

    return {
        props: {
            experiences,
        },
    };
};
