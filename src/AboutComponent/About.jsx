import React from "react";
import BottomBar from "../BottomComponent/BottomBar";

const About = () => {
  return (
    <div>
      <h1>About This Reddit Clone</h1>
      <p>
        This is a simple Reddit clone built using React and Redux. It allows
        users to view posts from various subreddits, and explore subreddit
        content.
      </p>
      <p>
        The application fetches data from the Reddit API and displays it in a
        user-friendly format. Users can navigate through different subreddits
        and see the latest posts.
      </p>
      <p>
        Certain images will not be displayed | Certain text that are too large
        can be hovered over to display{" "}
      </p>
      <BottomBar />
    </div>
  );
};

export default About;
