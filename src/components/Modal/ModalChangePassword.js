import React from 'react';
import { Input, Modal, Button, Space, notification, } from 'antd';
import { useDispatch, useSelector, } from "react-redux";
import SimpleReactValidator from 'simple-react-validator';
import { frontSelector, updateState, userChangePassword } from '../../store/Reducer/frontSlice';
//---
const ModalChangePassword = ({ open, setOpen }) => {
	const dispatch = useDispatch();
	const { loginData, isChangePassword, isFetchingOBJ } = useSelector(frontSelector);
	//---
	const [Formdata, setFormdata] = React.useState({ userId: loginData.id });
	//---
	React.useEffect(() => {
		if (isChangePassword) {
			notification.success({ message: 'Success', description: `Change Password Successfully` });
			dispatch(updateState({ isChangePassword: '' }));
			closeModal();
		}
	}, [isChangePassword]);
	//---
	const [, forceUpdate] = React.useState();
	let validator = React.useRef(new SimpleReactValidator({
		messages: {
			in: 'new password and confirm password not matched'
		}
	}));
	validator.current.purgeFields();
	const handlerSave = () => {
		if (validator.current.allValid()) {
			dispatch(userChangePassword(Formdata));
		} else {
			validator.current.showMessages();
			forceUpdate(1);
		}
	};
	const closeModal = () => {
		setOpen(false);
		setFormdata({ userId: loginData.id });
	}
	//----
	return (
		<Modal
			centered
			width={500}
			onCancel={closeModal}
			open={open}
			title={`Change Password`}
			maskClosable={false}
			footer={
				<Space wrap={true}>
					<Button variant="solid" color="red" onClick={closeModal} >Cancel</Button>
					<Button variant="solid" color="cyan" onClick={handlerSave}
						loading={isFetchingOBJ['userChangePassword'] || false}
						disabled={isFetchingOBJ['userChangePassword'] || false}> Save </Button>
				</Space>
			}
		>
			{/* <pre> {JSON.stringify(Formdata, null, 2)}</pre> */}
			<div>
				<div className="mb-3">
					<label className='form-label'>Old Password</label>
					<Input placeholder="Password" value={Formdata.oldPassword} onChange={e => setFormdata({ ...Formdata, oldPassword: e.target.value })} />
					{validator.current.message('oldPassword', Formdata.oldPassword, 'required|alpha_num|min:6')}
				</div>
				<div className="mb-3">
					<label className='form-label'>new Password</label>
					<Input placeholder="Password" value={Formdata.newPassword} onChange={e => setFormdata({ ...Formdata, newPassword: e.target.value })} />
					{validator.current.message('Password', Formdata.newPassword, 'required|alpha_num|min:6')}
				</div>
				<div className="mb-3">
					<label className='form-label'>Confirm Password</label>
					<Input placeholder="Confirm Password" value={Formdata.confirmPassword} onChange={e => setFormdata({ ...Formdata, confirmPassword: e.target.value })} />
					{validator.current.message('confirmPassword', Formdata.confirmPassword, `required|in:${Formdata.newPassword}`)}
				</div>
			</div>
		</Modal>
	)
}
export default React.memo(ModalChangePassword);