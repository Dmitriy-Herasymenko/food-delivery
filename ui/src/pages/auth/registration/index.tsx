import { useState } from 'react';
import { classNames } from './styles';
import { RegistrationApi } from '../../../shared/api';
import { useNavigate } from 'react-router-dom';


export const Registration = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const navigate = useNavigate();

  const LoginRequest = async () => {
    const data = {
      email,
      password,
      userName,
    };

    const response = await RegistrationApi(data);
    if(response) {
      navigate('/voiting');
    }
  };

  return (
    <div className={classNames.container}>
      <div className={classNames.formContainer}>
        <h1 className={classNames.heading}>Registration</h1>
        <form className='space-y-4'>
          <div>
            <label className={classNames.label}>
              <span className={classNames.labelText}>Email</span>
            </label>
            <input
              type='text'
              placeholder='Email Address'
              className={classNames.input}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className={classNames.label}>
              <span className={classNames.labelText}>User Name</span>
            </label>
            <input
              type='text'
              placeholder='User Name'
              className={classNames.input}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div>
            <label className={classNames.label}>
              <span className={classNames.labelText}>Password</span>
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              className={classNames.input}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
    
          <div>
            <button
              type='button'
              className={classNames.button}
              onClick={LoginRequest}
            >
              Registration
            </button>
            <div className={classNames.registrationWrapeer}>
          <span className={classNames.titleLink}>Have account?</span>
          <a href={`/login`} className={classNames.link}>
            Login
          </a>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
};
