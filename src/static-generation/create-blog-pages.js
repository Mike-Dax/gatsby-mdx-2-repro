exports.createBlogPages = (graphql, createPage, blogPage) => {
  return graphql(
    `
      {
        allMdx {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                draft
              }
              parent {
                ... on File {
                  absolutePath
                }
              }
            }
          }
        }
      }
    `
  ).then(async (result) => {
    if (result.errors) {
      console.log(result.errors);
      throw new Error("An error occurred when creating the blog pages");
    }

    // Create blog pages.
    const edges = result.data.allMdx.edges;

    await Promise.all(
      edges.map((edge) => {
        const node = edge.node;

        // Don't create the draft pages
        const isDraft = node.frontmatter.draft;

        if (isDraft) {
          return;
        }

        // All we need is the ID and the slug to generate the page
        const slug = node.fields.slug;

        // console.log(`creating blog post: `, slug)

        return createPage({
          path: slug,
          component: `${blogPage}?__contentFilePath=${node.parent.absolutePath}`,
          context: {
            slug, // used for the CTA message banner
            id: node.id,
          },
        });
      })
    );

    return null;
  });
};
