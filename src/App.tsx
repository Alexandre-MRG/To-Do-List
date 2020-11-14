import React, { useState, useEffect } from 'react';
import './App.css';
import CreateListModal from './components/CreateListModal';
import AddButton from './components/AddButton';
import { Affix } from 'antd';
import Lists from './components/Lists';
import Fire from './Fire'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [top, setTop] = useState(15);

  const [modalVisible, setModalVisible] = useState(false);
  const [listTitle, setListTitle] = useState("");

  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  function handleOk() {
    setModalVisible(false);
  };

  useEffect(() => {
    let firebase = new Fire((error: any) => {
      if (error) {
        return alert("Une erreur est survenue");
      }
    });

    firebase.getLists((lists: any) => {
      setLists(lists);
      setLoading(false);
    });

    return function unsubscribe() {
    firebase.detach();
    };
  }, []);

  return (
    <div className="App">
        <Affix offsetTop={top}>
        <AddButton
          info="Nouvelle liste"
          content="Ajouter une liste"
          onClick={() => setModalVisible(true)}
        />
        </Affix>

        <CreateListModal 
          modalVisible={modalVisible}
          listTitle={listTitle}
          setListTitle={setListTitle}
          handleOk={handleOk}
        />
        <br></br>
        <Lists></Lists>
    </div>
  );
}

export default App;
