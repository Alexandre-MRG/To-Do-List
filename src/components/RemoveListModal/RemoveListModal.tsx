import React, { useRef, useState, useEffect } from 'react';
import { OrderedListOutlined } from '@ant-design/icons';
import { Input, Modal, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Fire from '../../Fire';

let firebase: any;

interface RemoveListModalProps {
  children: any,
  listID : string,
  modalVisible: boolean,
  listTitle: string,
  handleOk: () => void,
}

export default function RemoveListModal(props: RemoveListModalProps) {

  const listsRef = useRef([]);
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
  
  useEffect(() => {

    firebase = new Fire((error: any) => {
      if (error) {
        return alert("Une erreur est survenue");
      }
    });

    firebase.getLists((lists: any) => {

      listsRef.current = lists;
    });



    return function unsubscribe() {
      firebase.detach();

    };
  }, []);

  function handleSubmit(){
    console.log("SupprPropsId: "+props.listID);
    console.log('onDelete');
    console.log(listRef.current.id);

    if(listsRef.current !== undefined){
      listsRef.current.map((list: any) => {
        console.log('bl', list);
        if (list.id === props.listID) {
          listRef.current = list;
          console.log("liste à supprimer " + listRef.current.name);

          firebase.deleteList(listRef.current)
          props.handleOk();
        }
      });
    }



  }

    return (
    <Modal
      title={"Voulez-vous supprimer la liste  « "+props.listTitle+" » ?"}
      visible={props.modalVisible}
      cancelText="Annuler"
      onCancel={props.handleOk}
      okText="Supprimer"
      okType="danger"
      onOk={handleSubmit}
    >
    </Modal>
    );
}
