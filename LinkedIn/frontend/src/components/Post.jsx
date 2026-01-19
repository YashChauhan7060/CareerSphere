import React, { useContext, useEffect, useState } from 'react'
import dp from "../assets/dp.webp"
import moment from "moment"
import { MessageCircle, ThumbsUp, Send, MoreHorizontal, Bookmark, Share2, Globe } from 'lucide-react'
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import { userDataContext } from '../context/userContext'
import { io } from "socket.io-client"
import ConnectionButton from './ConnectionButton'

let socket = io("http://localhost:8000")

function Post({ id, author, like, comment, description, image, createdAt, darkMode }) {
    let [more, setMore] = useState(false)
    let { serverUrl } = useContext(authDataContext)
    let { userData, getPost, handleGetProfile } = useContext(userDataContext)
    let [likes, setLikes] = useState(like)
    let [commentContent, setCommentContent] = useState("")
    let [comments, setComments] = useState(comment)
    let [showComment, setShowComment] = useState(false)
    let [isLiked, setIsLiked] = useState(like.includes(userData._id))

    const handleLike = async () => {
        try {
            let result = await axios.get(serverUrl + `/api/post/like/${id}`, { withCredentials: true })
            setLikes(result.data.like)
            setIsLiked(result.data.like.includes(userData._id))
        } catch (error) {
            console.log(error)
        }
    }

    const handleComment = async (e) => {
        e.preventDefault()
        if (!commentContent.trim()) return
        try {
            let result = await axios.post(serverUrl + `/api/post/comment/${id}`, {
                content: commentContent
            }, { withCredentials: true })
            setComments(result.data.comment)
            setCommentContent("")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        socket.on("likeUpdated", ({ postId, likes }) => {
            if (postId === id) {
                setLikes(likes)
                setIsLiked(likes.includes(userData._id))
            }
        })
        socket.on("commentAdded", ({ postId, comm }) => {
            if (postId === id) {
                setComments(comm)
            }
        })

        return () => {
            socket.off("likeUpdated")
            socket.off("commentAdded")
        }
    }, [id])

    useEffect(() => {
        getPost()
    }, [likes, comments])

    // Theme classes
    const cardBg = darkMode ? 'bg-gray-800' : 'bg-white'
    const textPrimary = darkMode ? 'text-white' : 'text-gray-900'
    const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600'
    const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200'
    const hoverBg = darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
    const inputBg = darkMode ? 'bg-gray-700' : 'bg-white'
    const commentBg = darkMode ? 'bg-gray-900/50' : 'bg-gray-50'
    const commentBubble = darkMode ? 'bg-gray-700' : 'bg-gray-100'

    return (
        <div className={`w-full ${cardBg} rounded-2xl shadow-lg border ${borderColor} overflow-hidden transition-all duration-500 ease-in-out hover:shadow-xl`}>
            {/* Post Header */}
            <div className='p-5 pb-4'>
                <div className='flex justify-between items-start'>
                    <div 
                        className='flex gap-3 cursor-pointer group flex-1'
                        onClick={() => handleGetProfile(author.userName)}
                    >
                        <div className='relative w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-indigo-600 flex-shrink-0 shadow-md ring-2 ring-gray-100 dark:ring-gray-700'>
                            <img src={author.profileImage || dp} alt="" className='w-full h-full object-cover' />
                            <div className='absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800'></div>
                        </div>
                        <div className='flex-1 min-w-0'>
                            <h3 className={`text-base font-bold ${textPrimary} group-hover:text-blue-600 transition-colors truncate`}>
                                {`${author.firstName} ${author.lastName}`}
                            </h3>
                            {author.headline && (
                                <p className={`text-sm ${textSecondary} truncate mt-0.5`}>
                                    {author.headline}
                                </p>
                            )}
                            <div className='flex items-center gap-2 mt-1'>
                                <span className='text-xs text-gray-500'>
                                    {moment(createdAt).fromNow()}
                                </span>
                                <span className='text-gray-400'>•</span>
                                <Globe className='w-3 h-3 text-gray-500' />
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center gap-2'>
                        {userData._id !== author._id && <ConnectionButton userId={author._id} />}
                        <button className={`w-9 h-9 rounded-full ${hoverBg} flex items-center justify-center transition-colors`}>
                            <MoreHorizontal className={`w-5 h-5 ${textSecondary}`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Post Content */}
            <div className='px-5 pb-3'>
                <div className={`${textPrimary} text-[15px] leading-relaxed ${!more ? "line-clamp-3" : ""}`}>
                    {description}
                </div>
                {description && description.length > 150 && (
                    <button 
                        onClick={() => setMore(prev => !prev)}
                        className='text-sm font-semibold text-blue-600 hover:text-blue-700 mt-2 transition-colors'
                    >
                        {more ? "Show less" : "...see more"}
                    </button>
                )}
            </div>

            {/* Post Image */}
            {image && (
                <div className={`w-full overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                    <img src={image} alt="" className='w-full h-auto object-cover' />
                </div>
            )}

            {/* Engagement Stats */}
            <div className={`px-5 py-3 flex items-center justify-between border-b ${borderColor}`}>
                <div className='flex items-center gap-2'>
                    {likes.length > 0 && (
                        <>
                            <div className='flex items-center -space-x-1'>
                                <div className='w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center border-2 border-white dark:border-gray-800'>
                                    <ThumbsUp className='w-3 h-3 text-white' fill='white' />
                                </div>
                            </div>
                            <span className={`text-sm ${textSecondary} hover:text-blue-600 cursor-pointer transition-colors`}>
                                {likes.length} {likes.length === 1 ? 'like' : 'likes'}
                            </span>
                        </>
                    )}
                </div>
                <div className={`flex items-center gap-4 text-sm ${textSecondary}`}>
                    <button 
                        onClick={() => setShowComment(prev => !prev)}
                        className='hover:text-blue-600 transition-colors'
                    >
                        {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
                    </button>
                </div>
            </div>

            {/* Action Buttons */}
            <div className={`px-3 py-2 flex items-center justify-around border-b ${borderColor}`}>
                <button 
                    onClick={handleLike}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg ${hoverBg} transition-all group ${
                        isLiked ? 'text-blue-600' : textSecondary
                    }`}
                >
                    <ThumbsUp 
                        className={`w-5 h-5 transition-all ${isLiked ? 'fill-current scale-110' : 'group-hover:scale-110'}`} 
                    />
                    <span className='font-semibold text-sm'>
                        {isLiked ? 'Liked' : 'Like'}
                    </span>
                </button>

                <button 
                    onClick={() => setShowComment(prev => !prev)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg ${hoverBg} ${textSecondary} transition-all group`}
                >
                    <MessageCircle className='w-5 h-5 group-hover:scale-110 transition-transform' />
                    <span className='font-semibold text-sm'>Comment</span>
                </button>

                <button className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg ${hoverBg} ${textSecondary} transition-all group`}>
                    <Share2 className='w-5 h-5 group-hover:scale-110 transition-transform' />
                    <span className='font-semibold text-sm'>Share</span>
                </button>

                <button className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg ${hoverBg} ${textSecondary} transition-all group`}>
                    <Bookmark className='w-5 h-5 group-hover:scale-110 transition-transform' />
                    <span className='font-semibold text-sm'>Save</span>
                </button>
            </div>

            {/* Comments Section */}
            {showComment && (
                <div className={commentBg}>
                    {/* Add Comment Input */}
                    <form 
                        className={`px-5 py-4 flex items-center gap-3 border-b ${borderColor}`}
                        onSubmit={handleComment}
                    >
                        <div className='w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-indigo-600 flex-shrink-0'>
                            <img src={userData.profileImage || dp} alt="" className='w-full h-full object-cover' />
                        </div>
                        <div className={`flex-1 flex items-center gap-2 ${inputBg} rounded-full px-4 py-2 border ${borderColor} focus-within:border-blue-400 transition-colors`}>
                            <input 
                                type="text" 
                                placeholder="Write a comment..." 
                                className={`flex-1 outline-none bg-transparent ${textPrimary} text-sm placeholder-gray-500`}
                                value={commentContent}
                                onChange={(e) => setCommentContent(e.target.value)}
                            />
                            <button 
                                type='submit'
                                disabled={!commentContent.trim()}
                                className='disabled:opacity-40 disabled:cursor-not-allowed'
                            >
                                <Send className="w-5 h-5 text-blue-600 hover:scale-110 transition-transform" />
                            </button>
                        </div>
                    </form>

                    {/* Comments List */}
                    <div className='max-h-[400px] overflow-y-auto'>
                        {comments.map((com) => (
                            <div 
                                key={com._id} 
                                className={`px-5 py-4 ${hoverBg} transition-colors`}
                            >
                                <div className="flex gap-3">
                                    <div className='w-9 h-9 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-indigo-600 flex-shrink-0 mt-1'>
                                        <img src={com.user.profileImage || dp} alt="" className='w-full h-full object-cover' />
                                    </div>
                                    <div className='flex-1 min-w-0'>
                                        <div className={`${commentBubble} rounded-2xl px-4 py-2.5 inline-block max-w-full`}>
                                            <h4 className={`text-sm font-bold ${textPrimary}`}>
                                                {`${com.user.firstName} ${com.user.lastName}`}
                                            </h4>
                                            <p className={`text-sm ${textPrimary} mt-0.5 break-words`}>
                                                {com.content}
                                            </p>
                                        </div>
                                        <div className='flex items-center gap-4 mt-2 ml-4 text-xs text-gray-500'>
                                            <button className='hover:text-blue-600 font-semibold transition-colors'>
                                                Like
                                            </button>
                                            <button className='hover:text-blue-600 font-semibold transition-colors'>
                                                Reply
                                            </button>
                                            <span>{moment(com.createdAt).fromNow()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Post