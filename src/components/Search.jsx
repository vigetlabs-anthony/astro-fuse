import Fuse from "fuse.js";
import { useState } from "react";
import { generateSlug } from "../static/utils";

const options = {
  // keys: ["frontmatter.title", "frontmatter.description"], // List of keys that will be searched. This supports nested paths, weighted search, searching in arrays of strings and objects
  keys: ["frontmatter.title", "frontmatter.category"], //
  includeMatches: true,
  minMatchCharLength: 2,
  threshold: 0.1,
  ignoreLocation: true,
};

function Search({ searchList }) {
  const [query, setQuery] = useState("");

  const fuse = new Fuse(searchList, options);

  // Set a limit to the posts: 5
  const posts = fuse
    .search(query)
    .map((result) => result.item)
    // .slice(0, 4);
    .slice(0, 5);

  function handleOnSearch({ target = {} }) {
    const { value } = target;
    setQuery(value);
  }

  return (
    <div>
      <div className="flex items-center w-96 text-sm h-12 text-gray-900 ring-gray-300 ring-1 rounded-full focus:outline-none">
        <label htmlFor="search" className="p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </label>
        <input
          type="text"
          id="search"
          value={query}
          onChange={handleOnSearch}
          className="h-full w-full p-2 bg-transparent"
          placeholder="Search for anything..."
        />
      </div>

      {query.length > 1 && (
        <div className="mt-2">
          Found {posts.length} {posts.length === 1 ? "result" : "results"} for '
          {query}'
        </div>
      )}

      <ul>
        {posts &&
          posts.map((post, i) => (
            <li key={i} className="pt-2">
              <a
                className="text-lg text-blue-700 hover:text-blue-900 hover:underline underline-offset-2"
                href={`/posts/${generateSlug(post.frontmatter.title)}`}
              >
                {post.frontmatter.title}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Search;
