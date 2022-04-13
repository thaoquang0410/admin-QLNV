
import redirectError from './../routes/redirect';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { loadSuccess } from '../store/actions/common';
import { TIME_CLOSE } from './../config/constants';
import { useHistory } from 'react-router-dom';

export const useCondition = ()=>{
  const dispatch = useDispatch();
  const history = useHistory();
  const onSuccess = () => {
    dispatch(loadSuccess());
  };
  const onError = (code, message) => {
    toast.error(message,{autoClose: TIME_CLOSE});
    dispatch(loadSuccess());
    redirectError(code, history);
  };

  return {onSuccess, onError}
}