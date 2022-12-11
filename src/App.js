import * as React from "react";

// import './App.css';

import blog from './blogs/2022/看门狗.md'

import ReactMarkdown from 'react-markdown';


function App() {
  let [readable, setReadable] = React.useState({ md: "" });

  React.useEffect(() => {
    fetch(blog)
      .then((res) => res.text())
      .then((md) => {
        setReadable({ md });
      });
  }, []);


  return (
    <div className="App">
      
      
      <ReactMarkdown># Hello, *world*!</ReactMarkdown>
      <ReactMarkdown children={readable.md} />
      {/* {console.log('blog')} */}
    </div>
  );
}

export default App;
