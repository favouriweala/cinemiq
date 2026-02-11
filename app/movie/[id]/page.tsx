import Head from "next/head";
import React from "react";
import CinemiqLayout from "../../../components/CinemiqLayout";
import dynamic from "next/dynamic";
import styled from "styled-components";

const CinemiqMovieDetails = dynamic(() => import("../../../components/CinemiqMovieDetails"), { ssr: false });

const DetailWrapper = styled.div`
  padding: 20px 0;
`;

type Params = { params: { id: string } };

export default function Page({ params }: Params) {
  const id = Number(params.id);

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
