import React, { Suspense } from 'react';
import CreateEventClient from './CreatedEventClient';
// export const dynamic = 'force-dynamic';

const CreatedEventPage = () => {
      return (
            <div>
                  <Suspense fallback={<p>loading...</p>}>
                        <CreateEventClient></CreateEventClient>
                  </Suspense>
            </div>
      );
};

export default CreatedEventPage;