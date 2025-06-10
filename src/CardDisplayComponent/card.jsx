import React, { useState } from "react";

const card = () => {
  const [content, setContent] = useState([{}]);
  const [clicked, setClicked] = useState(true);
  const handleChangeContent = () => {
    setContent([]);
  };
  const handleClickContent = () => {
    setClicked(!clicked);
  };

  return (
    <div>
      <h1>{content.title}</h1>
      {clicked ? (
        <>
          <img
            src={content.image}
            alt="Card Image"
            onClick={handleClickContent}
          />
        </>
      ) : (
        <>
          <p>{content.description}</p>
        </>
      )}
      <button onClick={handleChangeContent}>Change Content</button>
      card
    </div>
  );
};

export default card;
