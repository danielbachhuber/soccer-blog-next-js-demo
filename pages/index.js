import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/nav'
import PostList from '../components/postlist'
import { withApollo } from '../lib/apollo'

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
    </Head>

    <Nav />

    <PostList />
  </div>
)

export default withApollo(Home)
