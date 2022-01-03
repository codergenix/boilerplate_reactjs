import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Image, Navbar, Nav, Form, FormControl, Dropdown } from 'react-bootstrap';
import { Row, Col, Avatar, Select } from 'antd';

import Service from '../Utils/service';

const Header = (props) => {

	const navigate = useNavigate();

	const userData = Service.getUserData() || {};

	const onLogout = () => {
		var logoutstatus = Service.logout();
		if (logoutstatus) {
			navigate('/');
		}
	};

	return (
		<Container>
			<Navbar variant={"default"}>
				<Link className="navbar-brand" to="/"><Image width={50} src={require('../assest/image/logo.png')} /></Link>
				<Nav className="ps-lg-3 ms-auto">
					{!Service.getlogin() ? <Link className="nav-link" to="/"> Login </Link> :
						<Dropdown>
							<Dropdown.Toggle variant="link0" className="p-0 d-inline-flex align-items-center underlinenone">
								<Avatar className="bg-default" size={50} >{userData.FirstName && userData.FirstName.charAt(0)}{userData.LastName && userData.LastName.charAt(0)} </Avatar>
								<div className="px-2">
									<div>{userData.FirstName} {userData.LastName}</div>
								</div>
							</Dropdown.Toggle>
							<Dropdown.Menu align="right">
								<Dropdown.Item active={false} href={null} onClick={onLogout}>Logout </Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					}
				</Nav>
			</Navbar>
		</Container >
	);
}

export default Header;