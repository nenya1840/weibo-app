import React from 'react';
import { Card } from 'antd';
import { RetweetOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useDispatch } from 'redux-react-hook';
import { setCurrentPost } from 'actions/timeline';
import styles from './index.module.scss';



const getPostTitle = (
  user,
  created_at,
  source,
) => (
  <div className={styles.user}>
    <img
      src={user.profile_image_url}
      className={styles.avatar}
      alt={user.screen_name}
    />
    <div className={styles.userInfo}>
      <div>{user.screen_name}</div>
      <div className={styles.extra}>
        {moment(created_at).fromNow()} 来自 <span dangerouslySetInnerHTML={{ __html: source }} />
      </div>
    </div>
  </div>
);

const Post = ({
  id,
  text,
  user,
  created_at,
  source,
  pic_urls,
  reposts_count,
  attitudes_count,
  comments_count,
  retweeted_status,
  type,
  isCurrent,
}) => {
  const dispatch = useDispatch();
  const handleClickComment = () => {
    if (!comments_count) {
      window.location.href = `/comments/${id}`;
    } else {
      dispatch(setCurrentPost({ id: isCurrent ? null : id }));
    }
  }

  return (
    <Card
      type={type}
      className={styles.post}
      bordered={false}
      hoverable
      title={
        getPostTitle(
          user,
          created_at,
          source,
        )
      }
      actions={type ? [] : [
        <div>
          <RetweetOutlined key="retweet" />
          <span> {reposts_count || ''}</span>
        </div>,
        <div>
          <LikeOutlined key="like" />
          <span> {attitudes_count || ''}</span>
        </div>,
        <div onClick={handleClickComment}>
          <MessageOutlined key="message" />
          <span> {comments_count || ''}</span>
        </div>,
      ]}
    >
      <div className={styles.content}>
        <div className={styles.text}>
          {text}
          {
            retweeted_status &&
            <Post type="inner" {...retweeted_status} />
          }
        </div>
        <ul className={styles.images}>
          {
            pic_urls.map(({ thumbnail_pic }) => (
              <li key={thumbnail_pic} className={styles.imgWrapper}>
                <div className={styles.imgContainer}>
                  <img src={thumbnail_pic} alt={thumbnail_pic} />
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </Card>
  )
}

export default Post;
