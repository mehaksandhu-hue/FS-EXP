import { memo } from "react";

function PostStats({ events }) {
  console.log("PostStats rendered");

  return (
    <div className="stats">
      <h3>Post Statistics</h3>
      <p>Total Scheduled Posts: {events.length}</p>
    </div>
  );
}

export default memo(PostStats);