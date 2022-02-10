import React, { useEffect } from 'react';

function Index({ history }) {
  useEffect(() => {
    history.replace('/analysis');
  }, []);

  return <div />;
}

export default Index;
