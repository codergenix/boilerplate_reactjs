import React from 'react';
import { Container } from 'react-bootstrap';
import { Row, Col, Input, Button, notification, Table, Space, Modal, Tooltip, Avatar } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RiUserAddLine } from "react-icons/ri";
import { LiaUserEditSolid } from "react-icons/lia";
import { AiOutlineUserDelete } from "react-icons/ai";
import { MdOutlineContentCopy } from "react-icons/md";
import { userGrid, frontSelector, updateState, userDelete, userCreate } from '../store/Reducer/frontSlice';
import ModalUser from '../components/Modal/ModalUser';
import Service from '../Utils/service';
//---
const UsersScreen = () => {

  const dispatch = useDispatch();
  const { loginData, users, isUpdatedUser, isUpdatedProfile, isDeletedUser, isAddedUser, isFetchingOBJ } = useSelector(frontSelector);

  const [ModalOpen, setModalOpen] = React.useState(false);
  const [ModalData, setModalData] = React.useState({});
  const [searchText, setSearchText] = React.useState(null);
  const [queryParams,] = React.useState({
    "order": "ASC",
    "orderBy": "userId",
    "pageSize": 20,
    "search": "",
    "skip": 0
  });
  const reloadApi = () => {
    dispatch(userGrid({ ...queryParams, search: searchText }));
  }
  React.useEffect(() => {
    reloadApi();
  }, [searchText]);

  React.useEffect(() => {
    if (isUpdatedUser) {
      notification.success({ message: 'Success', description: `User is updated successfully` });
      setModalOpen(false);
      reloadApi();
    }
    dispatch(updateState({ isUpdatedUser: '' }));
  }, [isUpdatedUser]);
  React.useEffect(() => {
    if (isUpdatedProfile) {
      reloadApi();
    }
  }, [isUpdatedProfile]);
  React.useEffect(() => {
    if (isAddedUser) {
      notification.success({ message: 'Success', description: `User is Created successfully` });
      setModalOpen(false);
      reloadApi();
    }
    dispatch(updateState({ isAddedUser: '' }));
  }, [isAddedUser]);
  React.useEffect(() => {
    if (isDeletedUser) {
      notification.success({ message: 'Success', description: `User is Deleted successfully` });
      setModalOpen(false);
    }
    dispatch(updateState({ isDeletedUser: '' }))
  }, [isDeletedUser]);
  const handlerAdd = () => {
    setModalOpen(true);
    setModalData({});
  }
  const handlerEditItem = (item) => {
    setModalOpen(true);
    setModalData(item);
  }
  const handlerCopyItem = (item) => {
    dispatch(userCreate({...item,userPassword:"123456"}));
  }
  const handlerDeleteItem = (item) => {
    Modal.confirm({
      title: `Are you sure you want to delete?`,
      content: `${item.name}`,
      okText: `Ok`,
      cancelText: `Cancel`,
      onOk() {
        dispatch(userDelete(item));
      },
    });
  }
  //---

  return (
    <Container>
      <div className='mb-3'>
        <Row justify="space-between">
          <Col>
            <Input.Search
              allowClear
              placeholder="search"
              onSearch={(value) => setSearchText(value?.trim())}
            />
          </Col>
          <Col>
            <Button variant='dashed' color='primary' icon={<RiUserAddLine />} onClick={handlerAdd}> Add </Button>
          </Col>
        </Row>
      </div>
      <Table dataSource={users || []} rowKey='userId' loading={isFetchingOBJ['userGrid'] || false}>
        <Table.Column key="avatar" title="AVATAR" render={(record) => <Avatar size={50} shape="circle" src={Service.getImageBase64Type(record.avatar)} >{record?.name?.charAt(0)}</Avatar>} />
        <Table.Column key="name" title="NAME" dataIndex={'name'} />
        <Table.Column key="email" title="EMAIL" dataIndex={'email'} render={(value) => <a href={`mailto:${value}?subject=Hello&body=Content here...`}> {value} </a>} />
        <Table.Column key="contact" title="CONTACT" dataIndex={'contact'} render={(value) => <a href={`tel:${value}`}>{value}</a>} />
        <Table.Column key="action" title="ACTION" width={130} render={(record) =>
          loginData.id != record.userId && <Space>
            <Tooltip title="Edit User" color="cyan"><Button color="cyan" variant="outlined" icon={<LiaUserEditSolid />} onClick={() => handlerEditItem(record)} /> </Tooltip>
            <Tooltip title="Delete User" color="red"><Button color="red" variant="outlined" icon={<AiOutlineUserDelete />} onClick={() => handlerDeleteItem(record)} /> </Tooltip>
            {/* <Tooltip title="Copy" color="green"><Button color="green" variant="outlined" icon={<MdOutlineContentCopy  />} onClick={() => handlerCopyItem(record)} /> </Tooltip> */}
          </Space>
        }
        />
      </Table>
      <ModalUser
        open={ModalOpen}
        setOpen={setModalOpen}
        data={ModalData}
      />
    </Container>
  )

}
export default React.memo(UsersScreen)