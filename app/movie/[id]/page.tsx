import Head from "next/head";
import React from "react";
import CinemiqLayout from "../../../components/CinemiqLayout";
import dynamic from "next/dynamic";

const CinemiqMovieDetails = dynamic(() => import("../../../components/CinemiqMovieDetails"), { ssr: false });

type Params = { params: { id: string } };

export default function Page({ params }: Params) {
  const id = Number(params.id);

  return (
    <>
      <Head>
        <title>Cinemiq — Movie {params.id}</title>
      </Head>

      <CinemiqLayout>
        <div className="py-6">
          <CinemiqMovieDetails id={id} />
        </div>
      </CinemiqLayout>
    </>
  );
}
