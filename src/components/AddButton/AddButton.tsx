import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface AddButtonProps {
    content: string;
    info?: string;
    onClick: () => void;
}

export default function AddButton(props: AddButtonProps) {
  return (
    <div>
        <Button onClick={props.onClick} icon={<PlusOutlined />} type="primary">{props.content}</Button>
    </div>
  );
}