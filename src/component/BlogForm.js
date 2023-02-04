import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import propTypes from 'prop-types';
// import { v4 as uuidv4 } from 'uuid';
// import Toast from "../component/Toast";
import useToast from "../hooks/toast";

const BlogForm = ({editing, addToast}) => {
    // const [toasts, addToast, deleteToast] = useToast();

    const history = useHistory();
    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [originalTitle, setOriginalTitle] = useState('');

    const [body, setBody] = useState('');
    const [originalBody, setOriginalBody] = useState('');

    const [publish, setPublish] = useState(false);
    const [originalPublish, setOriginalPublish] = useState(false);

    const [titleError, setTitleError] = useState(false);
    const [bodyError, setBodyError] = useState(false);

    // const [, setToastRerender] = useState(false);
    // const toasts = useRef([]);


    useEffect(() => {
        if (editing) {
            axios.get(`http://localhost:3001/posts/${id}`).then(res => {
                setTitle(res.data.title);
                setOriginalTitle(res.data.title);
                setBody(res.data.body);
                setOriginalBody(res.data.body);
                setPublish(res.data.publish);
                setOriginalPublish(res.data.publish);
            })
        }
    }, [id, editing]);

    const isEdited = () => {
        return title !== originalTitle || body !== originalBody || publish !== originalPublish;
    };

    const goBack = () => {
        if (editing){
            // history.push(`/blogs/${id}`);
            history.push({
                pathname: `/blogs/${id}`,
                state: editing
            })
        } else {
            history.push('/admin');
        }
    };
  
    const validateForm = () => {
        let validated = true;

        if (title === '') {
            setTitleError(true);
            validated = false;
        }

        if (body === '') {
            setBodyError(true);
            validated = false;
        }

        return validated;
    }

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

    //     toasts.current = {...toasts.current, toastWithId};
    //     setToastRerender(prev => !prev);

    //     setTimeout(() => {
    //         deleteToast(id);
    //     }, 5000)
    // };

    const onSubmit = () => {
        setTitleError(false);
        setBodyError(false);
        if (validateForm()){
            if (editing) {
                axios.patch(`http://localhost:3001/posts/${id}`, {
                    title,
                    body,
                    publish
                }).then(res => {
                    history.push({
                        pathname: `/blogs/${id}`,
                        state: editing
                    })
                    setOriginalTitle(res.data.title);
                    setOriginalBody(res.data.body);
                })
            } else {
                axios.post('http://localhost:3001/posts', {
                    title,
                    body,
                    publish,
                    createAt: Date.now()
                }).then(() => {
                    addToast({
                        type: 'success',
                        text: 'Successfully created!'
                    });
                    history.push('/admin');
                })
            }
        }
    };

    const onChangePublish = (e) => {
        setPublish(e.target.checked);
    }

    return (
        <div className="container">
            {/* <Toast 
                toasts={toasts}
                deleteToast={deleteToast}
            /> */}
            <h1>{editing ? 'Edit':'Create'} a blog post</h1>
            <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                    className={`form-control ${titleError ? 'border-danger': ''}`}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {titleError && <div className="text-danger">
                    Title is required.
                </div>}
            </div>

            <div className="mb-3">
                <label className="form-label">Body</label>
                <textarea
                    className={`form-control ${bodyError ? 'border-danger': ''}`}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows="10"
                />
                {bodyError && <div className="text-danger">
                    Body is required.
                </div>}
            </div>
            <div className="form-check mb-3">
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={publish}
                    onChange={onChangePublish}
                />
                Publish
            </div>
            <div>
                <button
                    className="btn btn-primary"
                    onClick={onSubmit}
                    disabled={editing && !isEdited()}
                    >
                        {editing? 'Edit':'Post'}
                </button>

                <button
                    className="btn btn-danger ms-2"
                    onClick={goBack}
                    >
                        Cancle
                </button>
            </div>
        </div>
    );
};

BlogForm.propTypes = {
    editing: propTypes.bool,
};


BlogForm.defaultProps = {
    editing: false
};


export default BlogForm;