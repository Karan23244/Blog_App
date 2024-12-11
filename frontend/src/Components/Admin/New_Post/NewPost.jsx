import React, { useState, useEffect, memo } from "react";
import axios from "axios";
import Editor from "./Editor"; // Assuming you have an Editor component
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function NewPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [postDetails, setPostDetails] = useState({
    title: "",
    content: "",
    category: [],
    blogType: "draft",
    author: "",
    seoTitle: "",
    seoDescription: "",
    Custom_url: "",
    scheduleDate: "",
  });
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryResponse, authorResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/categories`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/authors`),
        ]);
        setCategories(categoryResponse.data.data);
        setAuthors(authorResponse.data.data);

        if (id) {
          const postResponse = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/posts/editData/${id}`
          );
          const post = postResponse.data.data;

          const replaceImageUrls = (content) => {
            const baseUrl = `${import.meta.env.VITE_API_URL}`; // Correct base URL

            // Match <img> tags and adjust src paths
            return content.replace(
              /<img\s+[^>]*src="([^"]+)"/g,
              (match, src) => {
                if (src.startsWith("uploads/")) {
                  const correctedSrc = `${baseUrl}/${src}`;
                  return match.replace(src, correctedSrc);
                }

                // Fix incorrect prefix
                if (src.includes("smart-home-technology/uploads/")) {
                  const correctedSrc = src.replace(
                    "smart-home-technology/",
                    ""
                  );
                  return match.replace(src, correctedSrc);
                }

                return match; // Leave other paths unchanged
              }
            );
          };

          const decodedContent = replaceImageUrls(post.content);

          setPostDetails({
            title: post.title || "",
            content: decodedContent || "",
            category: post.category_id?.split(",") || [],
            blogType: post.blog_type || "",
            author: post.author_id || "",
            seoDescription: post.seoDescription || "",
            seoTitle: post.seoTitle || "",
            Custom_url: post.Custom_url || "",
            scheduleDate: post.scheduleDate || "",
          });
          setTags(post.tags?.split(",") || []);
          const imageUrl = post.featured_image
            ? `${import.meta.env.VITE_API_URL}/${post.featured_image}`
            : "";
          setFeaturedImage(imageUrl || null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", postDetails.title);
    formData.append("content", postDetails.content);
    formData.append("category", postDetails.category.join(","));
    formData.append("tags", tags.join(","));
    formData.append("blogType", postDetails.blogType);
    formData.append("author", postDetails.author);
    formData.append("seoTitle", postDetails.seoTitle);
    formData.append("seoDescription", postDetails.seoDescription);
    formData.append("Custom_url", postDetails.Custom_url);
    formData.append(
      "scheduleDate",
      postDetails.scheduleDate ? postDetails.scheduleDate : ""
    );

    if (featuredImage && typeof featuredImage !== "string") {
      formData.append("featuredImage", featuredImage);
    }
    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
    try {
      if (id) {
        try {
          const res = await axios.put(
            `${import.meta.env.VITE_API_URL}/api/posts/${id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data", // Important for file uploads
              },
            }
          );
          for (const [key, value] of Object.entries(formData)) {
            console.log(`${key}: ${value}`);
          }
          if (res.status === 200 || res.status === 201) {
            // Check if the response status is successful (200)
            alert("Post updated successfully!");
            navigate("/admin/home"); // Navigate after successful update
          } else {
            alert("Something went wrong while updating the post.");
          }
        } catch (error) {
          console.error("Error updating post:", error);
          alert("Error updating the post. Please try again.");
        }
      } else {
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/posts`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data", // Important for file uploads
              },
            }
          );

          if (res.status === 200 || res.status === 201) {
            alert("Post created successfully!");
            navigate("/admin/home"); // Navigate after successful creation
          } else {
            alert("Something went wrong while creating the post.");
          }
        } catch (error) {
          console.error("Error creating post:", error);

          if (error.response) {
            // Server responded with a status code other than 2xx
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            alert(
              `Error: ${error.response.data.message || "Failed to create post"}`
            );
          } else if (error.request) {
            // Request was made but no response received
            console.error("Request data:", error.request);
            alert("No response from the server. Please try again later.");
          } else {
            // Something happened while setting up the request
            console.error("Error setting up request:", error.message);
            alert(
              "Error creating the post. Please check your input and try again."
            );
          }
        }
      }
      setPostDetails({
        title: "",
        content: "",
        category: [],
        blogType: "draft",
        author: "",
        seoTitle: "",
        seoDescription: "",
        Custom_url: "",
        scheduleDate: "",
      });
      setTags([]);
      setFeaturedImage(null);
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Error saving post");
    }
  };
  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold text-gray-800">
        {id ? "Edit Blog Post" : "Create New Blog Post"}
      </h2>
      <div className="flex flex-col lg:flex-row gap-6 p-5">
        <Sidebar
          postDetails={postDetails}
          setPostDetails={setPostDetails}
          categories={categories}
          authors={authors}
          featuredImage={featuredImage}
          setFeaturedImage={setFeaturedImage}
          tags={tags}
          setTags={setTags}
          tagInput={tagInput}
          setTagInput={setTagInput}
          startDate={startDate}
          setStartDate={setStartDate}
        />
        <ContentEditor
          postDetails={postDetails}
          handleInputChange={handleInputChange}
          handleEditorChange={(content) =>
            setPostDetails((prev) => ({ ...prev, content }))
          }
          handlePostSubmit={handlePostSubmit}
          id={id}
        />
      </div>
    </div>
  );
}

const Sidebar = memo(
  ({
    postDetails,
    setPostDetails,
    categories,
    authors,
    featuredImage,
    setFeaturedImage,
    tags,
    setTags,
    tagInput,
    setTagInput,
    startDate,
    setStartDate,
  }) => (
    <div className="lg:w-1/4 p-6 bg-gray-100 rounded-lg shadow-md">
      <ImageUploader
        featuredImage={featuredImage}
        setFeaturedImage={setFeaturedImage}
      />
      <PublishStatus
        postDetails={postDetails}
        setPostDetails={setPostDetails}
      />
      <ScheduleDate
        postDetails={postDetails}
        setPostDetails={setPostDetails}
        startDate={startDate}
        setStartDate={setStartDate}
      />
      <CategorySelector
        categories={categories}
        postDetails={postDetails}
        setPostDetails={setPostDetails}
      />
      <TagsInput
        tags={tags}
        setTags={setTags}
        tagInput={tagInput}
        setTagInput={setTagInput}
      />
      <AuthorSelector
        authors={authors}
        postDetails={postDetails}
        handleInputChange={(e) =>
          setPostDetails((prev) => ({ ...prev, author: e.target.value }))
        }
      />
    </div>
  )
);

const ContentEditor = memo(
  ({
    postDetails,
    handleInputChange,
    handleEditorChange,
    handlePostSubmit,
    id,
  }) => (
    <div className="lg:w-3/4 p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={postDetails.title}
          onChange={handleInputChange}
          className="w-full p-2 mt-2 border border-gray-300 rounded"
          required
          placeholder="Enter blog title"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700" htmlFor="title">
          SEO Title
        </label>
        <input
          type="text"
          name="seoTitle"
          value={postDetails.seoTitle}
          onChange={handleInputChange}
          className="w-full p-2 mt-2 border border-gray-300 rounded"
          required
          placeholder="Enter SEO title"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700" htmlFor="title">
          SEO Description
        </label>
        <input
          type="text"
          name="seoDescription"
          value={postDetails.seoDescription}
          onChange={handleInputChange}
          className="w-full p-2 mt-2 border border-gray-300 rounded"
          required
          placeholder="Enter SEO Description"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700" htmlFor="title">
          Custom URL
        </label>
        <input
          type="text"
          name="Custom_url"
          value={postDetails.Custom_url}
          onChange={handleInputChange}
          className="w-full p-2 mt-2 border border-gray-300 rounded"
          required
          placeholder="Enter Custom_url"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Content</label>
        <Editor
          value={postDetails.content}
          onChange={handleEditorChange}
          placeholder="Start typing here..."
        />
      </div>
      <div className="flex justify-end gap-4">
        <button
          onClick={handlePostSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
          {id ? "Update Post" : "Create Post"}
        </button>
      </div>
    </div>
  )
);

const ImageUploader = memo(({ featuredImage, setFeaturedImage }) => (
  <div>
    <label className="block text-gray-700">Featured Image</label>
    <input
      type="file"
      onChange={(e) => setFeaturedImage(e.target.files[0])}
      className="w-full mt-2 p-2 border border-gray-300 rounded"
    />
    {featuredImage && (
      <img
        src={
          typeof featuredImage === "string"
            ? featuredImage
            : URL.createObjectURL(featuredImage)
        }
        alt="Featured"
        className="mt-4 w-full h-40 object-cover rounded"
      />
    )}
  </div>
));

const PublishStatus = memo(({ postDetails, setPostDetails }) => (
  <div className="mt-4">
    <label className="block text-gray-700">Publish Status</label>
    <button
      onClick={() => setPostDetails((prev) => ({ ...prev, blogType: "draft" }))}
      className={`mt-2 w-full p-2 rounded-md ${
        postDetails.blogType === "draft"
          ? "bg-blue-600 text-white"
          : "bg-gray-300"
      }`}>
      Draft
    </button>
    <button
      onClick={() =>
        setPostDetails((prev) => ({ ...prev, blogType: "published" }))
      }
      className={`mt-2 w-full p-2 rounded-md ${
        postDetails.blogType === "published"
          ? "bg-green-600 text-white"
          : "bg-gray-300"
      }`}>
      Publish
    </button>
  </div>
));
const ScheduleDate = ({
  postDetails,
  setPostDetails,
  startDate,
  setStartDate,
}) => {
  const handleDateChange = (date) => {
    setStartDate(date);
    // Create a new Date object from the input date
    const formattedDate = new Date(date);

    // Extract individual components
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, "0"); // Add 1 as months are 0-indexed
    const day = String(formattedDate.getDate()).padStart(2, "0");
    const hours = String(formattedDate.getHours()).padStart(2, "0");
    const minutes = String(formattedDate.getMinutes()).padStart(2, "0");
    const seconds = String(formattedDate.getSeconds()).padStart(2, "0");

    // Format the date into 'YYYY-MM-DD HH:mm:ss' format
    const formattedString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    console.log(formattedString);
    setPostDetails((prev) => ({ ...prev, scheduleDate: formattedString }));
  };
  const now = new Date();
  const maxDate = new Date();
  const minTime =
    startDate && startDate.toDateString() === now.toDateString()
      ? now
      : new Date(0, 0, 0, 0, 0);
  const maxTime =
    startDate && startDate.toDateString() === maxDate.toDateString()
      ? new Date(0, 0, 0, 23, 59)
      : new Date(0, 0, 0, 23, 59);
  return (
    <>
      {/* Schedule Date (only for drafts) */}
      {postDetails.blogType === "draft" && (
        <div className="mt-4">
          <label className="block text-gray-700 mb-2">
            Schedule Date & Time
          </label>
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            showTimeSelect
            minDate={now}
            minTime={minTime}
            maxTime={maxTime}
            dateFormat="Pp"
            className="w-full p-2 border border-gray-300 rounded"
            placeholderText="Select a date and time"
          />
        </div>
      )}

      {/* Status Message */}
      {postDetails.blogType === "published" && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 border border-blue-400 rounded">
          This blog is already published and will not be scheduled.
        </div>
      )}

      {/* Draft Message */}
      {postDetails.blogType === "draft" && (
        <div className="mt-4 p-4 bg-yellow-100 text-yellow-700 border border-yellow-400 rounded">
          This blog is in draft mode and will be scheduled for:{" "}
          <strong>
            {postDetails.scheduleDate?.toLocaleString() || "Not Set"}
          </strong>
        </div>
      )}
    </>
  );
};
const CategorySelector = memo(({ categories, postDetails, setPostDetails }) => {
  // Filter categories by type
  const upgradeCategories = categories.filter(
    (cat) => cat.category_type === "Upgrade Yourself"
  );
  const homeInsightsCategories = categories.filter(
    (cat) => cat.category_type === "Home Insights"
  );

  const handleCategoryChange = (type, selectedCategoryId) => {
    setPostDetails((prev) => {
      const updatedCategory = [...prev.category];
      // Update category based on type
      if (type === "Upgrade Yourself") {
        updatedCategory[0] = selectedCategoryId; // First dropdown
      } else if (type === "Home Insights") {
        updatedCategory[1] = selectedCategoryId; // Second dropdown
      }
      return { ...prev, category: updatedCategory };
    });
  };

  return (
    <div className="mt-4">
      <label className="block text-gray-700 mb-2">Select Categories</label>

      {/* Dropdown for "Upgrade Yourself" */}
      <div className="mb-4">
        <label className="block text-gray-600">Upgrade Yourself</label>
        <select
          value={postDetails.category[0] || ""}
          onChange={(e) =>
            handleCategoryChange("Upgrade Yourself", e.target.value)
          }
          className="w-full p-2 mt-2 border border-gray-300 rounded">
          <option value="">Select a category</option>
          {upgradeCategories.map((cat) => (
            <option key={cat.category_id} value={cat.category_id}>
              {cat.category_name}
            </option>
          ))}
        </select>
      </div>

      {/* Dropdown for "Home Insights" */}
      <div>
        <label className="block text-gray-600">Home Insights</label>
        <select
          value={postDetails.category[1] || ""}
          onChange={(e) =>
            handleCategoryChange("Home Insights", e.target.value)
          }
          className="w-full p-2 mt-2 border border-gray-300 rounded">
          <option value="">Select a category</option>
          {homeInsightsCategories.map((cat) => (
            <option key={cat.category_id} value={cat.category_id}>
              {cat.category_name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
});

const TagsInput = memo(({ tags, setTags, tagInput, setTagInput }) => (
  <div className="mt-4">
    <label className="block text-gray-700">Tags</label>
    <div className="flex items-center mt-2">
      <input
        type="text"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && tagInput.trim()) {
            e.preventDefault();
            setTags((prev) => [...prev, tagInput.trim()]);
            setTagInput("");
          }
        }}
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Enter a tag and press enter"
      />
    </div>
    <div className="flex flex-wrap gap-2 mt-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="px-3 py-1 bg-gray-200 rounded-full text-sm">
          {tag}{" "}
          <button onClick={() => setTags(tags.filter((_, i) => i !== index))}>
            &times;
          </button>
        </span>
      ))}
    </div>
  </div>
));

const AuthorSelector = memo(({ authors, postDetails, handleInputChange }) => (
  <div className="mt-4">
    <label className="block text-gray-700 mb-2">Author</label>
    <select
      name="author"
      value={postDetails.author}
      onChange={handleInputChange}
      className="w-full p-2 border border-gray-300 rounded">
      <option value="">Select an Author</option>
      {authors.map((author) => (
        <option key={author.author_id} value={author.author_id}>
          {author.full_name}
        </option>
      ))}
    </select>
  </div>
));

export default NewPost;
