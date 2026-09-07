import { useCallback, useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const initialPosts = [
  {
    id: "1",
    title: "Instagram Post",
    platform: "Instagram",
    date: "2026-08-20",
  },
  {
    id: "2",
    title: "LinkedIn Post",
    platform: "LinkedIn",
    date: "2026-08-22",
  },
  {
    id: "3",
    title: "Facebook Post",
    platform: "Facebook",
    date: "2026-08-25",
  },
];

function App() {
  const [posts, setPosts] = useState(initialPosts);

  const [optimized, setOptimized] = useState(true);

  const [form, setForm] = useState({
    title: "",
    platform: "Instagram",
    date: "",
  });

  const [showForm, setShowForm] = useState(false);

  // Convert posts into calendar events
  const events = useMemo(() => {
    if (!optimized) {
      return [];
    }

    return posts.map((post) => ({
      id: post.id,
      title: `${post.platform}: ${post.title}`,
      start: post.date,
      allDay: true,
    }));
  }, [posts, optimized]);

  // Add a new post
  const addPost = useCallback(
    (e) => {
      e.preventDefault();

      if (!form.title || !form.date) {
        alert("Please enter post title and date.");
        return;
      }

      const newPost = {
        id: Date.now().toString(),
        title: form.title,
        platform: form.platform,
        date: form.date,
      };

      setPosts((prev) => [...prev, newPost]);

      setForm({
        title: "",
        platform: "Instagram",
        date: "",
      });

      setShowForm(false);
    },
    [form]
  );

  // Drag and drop rescheduling
  const handleEventDrop = useCallback((info) => {
    const newDate = info.event.startStr;

    setPosts((prev) =>
      prev.map((post) =>
        post.id === info.event.id
          ? { ...post, date: newDate }
          : post
      )
    );
  }, []);

  // Delete a post
  const deletePost = useCallback(() => {
    const id = prompt("Enter Post ID to delete:");

    if (!id) return;

    setPosts((prev) =>
      prev.filter((post) => post.id !== id)
    );
  }, []);

  // Statistics
  const statistics = useMemo(() => {
    return {
      total: posts.length,
      instagram: posts.filter(
        (p) => p.platform === "Instagram"
      ).length,
      linkedin: posts.filter(
        (p) => p.platform === "LinkedIn"
      ).length,
      facebook: posts.filter(
        (p) => p.platform === "Facebook"
      ).length,
    };
  }, [posts]);

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <div>
          <h1>📅 Social Media Post Scheduler</h1>
          <p>
            Plan, schedule and reschedule your social media content
          </p>
        </div>

        <div className="header-buttons">
          <button
            className="optimization-button"
            onClick={() => setOptimized((prev) => !prev)}
          >
            {optimized ? "🟢 Optimized" : "⚪ Non-Optimized"}
          </button>

          <button
            className="add-button"
            onClick={() => setShowForm(true)}
          >
            + Add Post
          </button>
        </div>
      </header>

      {/* OPTIMIZATION STATUS */}
      <section className="optimization-card">
        <div>
          <h2>
            {optimized
              ? "Optimized Calendar"
              : "Non-Optimized Calendar"}
          </h2>

          <p>
            {optimized
              ? "Posts are displayed using optimized rendering."
              : "Optimization is OFF. Posts are hidden."}
          </p>
        </div>

        <button
          className="toggle-button"
          onClick={() => setOptimized((prev) => !prev)}
        >
          {optimized ? "Turn OFF" : "Turn ON"}
        </button>
      </section>

      {/* ADD POST FORM */}
      {showForm && (
        <div className="form-card">
          <h2>Create New Post</h2>

          <form onSubmit={addPost}>

            <input
              type="text"
              placeholder="Enter post title"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
            />

            <select
              value={form.platform}
              onChange={(e) =>
                setForm({
                  ...form,
                  platform: e.target.value,
                })
              }
            >
              <option>Instagram</option>
              <option>LinkedIn</option>
              <option>Facebook</option>
            </select>

            <input
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({
                  ...form,
                  date: e.target.value,
                })
              }
            />

            <div className="form-buttons">

              <button
                type="submit"
                className="save-button"
              >
                Add Post
              </button>

              <button
                type="button"
                className="cancel-button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

            </div>
          </form>
        </div>
      )}

      {/* STATISTICS */}
      <section className="stats">

        <div className="stat-card">
          <span>Total Posts</span>
          <strong>
            {optimized ? statistics.total : 0}
          </strong>
        </div>

        <div className="stat-card">
          <span>Instagram</span>
          <strong>
            {optimized ? statistics.instagram : 0}
          </strong>
        </div>

        <div className="stat-card">
          <span>LinkedIn</span>
          <strong>
            {optimized ? statistics.linkedin : 0}
          </strong>
        </div>

        <div className="stat-card">
          <span>Facebook</span>
          <strong>
            {optimized ? statistics.facebook : 0}
          </strong>
        </div>

      </section>

      {/* CALENDAR */}
      <section className="calendar-card">

        <FullCalendar
          plugins={[
            dayGridPlugin,
            interactionPlugin,
          ]}
          initialView="dayGridMonth"
          initialDate="2026-08-01"
          events={events}
          editable={optimized}
          eventDrop={handleEventDrop}
          height="650px"
        />

      </section>

      {/* INSTRUCTIONS */}
      <section className="instructions">

        <h2>How to use</h2>

        <div className="instruction-grid">

          <div>
            <b>1. Add Post</b>
            <p>
              Click + Add Post and enter post details.
            </p>
          </div>

          <div>
            <b>2. Schedule</b>
            <p>
              Select the date for your post.
            </p>
          </div>

          <div>
            <b>3. Drag & Drop</b>
            <p>
              Drag a post to another date to reschedule it.
            </p>
          </div>

          <div>
            <b>4. Optimization</b>
            <p>
              Switch optimization ON or OFF to compare rendering.
            </p>
          </div>

        </div>

      </section>

      {/* POST LIST */}
      <section className="post-list">

        <div className="post-list-header">

          <h2>Scheduled Posts</h2>

          <button
            className="delete-button"
            onClick={deletePost}
          >
            Delete Post
          </button>

        </div>

        {!optimized ? (
          <p>
            Optimization is OFF — posts are hidden.
          </p>
        ) : posts.length === 0 ? (
          <p>No posts scheduled.</p>
        ) : (
          posts.map((post) => (

            <div
              className="post-row"
              key={post.id}
            >

              <div>
                <strong>{post.title}</strong>

                <span>
                  {post.platform} • {post.date}
                </span>
              </div>

              <small>
                ID: {post.id}
              </small>

            </div>

          ))
        )}

      </section>

    </div>
  );
}

export default App;