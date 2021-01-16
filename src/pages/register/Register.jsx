import { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postData } from '../../library/AxiosLib';
import { ServerURL } from '../../config/default.json';
import LoadingIcon from '../../assets/icon/LoadingIcon';
import './Register.css';

export default function Register() {
  const [formRegister, setFormRegister] = useState({});
  const [loading, setLoading] = useState(false);

  const inputEmail = useRef(null);
  const inputUsername = useRef(null);
  const inputPassword = useRef(null);
  const inputVerify = useRef(null);

  const history = useHistory();

  async function handleSubmit(e) {
    setLoading(true);
    if (formRegister.password === formRegister.verify) {
      const postDataRs = postData(`${ServerURL}/user`, formRegister)
        .then(function () {
          history.push('/login');
        })
        .catch(function (error) {
          if (error.response.status === 404) {
            alert('account alredy register');
          }
        });

      postDataRs && setLoading(false);
    } else {
      alert('password not match');
    }

    inputEmail.current.value = null;
    inputUsername.current.value = null;
    inputPassword.current.value = null;
    inputVerify.current.value = null;

    e.preventDefault();
  }

  function handleChange(e) {
    setFormRegister({ ...formRegister, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    document.title = 'Register';
    return () => {
      setFormRegister(null);
    };
  }, []);

  return (
    <div className='register'>
      <form onSubmit={handleSubmit}>
        <span>Register</span>
        <input
          required
          autoComplete='off'
          name='username'
          type='text'
          placeholder='username'
          onChange={handleChange}
          ref={inputUsername}
        />
        <input
          required
          autoComplete='off'
          name='email'
          type='text'
          placeholder='email'
          onChange={handleChange}
          ref={inputEmail}
        />
        <input
          required
          autoComplete='off'
          name='password'
          type='password'
          placeholder='password'
          onChange={handleChange}
          ref={inputPassword}
        />
        <input
          required
          autoComplete='off'
          name='verify'
          type='password'
          placeholder='password verify'
          onChange={handleChange}
          ref={inputVerify}
        />
        <button type='submit'>
          {' '}
          {loading ? <LoadingIcon width={'25px'} color={'white'} id={'iconLoading'} /> : 'Submit'}
        </button>
        <Link to='/login'>Login</Link>
      </form>
    </div>
  );
}
