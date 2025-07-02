import Post from "../PostComp/Post";

const Home = () => {
  return (
    <div className="home">
      <h1 className="home-text">Welcome to the Reddit Clone 1.0 </h1>
      <Post postIndex={0} />
    </div>
  );
};

export default Home;
