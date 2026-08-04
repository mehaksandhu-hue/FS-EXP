import { useState } from "react";

function App() {
  const [post, setPost] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [message, setMessage] = useState("");

  const platformLimits = {
    Twitter: 280,
    LinkedIn: 3000,
    Instagram: 2200,
    Facebook: 63206,
  };

  const handlePlatformChange = (platform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(
        selectedPlatforms.filter((item) => item !== platform)
      );
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const handlePublish = () => {
    if (selectedPlatforms.length === 0) {
      setMessage("⚠ Please select at least one platform.");
      return;
    }

    setMessage("✅ Post Published Successfully!");

    setPost("");
    setSelectedPlatforms([]);
  };

  const isInvalid = selectedPlatforms.some(
    (platform) => post.length > platformLimits[platform]
  );

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold text-center mb-6">
          Social Media Post Composer
        </h1>

        {/* Platform Selection */}

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">
            Select Platforms
          </h2>

          <div className="grid grid-cols-2 gap-3">

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedPlatforms.includes("Twitter")}
                onChange={() => handlePlatformChange("Twitter")}
              />
              🐦 Twitter (X)
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedPlatforms.includes("LinkedIn")}
                onChange={() => handlePlatformChange("LinkedIn")}
              />
              💼 LinkedIn
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedPlatforms.includes("Instagram")}
                onChange={() => handlePlatformChange("Instagram")}
              />
              📷 Instagram
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedPlatforms.includes("Facebook")}
                onChange={() => handlePlatformChange("Facebook")}
              />
              📘 Facebook
            </label>

          </div>
        </div>

        {/* Text Area */}

        <div>
          <h2 className="text-xl font-semibold mb-3">
            Write Your Post
          </h2>

          <textarea
            rows="8"
            placeholder="What's happening today?"
            value={post}
            onChange={(e) => {
              setPost(e.target.value);
              setMessage("");
            }}
            className="w-full border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Character Counter */}

        <p
          className={`mt-3 font-medium ${
            isInvalid ? "text-red-600" : "text-gray-700"
          }`}
        >
          Characters : {post.length}
        </p>

        {/* Warning */}

        {selectedPlatforms.length === 0 && (
          <p className="text-yellow-600 mt-2">
            ⚠ Please select at least one platform.
          </p>
        )}

        {/* Validation */}

        <div className="mt-4 space-y-2">
          {selectedPlatforms.map((platform) => (
            <div key={platform}>
              {post.length <= platformLimits[platform] ? (
                <p className="text-green-600">
                  ✅ Valid for {platform}
                </p>
              ) : (
                <p className="text-red-600">
                  ❌ {platform} allows only{" "}
                  {platformLimits[platform]} characters.
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Remaining Characters */}

        <div className="mt-4">
          {selectedPlatforms.map((platform) => (
            <p key={platform}>
              {platform} Remaining :
              <span
                className={`font-bold ml-2 ${
                  post.length > platformLimits[platform]
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {platformLimits[platform] - post.length}
              </span>
            </p>
          ))}
        </div>

        {/* Buttons */}

        <div className="flex gap-4 mt-6">

          <button
            onClick={handlePublish}
            disabled={
              selectedPlatforms.length === 0 || isInvalid
            }
            className={`px-6 py-2 rounded-lg text-white ${
              selectedPlatforms.length === 0 || isInvalid
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Publish
          </button>

          <button
            onClick={() => {
              setPost("");
              setSelectedPlatforms([]);
              setMessage("");
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
          >
            Reset
          </button>

        </div>

        {/* Success Message */}

        {message && (
          <p className="mt-4 text-green-600 font-semibold">
            {message}
          </p>
        )}

      </div>
    </div>
  );
}

export default App;