import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from "react";
import { useGetEmoPostByEnumQuery } from '../post/postApiSlice';
import '../css/likemodal.css';
import APIService from "../features/APIService";
import {Image} from "react-bootstrap";

function ListLike({ post, getLikeUser, getEnumEmo, currentPostId }) {
    const [selectedEmo, setSelectedEmo] = useState('all');
    const emojiList = getLikeUser.map(like => like.enumEmo);

    const { data: getEmoPostByEnum, refetch } = useGetEmoPostByEnumQuery(
        { postid: post.id, emoji: selectedEmo === 'all' ? '' : selectedEmo },
        { skip: selectedEmo === 'all' }
    );
    useEffect(() => {
        if (selectedEmo !== 'all') {
            refetch();
        }
    }, [selectedEmo, refetch]);

    const handleLikeEmoUser = (emoji) => {
        setSelectedEmo(emoji);
    }

    const displayedLikes = selectedEmo === 'all' ? getLikeUser : getEmoPostByEnum || [];

    return (
        <div>
            <div className="modallike">
                <Modal.Header closeButton>
                    <Modal.Title className="modalpost-title">
                        <div className="modalpost-emoji">
                            <div className="modalpost-emojiall" onClick={() => handleLikeEmoUser('all')}>Tất cả</div>
                            {emojiList.includes('👍') && (
                                <div className="modalpost-emojiall" onClick={() => handleLikeEmoUser('👍')}>👍</div>
                            )}
                            {emojiList.includes('❤️') && (
                                <div className="modalpost-emojiall" onClick={() => handleLikeEmoUser('❤️')}>❤️</div>
                            )}
                            {emojiList.includes('😂') && (
                                <div className="modalpost-emojiall" onClick={() => handleLikeEmoUser('😂')}>😂</div>
                            )}
                            {emojiList.includes('😡') && (
                                <div className="modalpost-emojiall" onClick={() => handleLikeEmoUser('😡')}>😡</div>
                            )}
                            {emojiList.includes('😢') && (
                                <div className="modalpost-emojiall" onClick={() => handleLikeEmoUser('😢')}>😢</div>
                            )}
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {displayedLikes.map((like) => (
                            <div className="post-showlikeuser row" key={like.id}>
                                <div className="post-showlikeuser-left col-sm-6">
                                    <div>
                                    {like.gender=='female'?
                                        <Image src={`${APIService.URL_REST_API}/files/user_female.png`} style={{width:"50px",height: "50px"}}roundedCircle />
                                        :<Image src={`${APIService.URL_REST_API}/files/user_male.png`} style={{width:"50px",height: "50px"}}roundedCircle />
                                    }
                                    </div>
                                    <div className="post-showlikeuser-name">{like.username}</div>
                                </div>
                                <div className="post-showlikeuser-right col-sm-6">
                                    <button className="post-showlikeuser-addfriend">Add Friend</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Modal.Body>
            </div>
        </div>
    );
}

export default ListLike;
