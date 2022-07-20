import { MDXProvider } from "@mdx-js/react";

import React from "react";
import { graphql } from "gatsby";

function BlogPostTemplate(props) {
  const { data } = props;

  if (!data) {
    console.error(props, "no data");
    return null;
  }

  const {
    data: {
      mdx: { frontmatter },
    },
    children,
  } = props;

  return (
    <>
      <h1>{frontmatter.title}</h1>
      <p>{frontmatter.author}</p>

      <main>
        <MDXProvider>{children}</MDXProvider>
      </main>
    </>
  );
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      tableOfContents
      frontmatter {
        title
        author
      }
    }
  }
`;
