import { GET_HOME_TIMELINE, SET_CURRENT_POST } from "../constants/actions";

const initState = {
  home: { posts: [], page: 0}
};

export default function reducer(state = initState, action) {
  const { statuses, id } = action.payload || {};
  const { page } = action.params || {};
  switch (action.type) {
    case GET_HOME_TIMELINE:
      return {
        ...state,
        home: {
          posts: [...state.home.posts, ...statuses],
          page,
        },
      }
    case SET_CURRENT_POST:
      return {
        ...state,
        current: id,
      }
    default:
      return state;
  }
}

