import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/comments',
});

const CommentSection = () => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [showReplies, setShowReplies] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await api.get();
        const processedComments = data.map(comment => ({
          ...comment,
          replies: comment.replies || []
        }));
        setComments(processedComments);
      } catch (err) {
        setError('Failed to load comments');
        console.error(err);
        Swal.fire('Error', 'Failed to load comments', 'error');
      }
    };
    fetchComments();
    const storedReplies = JSON.parse(localStorage.getItem('showReplies')) || {};
    setShowReplies(storedReplies);
  }, []);

  const handleSubmit = async () => {
    if (!commentText.trim()) return;
    setLoading(true);
    setError(null);

    const newComment = {
      author: 'Current User',
      avatarUrl: '/default-avatar.png',
      content: commentText.trim(),
      verified: false,
      reply: false,
      replyTo: null,
      replies: []
    };

    try {
      const { data: saved } = await api.post('', newComment);
      setComments(prev => [saved, ...prev]);
      setCommentText('');
      Swal.fire('Success', 'Comment posted!', 'success');
    } catch (err) {
      setError('Failed to submit comment');
      console.error(err);
      Swal.fire('Error', 'Failed to submit comment', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (id) => {
    try {
      const { data: updated } = await api.put(`/${id}/like`);
      setComments(prev =>
        prev.map(c => (c.id === id ? { ...c, likes: updated.likes } : c))
      );
    } catch (err) {
      console.error('Like failed', err);
      Swal.fire('Error', 'Failed to like comment', 'error');
    }
  };

  const handleDislike = async (id) => {
    try {
      const { data: updated } = await api.put(`/${id}/dislike`);
      setComments(prev =>
        prev.map(c => (c.id === id ? { ...c, dislikes: updated.dislikes } : c))
      );
    } catch (err) {
      console.error('Dislike failed', err);
      Swal.fire('Error', 'Failed to dislike comment', 'error');
    }
  };

  const handleReply = async (parentId) => {
    if (!replyText.trim()) return;
    try {
      const reply = {
        author: 'Current User',
        avatarUrl: '/default-avatar.png',
        content: replyText.trim(),
        verified: false,
        replyTo: parentId,
      };
      const { data: savedReply } = await api.post(`/${parentId}/reply`, reply);
      setComments(prev =>
        prev.map(comment =>
          comment.id === parentId
            ? { ...comment, replies: [...(comment.replies || []), savedReply] }
            : comment
        )
      );
      setReplyingTo(null);
      setReplyText('');
      Swal.fire('Success', 'Reply posted!', 'success');
    } catch (err) {
      console.error('Reply failed', err);
      Swal.fire('Error', 'Failed to post reply', 'error');
    }
  };

  const handleToggleReplies = async (commentId) => {
    const newShowReplies = { ...showReplies, [commentId]: !showReplies[commentId] };
    setShowReplies(newShowReplies);
    localStorage.setItem('showReplies', JSON.stringify(newShowReplies));

    if (!showReplies[commentId]) {
      try {
        const { data: replies } = await api.get(`/${commentId}/replies`);
        setComments(prev =>
          prev.map(comment =>
            comment.id === commentId
              ? { ...comment, replies: replies || [] }
              : comment
          )
        );
      } catch (err) {
        console.error('Failed to load replies', err);
        Swal.fire('Error', 'Failed to load replies', 'error');
      }
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this comment? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/${id}`);
        setComments(prev => prev.filter(c => c.id !== id));
        Swal.fire('Deleted!', 'Your comment has been deleted.', 'success');
      } catch (err) {
        console.error('Delete failed', err);
        setError('Failed to delete comment');
        Swal.fire('Error', 'Failed to delete comment', 'error');
      }
    }
  };

  // Edit handlers
  const handleEditClick = (id, currentContent) => {
    setEditingId(id);
    setEditText(currentContent);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleSaveEdit = async (id) => {
    if (!editText.trim()) return;
    try {
      const { data: updated } = await api.put(`/${id}`, { content: editText.trim() });
      setComments(prev => prev.map(c => c.id === id ? { ...c, content: updated.content } : c));
      setEditingId(null);
      setEditText('');
      Swal.fire('Success', 'Comment updated!', 'success');
    } catch (err) {
      console.error('Edit failed', err);
      setError('Failed to edit comment');
      Swal.fire('Error', 'Failed to update comment', 'error');
    }
  };

  const formatDate = (iso) => new Date(iso).toLocaleString();

  const styles = {
    container: { fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '0 auto', backgroundColor: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', marginTop: '100px' },
    commentForm: { backgroundColor: '#f5f5f5', borderRadius: '8px', padding: '20px', marginBottom: '20px' },
    textarea: { width: '100%', border: 'none', backgroundColor: 'transparent', resize: 'none', height: '60px', outline: 'none', color: '#333', fontSize: '16px' },
    toolbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' },
    submitButton: { backgroundColor: '#4a4a8a', color: 'white', border: 'none', borderRadius: '20px', padding: '10px 20px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' },
    divider: { borderBottom: '1px solid #e0e0e0', margin: '20px 0' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    commentsTitle: { display: 'flex', alignItems: 'center', fontWeight: 'bold', fontSize: '18px' },
    commentCount: { backgroundColor: '#4a4a8a', color: 'white', borderRadius: '50px', padding: '2px 8px', fontSize: '14px', marginLeft: '10px' },
    commentsList: { display: 'flex', flexDirection: 'column', gap: '20px' },
    comment: { display: 'flex', gap: '15px' },
    reply: { marginLeft: '55px', display: 'flex', gap: '15px' },
    avatar: { width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' },
    commentContent: { flex: 1 },
    commentHeader: { display: 'flex', alignItems: 'center', marginBottom: '5px' },
    author: { fontWeight: 'bold', marginRight: '8px' },
    verifiedBadge: { color: '#2196F3', marginRight: '8px' },
    timestamp: { color: '#777', fontSize: '14px' },
    commentText: { fontSize: '16px', lineHeight: '1.4', marginBottom: '10px' },
    commentActions: { display: 'flex', gap: '15px', alignItems: 'center' },
    replyList: { marginTop: '10px' },
    actionButton: { background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', color: '#555', fontSize: '14px' },
  };

  return (
    <div style={styles.container}>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

      <div style={styles.commentForm}>
        <textarea
          placeholder="Add comment..."
          style={styles.textarea}
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
        />
        <div style={styles.toolbar}>
          <button style={styles.submitButton} onClick={handleSubmit} disabled={loading}>
            {loading ? 'Submitting...' : 'Post Comment'}
          </button>
        </div>
      </div>

      <div style={styles.divider}></div>

      <div style={styles.header}>
        <div style={styles.commentsTitle}>
          Comments
          <span style={styles.commentCount}>{comments.length}</span>
        </div>
      </div>

      <div style={styles.commentsList}>
        {comments.map(comment => (
          <div key={comment.id} style={styles.comment}>
            <img src={comment.avatarUrl} alt={comment.author} style={styles.avatar} />
            <div style={styles.commentContent}>
              <div style={styles.commentHeader}>
                <span style={styles.author}>{comment.author}</span>
                {comment.verified && <span style={styles.verifiedBadge}>✔</span>}
                <span style={styles.timestamp}>{formatDate(comment.createdAt)}</span>
              </div>

              {editingId === comment.id ? (
                <>
                  <textarea
                    style={styles.textarea}
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                  />
                  <div style={styles.toolbar}>
                    <button style={styles.submitButton} onClick={() => handleSaveEdit(comment.id)}>Save</button>
                    <button style={styles.submitButton} onClick={handleCancelEdit}>Cancel</button>
                  </div>
                </>
              ) : (
                <p style={styles.commentText}>{comment.content}</p>
              )}

              <div style={styles.commentActions}>
                <button style={styles.actionButton} onClick={() => handleLike(comment.id)}>👍 {comment.likes}</button>
                <button style={styles.actionButton} onClick={() => handleDislike(comment.id)}>👎 {comment.dislikes}</button>
                <button style={styles.actionButton} onClick={() => setReplyingTo(comment.id)}>💬 Reply</button>
                <button style={styles.actionButton} onClick={() => handleEditClick(comment.id, comment.content)}>✏️ Edit</button>
                <button style={styles.actionButton} onClick={() => handleDelete(comment.id)}>🗑 Delete</button>
                <button style={styles.actionButton} onClick={() => handleToggleReplies(comment.id)}>
                  {showReplies[comment.id] ? '⬆ Hide Replies' : '⬇ Show Replies'}
                </button>
              </div>

              {showReplies[comment.id] && (
                <div style={styles.replyList}>
                  {comment.replies.map((reply) => (
                    <div key={reply.id} style={styles.reply}>
                      <img src={reply.avatarUrl} alt={reply.author} style={styles.avatar} />
                      <div style={styles.commentContent}>
                        <div style={styles.commentHeader}>
                          <span style={styles.author}>{reply.author}</span>
                          <span style={styles.timestamp}>{formatDate(reply.createdAt)}</span>
                        </div>
                        <p style={styles.commentText}>{reply.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {replyingTo === comment.id && (
                <div style={{ marginTop: '10px' }}>
                  <textarea
                    placeholder="Add reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    style={styles.textarea}
                  />
                  <button style={styles.submitButton} onClick={() => handleReply(comment.id)}>
                    {loading ? 'Submitting...' : 'Post Reply'}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;