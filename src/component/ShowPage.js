import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ShowPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const isAdmin = location.state;

    const getPost = (id) => {
        axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
            setPost(res.data);  
            setLoading(false);       
        })        
    };

    useEffect(() => {
        getPost(id)
    }, [id])

    const printDate = (timestamp) => {
        return new Date(timestamp).toLocaleString();
    }

    if (loading) {
        return <LoadingSpinner />
    }

    return (
        <div>
            <div className="d-flex">
                <h1 className="flex-grow-1">{post.title}</h1>
                <div>
                    {isAdmin ? <Link 
                        className="btn btn-primary"
                        to={`/blogs/${id}/edit`}
                        >
                            Edit
                    </Link>: null}
                </div>
            </div>
            <small className="text-muted">
                Create At : {printDate(post.createAt)}
            </small>
            <hr />
            <p>{post.body}</p>
        </div>
    );
};

export default ShowPage;