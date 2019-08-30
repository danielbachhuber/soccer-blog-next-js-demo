import { useQuery } from '@apollo/react-hooks'
import { withApollo } from '../../lib/apollo'
import { NetworkStatus } from 'apollo-boost'
import gql from 'graphql-tag'
import Head from 'next/head';
import Nav from '../../components/nav'

export const GET_POST_QUERY = gql`
query GET_POST($uri: String) {
  postBy(uri: $uri) {
    id
    postId
    title
    content
    date
    uri
  }
}
`

const Post = ({ name }) => {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    GET_POST_QUERY,
    {
      variables: {
        uri: name,
      },
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true
    }
  )

  if (error) return <div>404</div>
  if (loading) return <div>Loading</div>

  const post = data.postBy;

  return (
    <div>
      <Head>
        <title>{post.title}</title>
      </Head>

      <Nav />

      <div>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{__html:post.content}} />
      </div>
    </div>
  )
}

Post.getInitialProps = async ({ query }) => {
  return { name: query.name }
}

export default withApollo(Post)
