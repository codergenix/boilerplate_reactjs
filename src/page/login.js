import React, { useState, useEffect, useRef } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { Card, Form, Image } from 'react-bootstrap';
import { Input, Button as AntButton,notification } from 'antd';
import moment from 'moment';
import Service from '../Utils/service';

import SimpleReactValidator from 'simple-react-validator';
import { useSelector, useDispatch } from 'react-redux';
// import _ from 'lodash';
import { loginUser, loginSelector, clearState } from '../store/Reducer/login';

const Login = (props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isLogin, isFetching, isError,errorMessage } = useSelector(loginSelector);

	const [, forceUpdate] = useState();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	
	useEffect(()=>{
		var loginstatus = Service.getlogin();
			if (loginstatus) {
		   		navigate('/user');
			}
	  },[])

	useEffect(() => {
		if (isError) {
			dispatch(clearState());
			notification.error({
				message: 'Error',
				description:errorMessage,
			});
		}
		if (isLogin) {
			notification.success({
				message: 'Success',
				description:`Login is Success`,
			});
			dispatch(clearState());
			navigate('/user');
		}
	}, [isError, isLogin]);

	let validator = useRef(new SimpleReactValidator());

	const handleSubmit = (e) => {
		e.preventDefault(props);
		if (validator.current.allValid()) {
			let userData = {
				Email: email,
				Password: password,
			};
			dispatch(loginUser(userData));
		} else {
			validator.current.showMessages();
			forceUpdate(1);
		}
	};

	return (
		<div className="login-sec-wrap py-5">
			<Card className="mx-auto card-login mw-450" >
				<Card.Body>
					<div className="text-center">
						<Image src={require('../assest/image/logo.png').default} width={200} />
					</div>
					<Card.Title as="h3" className="my-3 text-center"> LOGIN </Card.Title>
					<Form onSubmit={handleSubmit}>
						<div className='mb-3'>
							<div className='form-label'> Email </div>
							<Input className="antinput-bootstrap" value={email} onChange={e => setEmail(e.target.value)} />
							{validator.current.message('email', email, 'required|email')}
						</div>
						<div className='mb-3'>
							<div className='form-label'> Password </div>
							<Input.Password className="antinput-bootstrap" value={password} onChange={e => setPassword(e.target.value)} />
							{validator.current.message('field', password, 'required|min:6')}
						</div>
						<div className="mb-3 text-center">
							<AntButton htmlType="submit" type="primary" loading={isFetching} shape="round" size="large"> Login</AntButton>
						</div>
					</Form>
				</Card.Body>
			</Card>
		</div>
	)
}
export default Login