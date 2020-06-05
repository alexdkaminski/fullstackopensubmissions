import React from 'react'

const BlogForm = ( { addBlog, title, author, url, handleTitleChange, handleAuthorChange, handleUrlChange } ) => (
  <form onSubmit={addBlog}>
    <div>
      title:
      <input
        value={title}
        onChange={handleTitleChange}
      />
    </div>
    <div>
      author:
      <input
        value={author}
        onChange={handleAuthorChange}
      />
    </div>
    <div>
      url:
      <input
        value={url}
        onChange={handleUrlChange}
      />
    </div>
   <button type="submit">save</button>
</form>
)

export default BlogForm