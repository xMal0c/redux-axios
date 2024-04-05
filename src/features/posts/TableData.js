import { deletePost } from "./postsSlice";
import { useDispatch } from "react-redux";

export const TableData = ({ post }) => {
  const { id } = post;
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deletePost({ id }));
  };

  return (
    <div className="item shadow-sm p-4 m-4 rounded-2">
      <div>
        <h3>{post.title}</h3>
        <p className="postCredit">{post.body}</p>
      </div>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
