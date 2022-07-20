const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

const {
  createBlogPages,
} = require("./src/static-generation/create-blog-pages");

exports.createPages = async ({ graphql, actions, cache }) => {
  const { createPage } = actions;

  const blogPage = path.resolve("./src/templates/template-blog-page.js");

  // Create blog pages
  await createBlogPages(graphql, createPage, blogPage);
};

exports.onCreateNode = async ({
  node,
  actions,
  getNode,
  getNodes,
  createNodeId,
  createContentDigest,
}) => {
  const { createNodeField, createNode, createParentChildLink } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    // Generate the slug for the path
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }

  // Generate slugs and IDs for MDX files.
  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent);

    if (!parent.relativePath) {
      console.warn(parent, "didn't have a relative path");
      return;
    }

    const p = parent.relativePath.replace(parent.ext, "").replace("/index", "");

    createNodeField({
      name: `slug`,
      node,
      value: `${parent.sourceInstanceName}/${p}`,
    });
  }
};
