import Head from "next/head";
import React from "react";
import CinemiqLayout from "../../../components/CinemiqLayout";
import dynamic from "next/dynamic";
import styled from "styled-components";

import CinemiqMovieDetails from "../../../components/CinemiqMovieDetails";

const DetailWrapper = styled.div`
  padding: 20px 0;
`;

type Params = { params: { id: string } | Promise<{ id: string }> };

export default async function Page({ params }: Params) {
  const resolved = await params;
  const id = Number(resolved.id);

  return (
    <>
      <Head>
        <title>Cinemiq — Movie {params.id}</title>
      </Head>

      <CinemiqLayout>
        <DetailWrapper>
          <CinemiqMovieDetails id={id} />
        </DetailWrapper>
      </CinemiqLayout>
    </>
  );
}
