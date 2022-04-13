import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as dummyActions from '../store/actions/dummy';
import useActions from '../hooks/useActions';
import User from '../components/Dummy/User';
import Friend from '../components/Dummy/Friend';

function Dummy() {
  const [isLoading, setIsLoading] = useState(false);
  const data = {
    dummy: useSelector((state) => state.dummy),
  };
  const actions = {
    dummy: useActions(dummyActions),
  };
  const onSuccess = () => {
    setIsLoading(false);
  };
  const onError = (err) => {
    try {
      const { status } = err.response;
      switch (status) {
        case 404:
          break;

        case 401:
          break;

        default: break;
      }
    } catch (e) {
      // Do something
    } finally {
      setIsLoading(false);
    }
  };
  const fetchData = () => {
    setIsLoading(true);
    actions.dummy.fetchData(onSuccess, onError);
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (isLoading) {
    return (
      <div>Loading...</div>
    );
  }
  return (
    <div>
      <User user={data.dummy.user} />
      <h1>Friends:</h1>
      <Friend friends={data.dummy.friends} />
    </div>
  );
}

export default Dummy;
