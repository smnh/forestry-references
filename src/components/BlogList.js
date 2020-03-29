import React from "react"
import { Link } from "gatsby"
import useBlogData from "../static_queries/useBlogData"
import blogListStyles from "../styles/components/bloglist.module.scss"
import Img from 'gatsby-image'

export default function BlogList() {
  const blogData = useBlogData()
  function renderBlogData() {
    return (
      <div>
        {blogData
          .filter(blog => blog.frontmatter.title !== "")
          .map(blog => {
            return (
              <Link to={`/blog/${blog.fields.slug}`} key={blog.id}>
                <li className={blogListStyles.li} key={blog.fields.slug}>
                  <div className={blogListStyles.list__hero}>
                    <Img 
                      fluid={
                        blog.frontmatter.hero_image.childImageSharp.fluid
                      }
                      alt={blog.frontmatter.title}
                    />
                  </div>
                  <div className={blogListStyles.list__info}>
                    <h2>{blog.frontmatter.title}</h2>
                    <h3>{blog.frontmatter.date}{blog.frontmatter.authorObj ? ` by ${blog.frontmatter.authorObj.firstName}` : null}</h3>
                    <p>{blog.excerpt}</p>
                  </div>
                </li>
              </Link>
            )
          })}
      </div>
    )
  }
  return (
    <section>
      <ul className={blogListStyles.list}>{renderBlogData()}</ul>
    </section>
  )
}

