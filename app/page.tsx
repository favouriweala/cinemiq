import Head from "next/head";
import CinemiqLayout from "../components/CinemiqLayout";
import CinemiqMovieCard from "../components/CinemiqMovieCard";
import { fetchCinemiqTrending, fetchCinemiqTopRated } from "../lib/cinemiq";
import styled from "styled-components";

// style: make grid responsive with styled-components (mobile-first)
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Section = styled.section`
  margin-bottom: 48px;

  @media (min-width: 640px) {
    margin-bottom: 56px;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  justify-items: center;

  @media (min-width: 640px) { grid-template-columns: repeat(2, minmax(0,1fr)); }
  @media (min-width: 900px) { grid-template-columns: repeat(3, minmax(0,1fr)); }
  @media (min-width: 1200px) { grid-template-columns: repeat(4, minmax(0,1fr)); }
`;

const ErrorMessage = styled.div`
  padding: 4rem 0;
  text-align: center;
  color: #ff7b7b;
  font-weight: 600;
`;

const LoadingMessage = styled.div`
  padding: 4rem 0;
  text-align: center;
  color: #9fb0c8;
  font-weight: 500;
`;

async function TrendingSection() {
  try {
    const movies = await fetchCinemiqTrending();

    return (
      <Section>
        <Title>🔥 Trending Now</Title>
        {movies.length === 0 ? (
          <LoadingMessage>No trending movies found</LoadingMessage>
        ) : (
          <Grid>
            {movies.map((m) => (
              <CinemiqMovieCard key={m.id} movie={m} />
            ))}
          </Grid>
        )}
      </Section>
    );
  } catch (err: any) {
    return (
      <ErrorMessage>Error loading trending movies: {String(err?.message ?? err)}</ErrorMessage>
    );
  }
}

async function TopRatedSection() {
  try {
    const movies = await fetchCinemiqTopRated();

    return (
      <Section>
        <Title>⭐ Top Rated</Title>
        {movies.length === 0 ? (
          <LoadingMessage>No top-rated movies found</LoadingMessage>
        ) : (
          <Grid>
            {movies.map((m) => (
              <CinemiqMovieCard key={m.id} movie={m} />
            ))}
          </Grid>
        )}
      </Section>
    );
  } catch (err: any) {
    return (
      <ErrorMessage>Error loading top-rated movies: {String(err?.message ?? err)}</ErrorMessage>
    );
  }
}

export default function Page() {
  return (
    <>
      <Head>
        <title>Cinemiq – Movies</title>
      </Head>

      <CinemiqLayout>
        <PageContainer>
          <TrendingSection />
          <TopRatedSection />
        </PageContainer>
      </CinemiqLayout>
    </>
  );
}

