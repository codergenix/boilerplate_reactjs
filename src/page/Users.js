import React, { useState, useEffect, useRef } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { Row, Col, Input, Button as AntButton, notification, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import SimpleReactValidator from 'simple-react-validator';

import { getAllUser, userSelector, setCurrentUser, addUser, setParams, clearState } from '../store/Reducer/user';
import ModalUser from '../components/Modal/ModalUser';
export default function Users() {

  const dispatch = useDispatch();
  const [, forceUpdate] = useState();
  const { users, currentUser, isAdded, isError, errorMessage } = useSelector(userSelector);

  const [addUserdata, setAddUserdata] = useState({});
  const [formdata, setFormdata] = useState({});
  const [ModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(clearState());
    dispatch(getAllUser());
  }, []);


  useEffect(() => {
    if (isError) {
      notification.error({
        message: 'Error',
        description: errorMessage,
      });
    }
  }, [isError]);

  useEffect(() => {
    if (isAdded) {
      setFormdata(currentUser);
      setModalOpen(true);
    }
    dispatch(setParams({ isAdded: '' }));
  }, [isAdded]);

  const rowclick = async (obj) => {
    setCurrentUser(obj);
    setFormdata(obj);
    setModalOpen(true);
  }

  let validator = useRef(new SimpleReactValidator());
  const handleAddSubmit = () => {
    if (validator.current.allValid()) {
      dispatch(addUser(addUserdata));
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  }

  return (
    <Container>
      <h2 className="text-center">User list</h2>
      <Row gutter={16} align="middle" justify="space-between">
        <Col flex={1}>
          <div className="mb-2">
            <Input placeholder="Email id" value={addUserdata.Email} onPressEnter={handleAddSubmit} onChange={e => setAddUserdata({ ...addUserdata, Email: e.target.value })} />
            {validator.current.message('Email', addUserdata.Email, 'required|email')}
          </div>
        </Col>
        <Col flex={1}>
          <div className="mb-2">
            <Input placeholder="Password" value={addUserdata.Password} onPressEnter={handleAddSubmit} onChange={e => setAddUserdata({ ...addUserdata, Password: e.target.value })} />
            {validator.current.message('Password', addUserdata.Password, 'required')}
          </div>
        </Col>
        <Col>
          <div className="mb-2 text-right pr-4">
            <Space>
              <Button variant="success" size="md" type="button" onClick={handleAddSubmit} ><i className="far fa-save"></i></Button>
            </Space>
          </div>
        </Col>
      </Row>

      <Table responsive>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {(users).map((user, index) => (
            <tr key={index} className='rowclick' onClick={() => rowclick(user)}>
              <td> {user.FirstName} </td>
              <td> {user.LastName} </td>
              <td> {user.Email} </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ModalUser
        isOpen={ModalOpen}
        oncloseModal={setModalOpen}
        data={formdata}
      />
    </Container>
  )

}
