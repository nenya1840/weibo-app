import { message } from 'antd';
import * as api from '../api/comments';
import { GET_COMMENTS, RESET_COMMENTS, ADD_COMMENT, REMOVE_COMMENT } from '../constants/actions';

export function createComment(params = {}, isFirst) {
  return async (dispatch) => {
    try {
      const result = await api.createComment(params);
      if (result) {
        message.success('评论成功!');
        if (!isFirst) {
          dispatch({
            type: ADD_COMMENT,
            payload: result,
          })
        }
      }
    } catch(e) {
      message.error(e.message || '评论失败!');
    }
  }
}


export function getComments(params = {}) {
  return async (dispatch) => {
    const { comments = [], total_number = 0 } = await api.getComments(params);
    dispatch({
      type: GET_COMMENTS,
      payload: {
        comments,
        params,
        total: total_number,
      },
    })
  }
}


export function resetComments() {
  return async (dispatch) => {
    dispatch({
      type: RESET_COMMENTS,
    })
  }
}


export function deleteComment(payload = {}) {
  return async (dispatch) => {
    const { id } = await api.deleteComment(payload);
    if (id) {
      message.success('删除评论成功！');
      dispatch({
        type: REMOVE_COMMENT,
        payload: id,
      })
    }
  }
}
