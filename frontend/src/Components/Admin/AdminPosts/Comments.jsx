import { useState } from "react";

const CommentSection = ({
  comments,
  handleSubmit,
  loading,
  name,
  setName,
  comment,
  setComment,
}) => {
  const [visibleComments, setVisibleComments] = useState(3);

  const showMoreComments = () => {
    setVisibleComments((prev) => prev + 3);
  };

  const hideComments = () => {
    setVisibleComments(3);
  };

  return (
    <div className="my-5">
      <h2 className="text-2xl font-bold mb-4">Leave a Comment</h2>

      {/* Comment Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-5 rounded-lg shadow">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
          required
        />
        <textarea
          placeholder="Your Comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
          rows="3"
          required></textarea>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          disabled={loading}>
          {loading ? "Submitting..." : "Submit Comment"}
        </button>
      </form>

      {/* Comment List */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-3">Comments</h3>
        {comments.length === 0 ? (
          <p className="text-gray-500">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          <div className="space-y-4">
            {comments.slice(0, visibleComments).map((c, index) => (
              <div
                key={index}
                className="p-4 bg-gray-100 rounded-lg flex items-start gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white font-bold rounded-full text-lg">
                  {c.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-semibold">{c.name}</h4>
                  <p className="text-gray-700">{c.comment}</p>
                  <span className="text-xs text-gray-500">
                    {new Date(c.created_at).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
            {comments.length > 3 && (
              <div className="mt-4 text-center">
                {visibleComments < comments.length ? (
                  <button
                    onClick={showMoreComments}
                    className="text-blue-600 hover:underline">
                    View More Comments
                  </button>
                ) : (
                  <button
                    onClick={hideComments}
                    className="text-red-600 hover:underline">
                    Hide Comments
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
