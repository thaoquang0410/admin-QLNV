import { Table } from 'antd';
import 'antd/dist/antd.min.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { loading } from '../../store/actions/common';
import { putUser } from '../../store/actions/users';
import EditUser from './EditUser';
import { initColumns } from './init';
import { useCondition } from './../../hooks/useCondition';


const ListUser = ({ dataSource, roles, departments, onFilter, isLoading, page }) => {
    const dispatch = useDispatch();
    const { onSuccess, onError } = useCondition();
    const [user, setUser] = useState({});
    const [visible, setVisible] = useState(false);

    const dataFilers = departments.map((department) => {
        return {
            text: department.name,
            value: department.id
        }
    })

    const handleClick = (key) => {
        setVisible(true)
        const user = getByKey(key);
        setUser({ ...user });
    }

    const handleOk = (userUpdate) => {
        setVisible(!visible);
        setUser({})
        dispatch(loading());
        dispatch(putUser(userUpdate, onSuccess, onError))
    }

    const handleCancel = () => {
        setVisible(!visible);
        setUser({})
    }


    const columns = initColumns(handleClick, dataFilers)
    const data = convertData(dataSource);
    const getByKey = (key) => {
        const user = dataSource.find((user) => {
            return user.id === key;
        });
        return user;
    }

    function mapRole(id) {
        let name = '';
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].id === id) {
                name = roles[i].name;
                break;
            }
        }
        return name;
    }

    function mapDepartment(id) {
        let name = '';
        for (let i = 0; i < departments.length; i++) {
            if (departments[i].id === id) {
                name = departments[i].name;
                break;
            }
        }
        return name;
    }

    function convertData(data) {

        const dataConvert = data.map((user, index) => {
            return {
                key: user.id,
                id: `NV_${user.id}`,
                stt: 10 * (page - 1) + index + 1,
                name: user.name,
                email: user.email,
                role: mapRole(user.role_id),
                department: mapDepartment(user.department_id),
                status: user.active === 1 ? 'Active' : "Inactive"
            }
        })
        return dataConvert;
    }
    return (
        <div className='table-list'>
            {Object.keys(user).length !== 0 &&
                <EditUser
                    visible={visible}
                    user={user}
                    departments={departments}
                    roles={roles}
                    onCancel={handleCancel}
                    onOk={handleOk}
                />}
            <Table columns={columns} dataSource={data} pagination={false} size="small" onChange={onFilter}
                loading={isLoading}
            />
        </div>
    );
}

export default ListUser;
