import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, selectAllPosts } from "./postsSlice";
import { TableData } from "./TableData";

export const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const isLoading = useSelector((state) => state.posts.isLoading);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (isLoading) {
    return <div className="spinner-border" role="status"></div>;
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="row">
          <div className="col-12 text-container">
            <h3>Messages</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {posts.map((post) => (
              <TableData key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
