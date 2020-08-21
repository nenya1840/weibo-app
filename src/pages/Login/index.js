import React, { useEffect } from 'react';
import queryString from 'query-string';
import { useDispatch } from 'redux-react-hook';
import { getAccess } from 'actions/account';


const Login = () => {
  const dispatch = useDispatch();
  const { query: { code }} = queryString.parseUrl(window.location.href);
  useEffect(() => {
    if (code) {
      dispatch(getAccess({ code }));
    }
  }, [code, dispatch]);
  return <div>{code}</div>
}

export default Login;
