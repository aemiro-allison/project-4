import React from 'react';
import './Page.css';

function Page(props) {
  return (
    <main className="page">
      { props.children }
    </main>
  );
}

export default Page;
