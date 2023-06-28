export const generateSlug = (text) => {
  if (text === null) {
    return;
  } else {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  }
};

export const formatDate = (date) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    timeZone: "UTC",
  });
  return formattedDate;
};

export function formatPosts(
  posts,
  {
    filterOutDrafts = true,
    filterOutFuturePosts = true,
    sortByDate = true,
    limit = undefined,
  } = {}
) {
  const filteredPosts = posts.reduce((acc, post) => {
    const { date, draft } = post.frontmatter;
    if (filterOutDrafts && draft) return acc;

    if (filterOutFuturePosts && new Date(date) > new Date()) return acc;

    // add post to acc
    acc.push(post);

    return acc;
  }, []);

  // sortByDate or randomize
  if (sortByDate) {
    filteredPosts.sort(
      (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
    );
  } else {
    filteredPosts.sort(() => Math.random() - 0.5);
  }

  // limit if number is passed
  if (typeof limit === "number") {
    return filteredPosts.slice(0, limit);
  }
  return filteredPosts;
}
