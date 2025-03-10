import React from 'react';
import { Row, Col, Input, Modal, Button, notification, Space, InputNumber, Upload } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import SimpleReactValidator from 'simple-react-validator';
import { frontSelector, updateState, userInfo, profileUpdate } from '../../store/Reducer/frontSlice';
import { PlusOutlined } from '@ant-design/icons';
import Service from '../../Utils/service';
import _ from 'lodash';
//---
const ModalUser = ({ open, setOpen }) => {
	const dispatch = useDispatch();
	const { loginData, userDetail, isUpdatedProfile, isFetchingOBJ } = useSelector(frontSelector);
	//---
	const [Formdata, setFormdata] = React.useState({});
	//---
	React.useEffect(() => {
		if (open && loginData?.id >= 0) {
			dispatch(userInfo({ userId: loginData.id }));
		}
	}, [open]);

	React.useEffect(() => {
		if (userDetail.userId) {
			setFormdata(userDetail);
		}
	}, [userDetail]);

	React.useEffect(() => {
		if (isUpdatedProfile) {
			notification.success({ message: 'Success', description: `Profile Updated Successfully` });
			dispatch(updateState({ isUpdatedProfile: '' }));
			closeModal();
		}
	}, [isUpdatedProfile]);
	//---
	const [, forceUpdate] = React.useState();
	let validator = React.useRef(new SimpleReactValidator());
	validator.current.purgeFields();
	const handlerSave = () => {
		if (validator.current.allValid()) {
			if (!_.isEqual(Formdata, userDetail)) {
				dispatch(profileUpdate(Formdata));
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
			title={`Profile Update`}
			maskClosable={false}
			footer={
				<Space wrap={true}>
					<Button variant="solid" color="red" onClick={closeModal} >Cancel</Button>
					<Button variant="solid" color="cyan" onClick={handlerSave}
						loading={isFetchingOBJ['profileUpdate'] || false}
						disabled={isFetchingOBJ['profileUpdate'] || false} >Update </Button>
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
							<Input placeholder="Email" disabled={true} value={Formdata.email} onChange={e => setFormdata({ ...Formdata, email: e.target.value })} />
							{validator.current.message('email', Formdata.email, 'required|email')}
						</div>
					</Col>
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