import React, { useState, useEffect, useRef } from 'react';
import { CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Input, Collapse, Tooltip } from 'antd';
import Fire from '../../Fire';
import AddTaskInput from '../AddTaskInput';
import RemoveListModal from '../RemoveListModal';

const { Panel } = Collapse;

let firebase: any;
//const completed = (isCompleted: boolean) => isCompleted ? <CheckCircleOutlined /> : "";

export default function Lists() {
  const [modalVisible, setModalVisible] = useState(false);
  const [listId, setListId] = useState("");
  const [listName, setListName] = useState("");
  const [completedCount, setCompletedCount] = useState([0]);

  const listsRef = useRef([
    {
      color: "",
      id: "",
      name: "",
      todos: [
        {
          title: "",
          completed: false
        }
      ]
    }
  ]);

  useEffect(() => {


    firebase = new Fire((error: any) => {
      if (error) {
        return alert("Une erreur est survenue");
      }
    });

    firebase.getLists((lists: any) => {
      listsRef.current = lists;

      countCompletedTask();
    });

    return function unsubscribe() {
      firebase.detach();
    };
  }, []);

  // Clic sur le bouton de confirmation du modal
  function handleRemoveModalOk() {
    setModalVisible(false);
  };

  // Clic sur le bouton d'ouverture du modal
  function handleModalClick(id : string, name : string){
    setListId(id);
    setListName(name);
    setModalVisible(true);
  }

  function handleRemoveTask(index: number, listIndex: number){
    listsRef.current[listIndex].todos.splice(index, 1);

    firebase.updateList(listsRef.current[listIndex]);
  }

  function onChangeCheckbox(e: any, index: number, listIndex: number) {
    //console.log(`checked = ${e.target.checked}`);
    //console.log(arguments);
    listsRef.current[listIndex].todos[index].completed = e.target.checked;

    countCompletedTask();

    firebase.updateList(listsRef.current[listIndex]);
  }

  function countCompletedTask(){
    let newArr = [...completedCount]; // copie des données de l'ancien tableau (state)
    
    listsRef.current.map((list: any, listIndex: number) => { 
      let count : number[] = new Array(listsRef.current.length).fill(0)

      if(list.todos.length > 0){
        list.todos.map((todo: any, todoIndex: any) => {
          if(todo.completed === true){
            count[listIndex]++;
          }
          newArr[listIndex] = count[listIndex]
        });
      }else{
        newArr[listIndex] = 0;
      }
    });
    setCompletedCount(newArr) // On utilise le nouvel array pour mettre à jour le state
  }

  function onChangeInputTask(e: any, todoIndex: number, listIndex: number){
    listsRef.current[listIndex].todos[todoIndex].title = e.target.value;

    firebase.updateList(listsRef.current[listIndex]);
  }

  function onChangeInputTitle(e: any, listIndex: number){
    listsRef.current[listIndex].name = e.target.value;

    firebase.updateList(listsRef.current[listIndex]);
  }

  return (
    <>
      <div className="container d-inline">
      <div className="row">
      {listsRef.current.map((list, index) => list.id !== "" ? (
        <div key={list.id} className="">
          <div className="col-sm d-flex p-3 ">
            <Card
              title={                       
                <Input 
                  value={list.name} 
                  onChange={(e) => onChangeInputTitle(e, index)}
                  bordered={false}
                  size="large"
                  style={{fontWeight: "bold", textAlign: 'center'}}
                >
                </Input>
              }
              extra={
              <Tooltip title="Clic pour supprimer la liste" placement="topLeft" mouseEnterDelay={1.5}>
                <Button onClick={() => handleModalClick(list.id, list.name)} icon={<DeleteOutlined />} type="ghost"></Button>
              </Tooltip>
              }
              style={{ width: 350, display: "grid" }}>
              <div className="container">
                <div className="">
                  <Collapse>
                    <Panel header={" ( " +completedCount[index]+ "/"+list.todos.length + " )"} key="1">
                    {list.todos.map((todo, todoIndex) => (
                      <p key={todoIndex+index}>                     
                        <div className="container border-bottom">
                          <div className="row">
                            <div className="col-">
                              <Checkbox onChange={(e) => onChangeCheckbox(e, todoIndex, index)} checked={todo.completed}></Checkbox>
                            </div>
                            <div className="col-sm">
                            <Input 
                              value={listsRef.current[index].todos[todoIndex].title} 
                              onChange={(e) => onChangeInputTask(e, todoIndex, index)}
                              bordered={false}
                            >
                            </Input>
                            </div>
                            <div className="col-">
                              <Tooltip title="Clic pour supprimer l'élément" placement="right" mouseEnterDelay={1.5}>
                                <Button onClick={() => handleRemoveTask(todoIndex, index)} icon={<CloseOutlined />} type="ghost"></Button>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                      </p>
                    ))}
                    </Panel>
                  </Collapse>
                </div>
                <div className="">
                  <AddTaskInput listID={list.id}></AddTaskInput>
                </div>
              </div>
            </Card>
          </div>
        </div>
      ) : null)}
      <RemoveListModal
        listID={listId}
        modalVisible={modalVisible}
        listTitle={listName}
        handleOk={handleRemoveModalOk}>
      </RemoveListModal>
      </div>
      </div>
    </>
  );

}
