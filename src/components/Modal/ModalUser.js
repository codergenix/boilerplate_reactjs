import React from 'react';
import { Row, Col, Input, Modal, Button, notification, Space, InputNumber, Upload } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import SimpleReactValidator from 'simple-react-validator';
import { userUpdate, userCreate, frontSelector } from '../../store/Reducer/frontSlice';
import { PlusOutlined } from '@ant-design/icons';
import Service from '../../Utils/service';
import _ from 'lodash';
//---
const ModalUser = ({ open, setOpen, data }) => {
	const dispatch = useDispatch();
	const { isFetchingOBJ } = useSelector(frontSelector);
	//---
	const [Formdata, setFormdata] = React.useState({});
	const [IsUpdateMode, setIsUpdateMode] = React.useState(false);
	//---
	React.useEffect(() => {
		if (open) {
			setFormdata(data || {});
			setIsUpdateMode(!!data.userId)
		}
	}, [open]);
	//---
	const [, forceUpdate] = React.useState();
	let validator = React.useRef(new SimpleReactValidator({
		messages: {
			in: 'password and confirm password not matched'
		}
	}));
	validator.current.purgeFields();
	const handlerSave = () => {
		if (validator.current.allValid()) {
			if (!_.isEqual(Formdata, data)) {
				if (IsUpdateMode) {
					dispatch(userUpdate(Formdata));
				} else {
					dispatch(userCreate(Formdata));
				}
			} else {
				closeModal();
			}
		} else {
			validator.current.showMessages();
			forceUpdate(1);
		}
	};
	const closeModal = () => {
		setOpen(false);
	}
	const beforeUpload = (file) => {
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
		const isLt1M = (file.size / 1024 / 1024) < 1;
		if (!isJpgOrPng) {
			notification.error({ message: 'Error', description: 'You can only upload JPG/PNG file!' });
		}
		else if (!isLt1M) {
			notification.error({ message: 'Error', description: 'Image must smaller than 1MB!' });
		}
		else {
			Service.filetoBase64(file, (avatar) => {
				setFormdata({ ...Formdata, avatar: avatar });
			})
		}
		return false;
	};

	//---
	return (
		<Modal
			centered
			width={970}
			onCancel={closeModal}
			open={open}
			title={`User ${IsUpdateMode ? 'Update' : 'Add'}`}
			maskClosable={false}
			footer={
				<Space wrap={true}>
					<Button variant="solid" color="red" onClick={closeModal} >Cancel</Button>
					<Button variant="solid" color="cyan"
						loading={isFetchingOBJ['userUpdate'] || isFetchingOBJ['userCreate'] || false}
						disabled={isFetchingOBJ['userUpdate'] || isFetchingOBJ['userCreate'] || false}
						onClick={handlerSave} > {IsUpdateMode ? 'Update' : 'Add'} </Button>
				</Space>
			}
		>
			<div className='px-4'>
				<Row gutter={15} align="middle" justify="space-between">
					<Col md={24}>
						<div className="mb-3 text-center">
							<Upload
								name="avatar"
								listType="picture-circle"
								showUploadList={false}
								beforeUpload={beforeUpload}
							>
								{Formdata.avatar ? (
									<img src={Service.getImageBase64Type(Formdata.avatar)} alt="avatar" style={{ width: '100%', height: "100%", objectFit: "cover", borderRadius: 100, }} />
								) : (
									<>
										<div><PlusOutlined /></div>
										<div>Upload</div>
									</>
								)}
							</Upload>
							{validator.current.message('avatar', Formdata.avatar, 'required')}
						</div>
					</Col>
					<Col md={12}>
						<div className="mb-3">
							<label className='form-label'>Name</label>
							<Input placeholder="Name" value={Formdata.name} onChange={e => setFormdata({ ...Formdata, name: e.target.value })} />
							{validator.current.message('name', Formdata.name, 'required')}
						</div>
					</Col>
					<Col md={12}>
						<div className="mb-3">
							<label className='form-label'>Email</label>
							<Input placeholder="Email" disabled={false} value={Formdata.email} onChange={e => setFormdata({ ...Formdata, email: e.target.value })} />
							{validator.current.message('email', Formdata.email, 'required|email')}
						</div>
					</Col>
					{!IsUpdateMode &&
						<>
							<Col md={12}>
								<div className="mb-3">
									<label className='form-label'>Password</label>
									<Input placeholder="Password" value={Formdata.userPassword} onChange={e => setFormdata({ ...Formdata, userPassword: e.target.value })} />
									{validator.current.message('Password', Formdata.userPassword, 'required|alpha_num|min:6')}
								</div>
							</Col>
							<Col md={12}>
								<div className="mb-3">
									<label className='form-label'>Confirm Password</label>
									<Input placeholder="Confirm Password" value={Formdata.confirmPassword} onChange={e => setFormdata({ ...Formdata, confirmPassword: e.target.value })} />
									{validator.current.message('confirmPassword', Formdata.confirmPassword, `required|in:${Formdata.userPassword}`)}
								</div>
							</Col>
						</>
					}
					<Col md={24}>
						<div className="mb-3">
							<label className='form-label'>Contact</label>
							<InputNumber placeholder="Contact" value={Formdata.contact} onChange={value => setFormdata({ ...Formdata, contact: value })} />
							{validator.current.message('contact', Formdata.contact, `required|phone`)}
						</div>
					</Col>
				</Row>
			</div>
		</Modal>
	)
}
export default React.memo(ModalUser);