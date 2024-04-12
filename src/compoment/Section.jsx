import { Fragment, useEffect, useState } from 'react'
import { Divider, Select, List, Button } from 'antd';
import { CheckCircleOutlined, MinusSquareOutlined } from '@ant-design/icons';
import useSWR from 'swr';
import { fetcher } from '../../config';
import { getData, patchData } from './GetData';
import Loading from './Loading';

const Section = () => {
    const [users, setUser] = useState([]);
    const [task, setTask] = useState([]);
    const [conutTask, setConutTask] = useState(0);
    const [totalTask, setTotalTask] = useState(0);
    // const [load, setLoad] = useState([])

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
        const newTask = await getData(value)
        // const newLoad = newTask.map((item) => {
        //     if (item.completed === false) {
        //         return { ...item, completed: false }
        //     } else {
        //         return null
        //     }
        // })
        const taskDone = newTask.reduce((count, item) => {
            if (item.completed === true) {
                count++;
            }
            return count;
        }, 0);
        // console.log(taskDone);
        
        setTotalTask(newTask.length)
        setConutTask(taskDone)
        setTask(newTask)
    }
    const handleMark = async (taskId) => {
        
        await patchData(taskId);
        const newTask = task.map(item => item.id === taskId ? { ...item, completed: true } : item);
        // const newTask = task.map(item => {
        //     if (item.id === taskId) {
        //         return { ...item, completed: true }
        //     } else {
        //         return item
        //     }
        // })
        
        setConutTask(conutTask + 1)
        setTask(newTask)
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
                        dataSource={task.sort((a,b) => (a.completed === false ? -1 : 1))}
                        renderItem={(item) => (
                            <List.Item style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    {item.completed ? <CheckCircleOutlined style={{ color: 'green', paddingRight: '10px' }} /> : <MinusSquareOutlined style={{ color: 'orange', paddingRight: '10px' }} />}
                                    {item.title}
                                </div>
                                {item.completed ? '' :
                                    <Button
                                        // className={`TaskId_${item.id}`} 
                                        onClick={() => handleMark(item.id)}
                                        style={{ fontSize: '14px', height: '24px', minWidth: '100px', padding: '0px 7px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                        {/* {load ? '' : <Loading />} */}
                                        {/* {item.completed ? '' : <Loading />} */}
                                        Mark Done
                                    </Button>
                                }
                            </List.Item>
                        )}
                    />
                </div>
                <span className='text-sm font-small'>Done {conutTask}/{totalTask} tasks</span>
            </main>
        </Fragment>
    );
};

export default Section;