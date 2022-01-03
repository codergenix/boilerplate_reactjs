import React, { useEffect, useState,useRef} from 'react';
import { Button, Form } from 'react-bootstrap';
import { Row, Col, Input, Modal, Button as AntButton,notification, Space } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash';
import SimpleReactValidator from 'simple-react-validator';

import ContentEditor from '../../components/ContentEditor/ContentEditor';

import { userSelector, updateUser, deleteUser, setParams} from '../../store/Reducer/user';
import Service from '../../Utils/service';
import CONFIG from '../../Utils/config';

const ModalUser = (props) => {

	const dispatch = useDispatch();
	const [, forceUpdate] = useState();
	const { isUpdated, isDeleted, isAdded} = useSelector(userSelector);

	let propsData = props.data;
	const [Formdata, setFormdata] = useState({});
	
	//============================
	useEffect(async() => {
		if (props.isOpen) {
				setFormdata(propsData);
		}
	}, [props.isOpen]);

	
	useEffect(() => {
		if (isUpdated === true) {
			notification.success({message:'Success',description:`user is updated`});
			closeModal();
		}
		dispatch(setParams({ isUpdated: '' }));
	}, [isUpdated]);

	useEffect(() => {
		if (isAdded === true) {
			notification.success({message:'Success',description:`user is Added`});
			closeModal();
		}
		dispatch(setParams({ isAdded: '' }));
	}, [isAdded]);

	useEffect(() => {
		if (isDeleted === true) {
			notification.success({message:'Success',description:`user is deleted`});
			closeModal();
		}
		dispatch(setParams({ isDeleted: '' }))
	}, [isDeleted]);

	//=======================================
	let validator = useRef(new SimpleReactValidator());

	const handleSubmit = (e) => {
		e.preventDefault(props);
		if (validator.current.allValid()) {
			dispatch(updateUser(Formdata));
		} else {
		validator.current.showMessages();
		forceUpdate(1);
	  }
	};
	const deleteSelectItem = () => {
		let deleteData = {
			"id": Formdata.id
		}
		dispatch(deleteUser(deleteData));
		closeModal();
	}
	const closeModal = () => {
		props.oncloseModal(false);
	}

	const setEditordata = (type, editorcontent) => {
		setFormdata({ ...Formdata, [type]: editorcontent });
	}
	
	//============================
	return (
		<>
			<Modal
				centered
				width={970}
				onCancel={closeModal}
				visible={props.isOpen}
				title="User Detail"
				footer={false}
				maskClosable={false}
			>
				<Form>
					{/* <pre> {JSON.stringify(Formdata, null, 2)}</pre> */}
					<Row gutter={16} align="middle" justify="space-between">
						<Col flex={1}>
							<Form.Group className="mb-2">
								<Input placeholder="first name" value={Formdata.FirstName} onChange={e => setFormdata({ ...Formdata, FirstName: e.target.value })} />
								{validator.current.message('FirstName', Formdata.FirstName, 'required')}
							</Form.Group>
						</Col>
						<Col flex={1}>
							<Form.Group className="mb-2">
								<Input placeholder="Last name" value={Formdata.LastName} onChange={e => setFormdata({ ...Formdata, LastName: e.target.value })} />
								{validator.current.message('LastName', Formdata.LastName, 'required')}
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className="mb-2 text-right pr-4">
								<Space>
									<Button variant="danger" size="md" onClick={() => { deleteSelectItem() }} type="Button" ><i className="far fa-trash-alt"></i></Button>
									<Button variant="success" size="md" type="button" onClick={handleSubmit} ><i className="far fa-save"></i></Button>
								</Space>
							</Form.Group>
						</Col>
					</Row>
					<Form.Group className="mb-2">
						<Input placeholder="user Email id" value={Formdata.Email} onChange={e => setFormdata({ ...Formdata, Email: e.target.value })} />
						{validator.current.message('Email', Formdata.Email, 'required|email')}
					</Form.Group>
					<Form.Group className="mb-2">
						<Form.Label>Description</Form.Label>
						<ContentEditor
							fieldname='Description'
							onchangeEditor={setEditordata}
							theme="snow"
							value={Formdata.Description}
						/>
					</Form.Group>
				</Form>
			</Modal>
		</>
	)
}
export default ModalUser;