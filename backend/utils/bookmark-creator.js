


const bookmarkCreator = () => {
  const bookmarks = bookmarksTitle.map(async (title) => {
    const bookmark = new Bookmark({ title });
    return await bookmark.save();
  });
  return Promise.all(bookmarks);
};

module.exports = bookmarkCreator;