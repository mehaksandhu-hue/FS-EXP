import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  saveDraft,
  publishPost,
  publishDraft,
  deleteDraft,
} from "./features/posts/postSlice";
import {
  selectDrafts,
  selectPublishedPosts,
  totalDrafts,
  totalPublished,
} from "./features/posts/selectors";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  const drafts = useSelector(selectDrafts);
  const published = useSelector(selectPublishedPosts);

  const draftCount = useSelector(totalDrafts);
  const publishedCount = useSelector(totalPublished);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [platform, setPlatform] = useState("Twitter");

  const clearFields = () => {
    setTitle("");
    setContent("");
    setPlatform("Twitter");
  };

  const handleSaveDraft = () => {
    if (!title || !content) {
      alert("Please fill all fields");
      return;
    }

    dispatch(
      saveDraft({
        title,
        content,
        platform,
      })
    );

    clearFields();
  };

  const handlePublish = () => {
    if (!title || !content) {
      alert("Please fill all fields");
      return;
    }

    dispatch(
      publishPost({
        title,
        content,
        platform,
      })
    );

    clearFields();
  };

  return (
    <div className="container">
      <h1>Social Media Post Manager</h1>

      <input
        type="text"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Write your post..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      >
        <option>Twitter</option>
        <option>Instagram</option>
        <option>Facebook</option>
        <option>LinkedIn</option>
      </select>

      <div className="buttons">
        <button onClick={handleSaveDraft}>Save Draft</button>
        <button onClick={handlePublish}>Publish</button>
      </div>

      <div className="stats">
        <h3>Drafts : {draftCount}</h3>
        <h3>Published : {publishedCount}</h3>
      </div>

      <div className="section">
        <h2>Draft Posts</h2>

        {drafts.length === 0 ? (
          <p>No Drafts Available</p>
        ) : (
          drafts.map((post) => (
            <div className="card" key={post.id}>
              <h3>{post.title}</h3>

              <p>{post.content}</p>

              <small>{post.platform}</small>

              <div className="buttons">
                <button
                  onClick={() => dispatch(publishDraft(post.id))}
                >
                  Publish
                </button>

                <button
                  onClick={() => dispatch(deleteDraft(post.id))}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="section">
        <h2>Published Posts</h2>

        {published.length === 0 ? (
          <p>No Published Posts</p>
        ) : (
          published.map((post) => (
            <div className="card" key={post.id}>
              <h3>{post.title}</h3>

              <p>{post.content}</p>

              <small>{post.platform}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
