import { useQuery } from '@apollo/react-hooks'
import { NetworkStatus } from 'apollo-boost'
import gql from 'graphql-tag'

export const GET_POSTS_QUERY = gql`
  query GET_POSTS($first: Int!, $after: String!) {
    posts(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          date
          link
        }
      }
    }
  }
`

export const getPostsQueryVars = {
  after: 0,
  first: 10
}

export default function PostList () {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    GET_POSTS_QUERY,
    {
      variables: getPostsQueryVars,
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true
    }
  )

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore

  const loadMorePosts = () => {
    fetchMore({
      variables: {
        after: allPosts.length
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult
        }
        return Object.assign({}, previousResult, {
          // Append the new posts results to the old one
          allPosts: [...previousResult.allPosts, ...fetchMoreResult.allPosts]
        })
      }
    })
  }

  if (error) return <ErrorMessage message='Error loading posts.' />
  if (loading && !loadingMorePosts) return <div>Loading</div>

  const { edges, pageInfo } = data.posts
  const allPosts = edges;
  const areMorePosts = pageInfo.hasNextPage

  return (
    <section>
      <ul>
        {allPosts.map((post, index) => (
          <li key={post.node.id}>
            <div>
              <span>{index + 1}. </span>
              <a href={post.node.link}>{post.node.title}</a>
            </div>
          </li>
        ))}
      </ul>
      {areMorePosts && (
        <button onClick={() => loadMorePosts()} disabled={loadingMorePosts}>
          {loadingMorePosts ? 'Loading...' : 'Show More'}
        </button>
      )}
    </section>
  )
}
