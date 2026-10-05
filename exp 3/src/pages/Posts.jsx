import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Posts() {
  const {
    user,
    hasPermission
  } = useAuth();

  const navigate = useNavigate();

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      content:
        "This is a sample post for Experiment 3."
    },
    {
      id: 2,
      title: "JWT Authentication",
      content:
        "JWT provides token-based authentication."
    }
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function createPost() {
    if (!title || !content) return;

    const newPost = {
      id: Date.now(),
      title,
      content
    };

    setPosts([...posts, newPost]);

    setTitle("");
    setContent("");
  }

  function editPost(id) {
    const newTitle = prompt(
      "Enter new post title:"
    );

    if (!newTitle) return;

    setPosts(
      posts.map((post) =>
        post.id === id
          ? {
              ...post,
              title: newTitle
            }
          : post
      )
    );
  }

  function deletePost(id) {
    setPosts(
      posts.filter(
        (post) => post.id !== id
      )
    );
  }

  return (
    <div className="dashboard">
      <header className="header">
        <div>
          <h1>Posts</h1>
          <p>
            Logged in as {user?.role}
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/dashboard")
          }
        >
          Dashboard
        </button>
      </header>

      <main className="content">
        {hasPermission("create") && (
          <section className="card">
            <h2>Create New Post</h2>

            <input
              className="post-input"
              placeholder="Post title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            <textarea
              className="post-input"
              placeholder="Post content"
              value={content}
              onChange={(e) =>
                setContent(e.target.value)
              }
            />

            <button onClick={createPost}>
              Create Post
            </button>
          </section>
        )}

        <section className="card">
          <h2>All Posts</h2>

          {posts.map((post) => (
            <div
              className="post"
              key={post.id}
            >
              <h3>{post.title}</h3>

              <p>{post.content}</p>

              <div className="post-actions">
                {hasPermission("edit") && (
                  <button
                    onClick={() =>
                      editPost(post.id)
                    }
                  >
                    Edit
                  </button>
                )}

                {hasPermission("delete") && (
                  <button
                    onClick={() =>
                      deletePost(post.id)
                    }
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}