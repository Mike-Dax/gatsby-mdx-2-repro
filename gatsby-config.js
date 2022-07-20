module.exports = {
  siteMetadata: {
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages/blog/`,
        name: "blog",
        ignore: [`**/\.*`],
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".md", ".mdx"],
      },
    },
  ],
};
