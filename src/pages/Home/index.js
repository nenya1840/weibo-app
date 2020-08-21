import React from 'react';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useMappedState } from 'redux-react-hook';
import InfiniteScroll from 'react-infinite-scroller';
import { Row, Affix } from 'antd';
import { Link } from 'react-router-dom';
import { getHomeTimeline } from '../../actions/timeline';
import { LOGIN_URL } from '../../constants';
import Post from './components/post';
import CommentsList from './components/commentsList';
import styles from './index.module.scss';

const mapStateTimeline = state => state.timeline;

const Home = () => {
  const dispatch = useDispatch();
  const {
    home: { posts = [], page } = {},
    current
  } = useMappedState(mapStateTimeline);
  const handleInfiniteOnLoad = () => {
    dispatch(getHomeTimeline({ page: page + 1 }));
  }

  return (
    <div className={styles.container}>
      <Affix offsetTop={0}>
        <Row
          className={styles.appbar}
          justify="space-between"
          align="middle"
        >
          <a href={LOGIN_URL}><UserOutlined className={styles.icon} /></a>
          <div className={styles.appTitle}>Weibo app</div>
          <Link to="/new"><EditOutlined className={styles.icon} /></Link>
        </Row>
      </Affix>
      <InfiniteScroll
        initialLoad
        pageStart={1}
        loadMore={handleInfiniteOnLoad}
        hasMore
      >
        {
          posts.map(({
            id,
            ...rest
          }) => (
            <>
              <Post
                key={id}
                id={id}
                isCurrent={current === id}
                {...rest}
              />
              {
                current === id &&
                <CommentsList id={current} />
              }
            </>
          ))
        }
      </InfiniteScroll>
    </div>
  );
};

export default Home;