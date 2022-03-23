import React, { useEffect, useMemo, useRef, useState } from "react";
import PostService from "../API/PostService";
import PostFilter from "../components/PostFilter";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import MyButton from "../components/UI/button/MyButton";
import Loader from "../components/UI/Loader/Loader";
import MyModal from "../components/UI/myModal/MyModal";
import Pagination from "../components/UI/pagination/Pagination";
import { useFetching } from "../hooks/useFetching";
import { usePosts } from "../hooks/usePosts";
import '../styles/App.css'
import { getPageCount, getPagesArray } from "../utils/pages";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort:'', query:''});
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);

  const [fetchPosts, isPostsLoading, postError] = useFetching( async() => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  }, [])
  
  useEffect(() => {
    fetchPosts();
  }, [page])

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  const removePost = (deletePost) => {
    setPosts(posts.filter(post => post.id !== deletePost.id));
    console.log(deletePost)
  }

  const changePage = (page) => {
    setPage(page);
  }

  return (
    <div className="App">
      <MyButton
        style={{marginTop:'15px'}}
        onClick = {() => setModal(true)}>
        Добавить пост
      </MyButton>

      <MyModal
        visible={modal}
        setVisible={setModal}>
          <PostForm create={createPost} />
      </MyModal>
      <hr style={{margin:'15px 0'}} />

      <PostFilter 
        filter={filter}
        setFilter={setFilter}
      />
      {postError &&
        <h1> Произошла ошибка {postError} </h1>}
      {isPostsLoading
      ?
        <div style={{display:'flex', justifyContent:'center', marginTop:'50px'}}>
          <Loader/>
        </div>
      :
        <PostList remove={removePost} posts={sortedAndSearchPosts} title={'Список постов'} />
      }
      <Pagination
        page={page}
        changePage={changePage} 
        totalPages={totalPages}
      />
    </div>
  );
}

export default Posts;