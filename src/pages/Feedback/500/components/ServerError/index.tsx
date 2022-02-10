import * as React from 'react';
import Exception from './components/Exception';

export default function ServerError() {
  return (
    <Exception
      description="服务器好像挂了你要等会了"
      image="https://img.alicdn.com/tfs/TB1RRSUoET1gK0jSZFrXXcNCXXa-200-200.png"
      statusCode="500"
    />
  );
}
