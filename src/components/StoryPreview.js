import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql, StaticQuery } from 'gatsby';
import PreviewCompatibleImage from './PreviewCompatibleImage';

const StoryPreview = ({ post }) => {
  return (
    <article
      className={`storiesItem ${
        post.frontmatter.featuredpost ? 'is-featured' : ''
        }`}
    >
      <header>
        {post.frontmatter.featuredimage ? (
          <Link to={post.fields.slug}>
            <div className="featuredImage">
              <PreviewCompatibleImage
                imageInfo={{
                  image: post.frontmatter.featuredimage,
                  alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                }}
              />
            </div>
          </Link>
        ) : null}
        <div className="post-content">
          <Link to={post.fields.slug}>
            <h2>{post.frontmatter.title}</h2>
          </Link>
          <span>{post.frontmatter.date}</span>
        </div>
      </header>
      <p>{post.excerpt}</p>
      <Link to={post.fields.slug}>
        Finish Reading
      </Link>
    </article>
  );
}

StoryPreview.propTypes = {
  post: PropTypes.shape({
    frontmatter: PropTypes.shape({
      title: PropTypes.string.isRequired,
      date: PropTypes.string, // TODO: Verify
      featuredpost: PropTypes.bool,
      featuredimage: PropTypes.string, //TODO: Verify
    }),
    fields: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }), 
    excerpt: PropTypes.string.isRequired,
  }),
};

export default StoryPreview;
