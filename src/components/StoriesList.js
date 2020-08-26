import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql, StaticQuery } from 'gatsby';
import StoryPreview from './StoryPreview';

class StoriesList extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <div className={"storiesList"}>
        {posts.map(({ node: post, i}) => (
          <div key={i} className={"storiesItem"}>
            <StoryPreview post={post} />
          </div>
        ))}
      </div>



      // <div style={{display: "flex"}}>
      //   <div style={{
      //     display: "flex",
      //     flexDirection: "row",
      //     flexWrap: "wrap",
      //     width: "100%",
      //     }}>
      //     <div style={{
      //       display: "flex",
      //       flexDirection: "column",
      //       flexBasis: "100%",
      //       flex: "1",
      //     }}>
      //       <StoryPreview post={posts[0].node} />
      //     </div>
      //     <div style={{
      //       display: "flex",
      //       flexDirection: "column",
      //       flexBasis: "100%",
      //       flex: "1",
      //     }}>
      //       <StoryPreview post={posts[1].node} />
      //     </div>
      //   </div>
      // </div>



      // <ul className="storiesList">
      //   {posts &&
      //     posts.map(({ node: post, i }) => (
      //       <li key={i} className="storiesList-item">
      //         <StoryPreview post={post} />
      //       </li>
      //     ))}
      // </ul>
    );
  }
}

StoriesList.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default () => (
  <StaticQuery
    query={graphql`
      query StoriesListQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "stories-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 1280, maxHeight: 720, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <StoriesList data={data} count={count} />}
  />
);
