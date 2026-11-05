import React, { Suspense } from 'react';
import SingleEventClient from './SingleEventClient';

const SingleEventContent = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <SingleEventClient id={id}></SingleEventClient>
  );
};

const SingleEventPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => (
  <Suspense fallback={<p>loading...</p>}>
    <SingleEventContent params={params} />
  </Suspense>
);

export default SingleEventPage;