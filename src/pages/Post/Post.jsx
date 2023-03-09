import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom ';
import { getPostByTitle } from '../../api/post';
import SpinCustomize from '../../components/Customs/Spin';
import './post.css';
import { HOUR_DATE_TIME } from '../../constants/format';

const Post = () => {
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState({});

    useEffect(() => {
        const title = params['*'];
        if (!title) return;
        setLoading(true);
        getPostByTitle(title)
            .then(({ data }) => {
                setPost(data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [params]);

    return (
        <div className="container relative mx-auto py-16">
            {loading ? (
                <div className="absolute top-1/2 left-1/2">
                    <SpinCustomize />
                </div>
            ) : (
                <div>
                    <h2 className="post-title-text">{post.title}</h2>
                    <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
                    <p className="post-date-text"> Ngày đăng: {dayjs(post.createdAt).format(HOUR_DATE_TIME)}</p>
                </div>
            )}
        </div>
    );
};

export default Post;
