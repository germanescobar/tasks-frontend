/* eslint-disable */
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AuthVerified = (props) => {
  const { token } = useParams();

  useEffect(() => {
    // api
    fetch(`http://localhost:3001/api/users/verified/${token}`)
      .then((resp) => resp.json())
      .then((data) => {
        // redirect
        // profile token
        console.log(data);
      });
  }, [token]);

  return <h1>hola</h1>;
};

export default AuthVerified;
