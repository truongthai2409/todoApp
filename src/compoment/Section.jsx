import { Fragment, useEffect, useState } from 'react'
import { Divider, Select, List, Button } from 'antd';
import { CheckCircleOutlined, MinusSquareOutlined } from '@ant-design/icons';
import useSWR from 'swr';
import { fetcher } from '../../config';
import { getData, patchData } from './GetData';

const Section = () => {
    const [users, setUser] = useState([]);
    const [task, setTask] = useState([]);
    
    const { data } = useSWR(
        `https://jsonplaceholder.typicode.com/users`,
        fetcher
    )
    useEffect(() => {
        if (data) {
            setUser(data.map((user) => ({
                value: user.id,
                label: user.name
            })));
        }
    }, [data])

    const handUser = async (value) => {
        setTask(await getData(value))
    }
    const handleMark = async (item) => {
        const taskId = getIDTask(item);
        await patchData(taskId);
    }
    const getIDTask = (item) => {
        let index = 0;
        let array = task.map((item) => (item.title))
        let array3 = task.map((item) => (item.id))
        array.forEach(element => {
            if (element === item) {
                index = array.indexOf(element)
            }
        });
        return array3[index]
    }
    const checkMark = (item) => {
        let index = 0;
        let array = task.map((item) => (item.title))
        let array2 = task.map((item) => (item.completed))
        array.forEach(element => {
            if (element === item) {
                index = array.indexOf(element)
            }
        });
        if (array2[index] === true) {
            return true;
        } else {
            return false;
        }

    }
    return (
        <Fragment>

            <main className='px-10 py-6 w-[wh] overflow-hidden pt-[75px]'>
                <div className='w-full'>
                    <div className='flex items-center mt-3'>
                        <span className='block pr-4 my-4 text-base font-medium'>User</span><Divider style={{ with: '100%' }} />
                    </div>
                    <Select
                        showSearch
                        style={{ width: 200, lineHeight: '30px' }}
                        placeholder="Search to user"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        // filterSort={(optionA, optionB) =>
                        //   (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        // }
                        options={users}
                        onChange={handUser}
                    />
                </div>
                <div>
                    <div className='flex items-center'>
                        <span className='block pr-4 my-4 text-base font-medium'>Tasks</span><Divider className='' />
                    </div>
                    <List
                        style={{ height: '500px', overflow: 'auto', width: '100%' }}
                        bordered
                        dataSource={task.map((item) => (item.title))}
                        renderItem={(item) => (
                            <List.Item style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {checkMark(item) ? <div><CheckCircleOutlined style={{ color: 'green', paddingRight: '10px' }} />{item}</div> : <div><MinusSquareOutlined style={{ color: 'orange', paddingRight: '10px' }} />{item}</div>}
                                {checkMark(item) ? '' : <Button onClick={() => handleMark(item)} style={{ fontSize: '14px', height: '24px', padding: '0px 7px', borderRadius: '4px' }} >Mark Done</Button>}
                            </List.Item>
                        )}
                    />
                </div>
                <span>Done 11/20 tasks</span>
            </main>
        </Fragment>
    );
};

export default Section;