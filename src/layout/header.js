import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap';
import { Avatar, notification } from 'antd';
import Service from '../Utils/service';
import { frontSelector, updateState } from '../store/Reducer/frontSlice';
import { useDispatch, useSelector } from 'react-redux';
import ModalChangePassword from '../components/Modal/ModalChangePassword';
import ModalProfileUpdate from '../components/Modal/ModalProfileUpdate';
import axiosConfig from '../Utils/axiosConfig';
import dayjs from 'dayjs';
//---
const HeaderComponent = () => {
	const dispatch = useDispatch();
	const { loginData, isError, errorMessage } = useSelector(frontSelector);
	//---
	const [ModalOpen, setModalOpen] = React.useState(false);
	const [ModalOpen2, setModalOpen2] = React.useState(false);
	const handlerLogout = () => {
		Service.Logout();
	};
	const handlerChangePassword = () => {
		setModalOpen(true)
	};
	const handlerProfileEdit = () => {
		setModalOpen2(true)
	};
	React.useEffect(() => {
		if (isError) {
			notification.error({ message: 'Error', description: errorMessage });
			dispatch(updateState({ isError: false, errorMessage: '' }));
		}
	}, [isError]);
	// axiosConfig.interceptors.request.use(function (config) {
	// 	if (loginData?.tokenExpiration && config?.url !== 'refresh-token') {
	// 		const nowDate = dayjs()
	// 		const expiresDate = dayjs(loginData?.tokenExpiration)
	// 		const diffMinutes = expiresDate.diff(nowDate, 'minute');
	// 		console.log('token expiration: minuts', diffMinutes);
	// 	}
	// 	return config;
	// });
	return (
		<Container>
			<Navbar variant={"default"}>
				<Link className="navbar-brand" to="/"><img alt="nav-logo" width={50} src={require('../assest/image/logo.png')} /></Link>
				<Nav className="ps-lg-3 ms-auto">
					{loginData &&
						<Dropdown>
							<Dropdown.Toggle variant="link0" className="p-0 d-inline-flex align-items-center underlinenone">
								<Avatar className="bg-default" size={45} src={Service.getImageBase64Type(loginData.avatar)} >{loginData?.name?.charAt(0)} </Avatar>
								<div className="px-2">
									<div>{loginData.name}</div>
								</div>
							</Dropdown.Toggle>
							<Dropdown.Menu align="right">
								<Dropdown.Item href={null} onClick={handlerProfileEdit}>Profile Edit </Dropdown.Item>
								<Dropdown.Item href={null} onClick={handlerChangePassword}>Change Password </Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item href={null} onClick={handlerLogout}>Logout </Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					}
				</Nav>
			</Navbar>
			<ModalChangePassword
				open={ModalOpen}
				setOpen={setModalOpen}
			/>
			<ModalProfileUpdate
				open={ModalOpen2}
				setOpen={setModalOpen2}
			/>
		</Container>
	);
}
//---
export default React.memo(HeaderComponent);