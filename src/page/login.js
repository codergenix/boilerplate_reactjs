import React from 'react';
import { Card } from 'react-bootstrap';
import { Input, Button, notification, Checkbox } from 'antd';
import SimpleReactValidator from 'simple-react-validator';
import { useSelector, useDispatch } from 'react-redux';
// import _ from 'lodash';
import { loginUser, frontSelector, updateState } from '../store/Reducer/frontSlice';
import Service from '../Utils/service';
const LoginScreen = (props) => {
	const dispatch = useDispatch();
	const { isLogin, isFetchingOBJ, isError, errorMessage } = useSelector(frontSelector);
	//----
	const [formdata, setFormdata] = React.useState({
		email: localStorage.getItem('rememberedEmail') || '',
		password: localStorage.getItem('rememberedPassword') || '',
		rememberMe: localStorage.getItem('rememberedRememberMe')=="true" || false,
	});
	//---
	const LoginCheck = async () => {
		let isloginn = await Service.Getlogin();
		if (isloginn) {
			window.location.href = "/";
		}
	}
	React.useEffect(() => {
		LoginCheck();
	}, [])
	React.useEffect(() => {
		if (isError) {
			notification.error({ message: 'Error', description: errorMessage });
			dispatch(updateState({ isError: false,errorMessage:'' }));
		}
	}, [isError]);
	React.useEffect(() => {
		if (isLogin) {
			notification.success({ message: 'Success', description: `Login is Success` });
			setTimeout(() => {
				LoginCheck();
			}, 500);
		}
	}, [isLogin]);
	//----
	const [, forceUpdate] = React.useState();
	let validator = React.useRef(new SimpleReactValidator());
	validator.current.purgeFields();
	const handleSubmit = () => {
		if (validator.current.allValid()) {
			if (formdata.rememberMe) {
				localStorage.setItem('rememberedEmail', formdata.email);
				localStorage.setItem('rememberedPassword', formdata.password);
				localStorage.setItem('rememberedRememberMe', formdata.rememberMe);
			} else {
				localStorage.removeItem('rememberedEmail');
				localStorage.removeItem('rememberedPassword');
				localStorage.removeItem('rememberedRememberMe');
			}
			dispatch(loginUser(formdata));
			validator.current.hideMessages();
			forceUpdate(0);
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
						<img alt='logo' src={require('../assest/image/logo.png')} width={50} />
					</div>
					<Card.Title as="h3" className="my-3 text-center"> LOGIN </Card.Title>
					<div>
						<div className='mb-3'>
							<div className='form-label'> Email </div>
							<Input className="antinput-bootstrap" value={formdata.email} onChange={e => setFormdata({ ...formdata, email: e.target.value })} />
							{validator.current.message('Email', formdata.email, 'required|email')}
						</div>
						<div className='mb-3'>
							<div className='form-label'> Password </div>
							<Input.Password className="antinput-bootstrap" value={formdata.password} onChange={e => setFormdata({ ...formdata, password: e.target.value })} />
							{validator.current.message('Password', formdata.password, 'required|min:6')}
						</div>
						<div className='mb-3'>
							<Checkbox checked={formdata.rememberMe} onChange={e => setFormdata({ ...formdata, rememberMe: e.target.checked })} >Remember me</Checkbox>
						</div>
						<div className="mb-3 text-center">
							<Button type="primary" loading={isFetchingOBJ['loginUser'] || false} disabled={isFetchingOBJ['loginUser'] || false} shape="round" size="large" onClick={handleSubmit}> Login</Button>
						</div>
					</div>
				</Card.Body>
			</Card>
		</div>
	)
}
export default React.memo(LoginScreen) 