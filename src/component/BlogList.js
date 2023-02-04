import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import Card from "../component/Card";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../component/LoadingSpinner";
import propTypes from 'prop-types'
import Pagination from "./Pagination";
import { useLocation } from "react-router-dom";
import Toast from "../component/Toast";
import useToast from "../hooks/toast";

const BlogList = ({isAdmin}) => {
    const history = useHistory();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const pageParam = params.get('page');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPosts, setnumberOfPosts] = useState(0);
    const [numberOfPages, setnumberOfPages] = useState(0);
    const [searchText, setSearchText] = useState('');

    const [toasts, addToast, deleteToast] = useToast();
    // const [, setToastRerender] = useState(false);
    // const toasts = useRef([]);

    const limit = 5;

    useEffect(() => {
        setnumberOfPages(Math.ceil(numberOfPosts/limit));
    }, [numberOfPosts])

    const onClickPageButton = (page) => {
        history.push(`${location.pathname}?page=${page}`)
        getPosts(page);
    }

    const getPosts = useCallback((page = 1) => {
        let params = {
            _page: page,
            _limit: limit,
            _sort: 'id',
            // _order: 'desc'
            title_like: searchText
        }

        if (!isAdmin) {
          params = { ...params, publish: true };  
        }

        axios.get('http://localhost:3001/posts',{
            params
        }).then((res)=>{
            setnumberOfPosts(res.headers['x-total-count'])
            setPosts(res.data);
            setLoading(false);
        })
    }, [isAdmin, searchText])

    useEffect(() => { 
        // console.log('1');
        setCurrentPage(parseInt(pageParam) || 1);
        getPosts(parseInt(pageParam) || 1);
    }, []);

    // const deleteToast = (id) => {
    //     const filteredToasrs = toasts.current.filter(toast => {
    //         return toast.id !== id;
    //     })

    //     toasts.current = filteredToasrs;
    //     setToastRerender(prev => !prev);
    // }

    // const addToast = (toast) => {
    //     const id = uuidv4();
    //     const toastWithId = {
    //         ...toast,
    //         id
    //     }
    //     toasts.current = [
    //         ...toasts.current,
    //         toastWithId
    //     ]
    //     setToastRerender(prev => !prev);

    //     setTimeout(() => {
    //         deleteToast(id);
    //     }, 5000)
    // };

    const deleteBlog = (e, id) => {
        e.stopPropagation();

        axios.delete(`http://localhost:3001/posts/${id}`).then(()=>{
            setPosts(prevPosts => prevPosts.filter(post => post.id !== id))
            addToast({
                text: 'succeccfully deleted',
                type: 'success'
            });
        });
    }

    if(loading) {
        return (
            <LoadingSpinner />
        );
    } 

    const renderBlogList = () => {
        return posts.map(post => {
            return (
                <Card 
                    key={post.id} 
                    title={post.title} 
                    onClick={() => history.push({
                        pathname: `/blogs/${post.id}`,
                        state: isAdmin
                    })} 
                >
                    {isAdmin ? (<div>
                        <button 
                            className="btn btn-danger btn-sm"
                            onClick={(e) => deleteBlog(e, post.id)}
                        >
                            Delete
                        </button>
                    </div>) : null}
                </Card>
            );
        })
    }

    const onSearch = (e) => {
        if (e.key === 'Enter') {
            getPosts(1);
        }
    }

    return (
        <div>
            <Toast toasts={toasts} deleteToast={deleteToast}/>
            <input 
                type="text"
                placeholder="Search.."
                className="form-control"
                value={searchText}
                onChange={(e)=>setSearchText(e.target.value)}
                onKeyUp={onSearch}
            />
            <hr />
            { posts.length === 0 
                ? <div>No blogs posts found</div>
                : <>
                    {renderBlogList()}
                    {numberOfPages > 1 && <Pagination 
                        currentPage={currentPage} 
                        numberOfPage={numberOfPages}
                        onClick={onClickPageButton}
                    />}
                </>}    
        </div>
    );
};


BlogList.propTypes = {
    isAdmin: propTypes.bool,
};


BlogList.defaultProps = {
    isAdmin: false
};

export default BlogList;