import React, { useState } from 'react';
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd"
import { createGlobalStyle} from 'styled-components';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { toDoState } from './atom';
import DragabbleCard from './Components/DragabbleCard';
import Board from './Components/Board';
import Trash from './Components/trash';
import AddBoard from './Components/addBoard';
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
*{
  box-sizing: border-box;
}
body{
  font-family: 'Source Sans Pro', sans-serif;
  background-color: ${props => props.theme.bgColor};
  transition: background-color 0.3s;
  color:${props=>props.theme.textColor}
}
a{
  text-decoration: none;
  color:inherit;
}
`

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3,1fr);
`




// const toDos = ["a","b","c","d","e","f"];

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState)
  const [isTrash,setIsTrash] = useState(false);
  //드래그가 끝났을때
  const onDragEnd = (info : DropResult) => {
    const {destination,draggableId,source} = info;
    if(!destination) return;
    if(destination?.droppableId === "droppable"){
      setToDos((oldToDos)=>{
        const todoCopy = [...oldToDos];
        const taskTodo = oldToDos[source.index];
        todoCopy.splice(source.index,1);
        todoCopy.splice(destination.index,0,taskTodo);

        return todoCopy
      })
    }
    if(destination?.droppableId == "trash"){
      setToDos((oldToDos)=>{
        const boardCopy = [...oldToDos];
        const boardIndex = boardCopy.findIndex((item) => item.boardId === source.droppableId);
        const todoCopy = [...boardCopy[boardIndex].value];
        todoCopy.splice(source.index,1);
        const newObject = {
          boardId : source.droppableId,
          value : todoCopy
        }
        boardCopy.splice(boardIndex,1);
        boardCopy.splice(boardIndex,0,newObject);

        return boardCopy;
      })
    }else if(destination?.droppableId === source.droppableId){
      setToDos((oldToDos)=>{
        const boardCopy = [...oldToDos]
        const boardIndex = boardCopy.findIndex((item) => item.boardId === source.droppableId);

        const todoCopy = [...boardCopy[boardIndex].value];
        const taskObj = todoCopy[source.index];
        todoCopy.splice(source.index,1);
        todoCopy.splice(destination.index,0,taskObj);
        const newObject = {
          boardId : source.droppableId,
          value : todoCopy
        }
        boardCopy.splice(boardIndex,1);
        boardCopy.splice(boardIndex,0,newObject);

        return boardCopy;
      })
    }else if(destination?.droppableId !== source.droppableId){
      setToDos((oldToDos)=>{
        const boardCopy = [...oldToDos];
        const sourceIndex = boardCopy.findIndex((item) => item.boardId === source.droppableId);
        const targetIndex = boardCopy.findIndex((item) => item.boardId === destination?.droppableId);
        const sourceBoard = [...boardCopy[sourceIndex].value];
        const targetBoard = [...boardCopy[targetIndex].value];
        const taskObj = sourceBoard[source.index];
        console.log("source",sourceBoard);
        console.log("target",targetBoard);
        sourceBoard.splice(source.index,1);
        targetBoard.splice(destination.index,0,taskObj)

        const sourceObject = {
          boardId : source.droppableId,
          value : sourceBoard
        }
        const targetObject = {
          boardId:destination.droppableId,
          value : targetBoard
        }
        boardCopy.splice(sourceIndex,1);
        boardCopy.splice(sourceIndex,0,sourceObject);
        boardCopy.splice(targetIndex,1);
        boardCopy.splice(targetIndex,0,targetObject)
        return boardCopy
      })
      // console.log("info");
      // console.log(info);
    }
    // if(!destination) return;

    // //todo 삭제
    // if(destination?.droppableId == "trash"){
    //   setToDos((oldToDos)=>{
    //     const todoCopy = [...oldToDos[source.droppableId]];
    //     todoCopy.splice(source.index,1);
    //     return {
    //       ...oldToDos,
    //       [source.droppableId] : todoCopy
    //     }
    //   })
    // }
    // else if(destination?.droppableId === source.droppableId){
    //   // same board move
    //   setToDos((oldToDos) => {
    //     const boardCopy = [...oldToDos[source.droppableId]]
    //     const taskObj = boardCopy[source.index]
    //     boardCopy.splice(source.index,1)
    //     boardCopy.splice(destination.index,0,taskObj)

    //     //다른 오브젝트들 다 복사하고  source.droppableId 와 일치하는 객체만 대체한다
    //     return {
    //       ...oldToDos,
    //       [source.droppableId] : boardCopy
    //     }
    //   })
    // }
    // if(destination.droppableId !== source.droppableId){
    //   setToDos((allBoard) => {
    //     const sourceBoard = [...allBoard[source.droppableId]];
    //     const taskObj = sourceBoard[source.index]
    //     const targetBoard = [...allBoard[destination.droppableId]];
    //     sourceBoard.splice(source.index,1);
    //     targetBoard.splice(destination.index,0,taskObj);
    //     return {
    //       ...allBoard,
    //       [source.droppableId] : sourceBoard,
    //       [destination.droppableId] : targetBoard
    //     }
    //   })
    // }

    // setIsTrash(false);
    
  };

  const onDragStart = () => {
    console.log("onDragStart");
    setIsTrash(true)
    
  }
  return (
    <>
      <GlobalStyle/>
        <AddBoard/>
         <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
          <Wrapper>
            <Boards>

            <Droppable droppableId="droppable" type="PERSON">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {/* <Draggable draggableId='draggable-1' index={0}>
                      
                  </Draggable> */}
                  {
                    toDos.map((board,index)=>(
                      <Draggable draggableId={`draggale-${index}`} index={index}>
                        {
                          (provided,snapshot) => (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <Board boardId={board.boardId} key={board.boardId} toDos={board.value}/>
                            </div>
                          )
                        }
                      </Draggable>

                      
                    ))
                  }
                </div>
              )}
            </Droppable>
            </Boards>
          </Wrapper>
          <Trash/>
          {/* {isTrash} */}
          {/* {isTrash ? <Trash/> : null} */}
        </DragDropContext>
    </>
  );
  
  
}

export default App;
