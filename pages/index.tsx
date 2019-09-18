import * as React from "react";
import * as Dwnxt from "downwrite";
import Head from "next/head";
import "isomorphic-unfetch";
import gql from "graphql-tag";
import { AuthContext, AuthContextType } from "../components/auth";
import DeleteModal from "../components/delete-modal";
import PostList from "../components/post-list";
import Loading from "../components/loading";
import EmptyPosts from "../components/empty-posts";
import InvalidToken from "../components/invalid-token";
import useManagedDashboard from "../hooks/manage-dashboard";
import * as InitialProps from "../utils/initial-props";
import { useQuery } from "@apollo/react-hooks";

export const ALL_POSTS_QUERY = gql`
  query {
    feed {
      title
      id
      public
    }
  }
`;

// TODO: refactor to have selected post, deletion to be handled by a lower level component
// should be opened at this level and be handed a token and post to delete
export function DashboardUI(props: InitialProps.IDashboardProps) {
  const [
    { entries, selectedPost, modalOpen, loaded, error },
    ManagedDashboard
  ] = useManagedDashboard(props.entries);
  const [{ token }] = React.useContext<AuthContextType>(AuthContext);
  const { data } = useQuery(ALL_POSTS_QUERY, {
    context: {
      Authorization: token
    }
  });

  console.log(data, "QUERY");

  return (
    <>
      {modalOpen && (
        <DeleteModal
          title={selectedPost.title}
          onDelete={ManagedDashboard.onConfirmDelete}
          onCancelDelete={ManagedDashboard.onCancel}
          closeModal={ManagedDashboard.onCloseModal}
        />
      )}
      <Head>
        <title>{Array.isArray(entries) && entries.length} Entries | Downwrite</title>
      </Head>
      <section className="PostContainer">
        {loaded ? (
          Array.isArray(entries) && entries.length > 0 ? (
            <PostList
              onSelect={ManagedDashboard.onSelect}
              posts={entries as Dwnxt.IPost[]}
            />
          ) : error.length > 0 ? (
            <InvalidToken error={error} />
          ) : (
            <EmptyPosts />
          )
        ) : (
          <Loading size={100} />
        )}
      </section>
    </>
  );
}

// DashboardUI.getInitialProps = InitialProps.getInitialPostList;

DashboardUI.defaultProps = {
  entries: []
};

export default DashboardUI;
