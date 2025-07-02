// RedditPostList.jsx
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectPosts } from "../redditApIComp/redditSlice";
import "../RedditPostComponent/redditPostStyles.css"; // Importing styles for RedditPostList
import LikesOrDislikes from "../EngagementComponent/likesOrDislikes";

const RedditPostList = () => {
  const posts = useSelector(selectPosts);

  return (
    <div className="cards-area">
      {posts.slice(0, 6).map((post) => (
        <div key={post.id} className="card">
          <ul className="card-list">
            <li className="card-header">
              <h3 className="card-title">{post.title}</h3>
            </li>
            <li className="card-content">
              {post.media?.reddit_video?.fallback_url ? (
                <span className="card-gif">
                  <video
                    controls
                    src={post.media.reddit_video.fallback_url}
                    className="gif"
                  />
                </span>
              ) : post.preview?.reddit_video_preview?.fallback_url ? (
                <span className="card-video">
                  <video
                    controls
                    loop
                    autoPlay
                    muted
                    src={post.preview.reddit_video_preview.fallback_url}
                    className="video"
                  />
                </span>
              ) : post.selftext ? (
                <span className="card-text">
                  <p className="card-content">{post.selftext}</p>
                </span>
              ) : post.thumbnail.startsWith("https") ? (
                <span className="card-image-wrapper">
                  <img src={post.thumbnail} alt="" className="image" />
                </span>
              ) : null}
            </li>
            <li className="card-footer">
              <p className="card-footer-text">
                Posted by <b>{post.author}</b> in{" "}
                <b>{post.subreddit_name_prefixed}</b>
              </p>
            </li>
          </ul>

          <a
            className="card-footer"
            href={`https://reddit.com${post.permalink}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Reddit
          </a>

          <LikesOrDislikes postId={post.id} />
        </div>
      ))}
    </div>
  );
};

export default RedditPostList;
