import React, { useRef, useState, useEffect } from 'react';
import { OrderedListOutlined, EnterOutlined } from '@ant-design/icons';
import { Button, Input, Tooltip } from 'antd';
import Fire from '../../Fire';

let firebase: any;

interface AddTaskInputProps {
  listID : string
}

export default function AddTaskInput(props: AddTaskInputProps) {
  const listRef = useRef({
      color: "",
      id: props.listID,
      name: "",
      todos: [
        {
          title: "",
          completed: false
        }
      ]
  });

  const [task, setTask] = useState("");
  
  useEffect(() => {


    firebase = new Fire((error: any) => {
      if (error) {
        return alert("Une erreur est survenue");
      }
    });

    firebase.getLists((lists: any) => {
      lists.map((list: any) => { 
        if (list.id === props.listID) {
          listRef.current = list;
        }
      });
    });

    return function unsubscribe() {
      firebase.detach();
    };
  }, []);

  function handleInputChange(event: any){
    setTask(event.target.value);
  }

  function handleSubmit(){
    console.log('onSubmit');
    listRef.current = {
      ...listRef.current,
      todos: [
        ...listRef.current.todos,
        {
          title: task,
          completed: false,
        }
      ]
    };
    //setLists(lists => [lists.todos, {title: task, completed: false}])
    //lists.todos.push({title: task, completed: false})
    firebase.updateList(listRef.current)
    setTask("");
  }

    return (
    <Input
      placeholder="Ajouter un élément"
      prefix={<OrderedListOutlined className="site-form-item-icon" />}
      value={task}
      onChange={handleInputChange}
      onPressEnter={handleSubmit}
      suffix={(
        <Tooltip title="Clic ou Entrée pour valider" placement="bottomLeft" mouseEnterDelay={1.5}>
          <Button
            onClick={handleSubmit}
            icon={<EnterOutlined />} 
            
          >      
          </Button>
        </Tooltip>
      )}
    />
    );
}
