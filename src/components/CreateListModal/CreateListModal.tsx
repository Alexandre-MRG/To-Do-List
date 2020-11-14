import React, { useState, useEffect } from 'react';
import { Modal, Input, Tooltip } from 'antd';
import { AppstoreAddOutlined, EnterOutlined } from '@ant-design/icons';
import Fire from '../../Fire';

let firebase: any;

interface CreateListModalProps {
    modalVisible: boolean,
    listTitle: string,
    setListTitle: (v: string) => void,
    handleOk: () => void,
}

export default function CreateListModal(props: CreateListModalProps) {

  const [lists, setLists] = useState(
    {
      color: "",
      name: "",
      todos: [
      ]
    }
  );
  useEffect(() => {


    firebase = new Fire((error: any) => {
      if (error) {
        return alert("Une erreur est survenue");
      }
      else{
        
      }
    });

    return function unsubscribe() {
      firebase.detach();
    };
  }, []);

  function handleInputChange(event: any){
    setLists(
      {
        color: "#8022D9",
        name: event.target.value,
        todos: [
        ]
      }
    );


    props.setListTitle(event.target.value);
  }

  function handleSubmit(){
    firebase.addList(lists);
    props.handleOk();
    props.setListTitle("");
  }

  function handleClose(){
    props.handleOk();
    props.setListTitle("");
  }

    return (
        <Modal
          title="Ajouter une liste"
          visible={props.modalVisible}
          // footer={null}
          okText="Créer la liste"
          cancelText="Annuler"
          onOk={handleSubmit}
          onCancel={handleClose}
        >
          <Input
            placeholder="Titre de la liste"
            prefix={<AppstoreAddOutlined className="site-form-item-icon" />}
            value={props.listTitle}
            onChange={handleInputChange}
            onPressEnter={handleSubmit}
            suffix={(
            <Tooltip title="Entrée pour valider" placement="right" mouseEnterDelay={1.5}>
              <EnterOutlined />
            </Tooltip>
            )}
          />
          <div className="create-list-button">
            
          </div>
        </Modal>
    );
}
