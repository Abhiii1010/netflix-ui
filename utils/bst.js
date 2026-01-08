class BSTNode {
  constructor(key, movie) {
    this.key = key;
    this.movies = [movie];
    this.left = null;
    this.right = null;
  }
}

// Insert node
function insertNode(root, key, movie) {
  if (!root) return new BSTNode(key, movie);

  if (key === root.key) {
    root.movies.push(movie);
  } else if (key < root.key) {
    root.left = insertNode(root.left, key, movie);
  } else {
    root.right = insertNode(root.right, key, movie);
  }
  return root;
}

// Build BST
export function buildBST(movies) {
  let root = null;

  movies.forEach((movie) => {
    const titleKey = movie.primaryTitle?.toLowerCase();
    if (titleKey) {
      root = insertNode(root, titleKey, movie);
    }
  });

  return root;
}

// Prefix search (autocomplete)
export function searchBSTPrefix(root, prefix, results = []) {
  if (!root) return results;

  if (root.key.startsWith(prefix)) {
    results.push(...root.movies);
  }

  if (prefix <= root.key) {
    searchBSTPrefix(root.left, prefix, results);
  }

  if (prefix >= root.key) {
    searchBSTPrefix(root.right, prefix, results);
  }

  return results;
}
