import { graphql, useStaticQuery } from "gatsby"

export default function useBlogData() {
  const data = useStaticQuery(graphql`
    query getBlogData {
      allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
        edges {
          node {
            id
            frontmatter {
              date(formatString: "MMMM Do, YYYY")
              author
              title
              hero_image {
                childImageSharp {
                  fluid( maxWidth: 800 ) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            excerpt(pruneLength: 200)
            fields {
              slug
            }
          }
        }
      }
      allAuthorsYaml {
        edges {
          node {
            firstName
            lastName
            bio
            parent {
              ... on File {
                relativePath
                relativeDirectory
                base
              }
            }
          }
        }
      }
    }
  `);
  const authors = data.allAuthorsYaml.edges.map(edge => edge.node);
  const blogs = data.allMarkdownRemark.edges.map(edge => {
    const node = edge.node;
    const authorPath = node.frontmatter.author;
    const author = authorPath ? authors.find(author => authorPath.indexOf(author.parent.relativePath) >= 0) : null;
    node.frontmatter.authorObj = author;
    return node;
  });
  return blogs
}