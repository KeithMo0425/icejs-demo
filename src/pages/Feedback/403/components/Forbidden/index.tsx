import * as React from 'react';
import Exception from './components/Exception';

export default function Forbidden() {
  return (
    <Exception
      description="服务器好像挂了你要等会了"
      image="https://img.alicdn.com/tfs/TB11TaSopY7gK0jSZKzXXaikpXa-200-200.png"
      statusCode="403"
    />
  );
}
