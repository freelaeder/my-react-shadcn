import React, {useState} from 'react';
import {MailOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Menu} from 'antd';
import {useNavigate} from "react-router";

const items: MenuProps['items'] = [
    {
        label: 'home',
        key: '',
        icon: <MailOutlined/>,
    },
    {
        label: 'loginForm',
        key: 'loginForm',
    },
    {
        label: 'gsap',
        key: 'learnGsap'
    },
    {
        label: 'G6',
        key: 'learnG6'
    },
    {
        label: 'HighCharts',
        key: 'learnHighCharts'
    }


];

const MenuContainer: React.FC = () => {
    const [current, setCurrent] = useState('mail');
    const navigation = useNavigate()
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
        navigation(e.key)
    };

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}/>;
};

export default MenuContainer;