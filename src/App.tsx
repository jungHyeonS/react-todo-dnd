import React from 'react';
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd"
import { createGlobalStyle} from 'styled-components';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { toDoState } from './atom';
import DragabbleCard from './Components/DragabbleCard';
import Board from './Components/Board';

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




const toDos = ["a","b","c","d","e","f"];

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState)

  //드래그가 끝났을때
  const onDragEnd = (info : DropResult) => {
    const {destination,draggableId,source} = info;
    if(!destination) return;
    if(destination?.droppableId === source.droppableId){
      // same board move
      setToDos((oldToDos) => {
        const boardCopy = [...oldToDos[source.droppableId]]
        boardCopy.splice(source.index,1)
        boardCopy.splice(destination.index,0,draggableId)

        //다른 오브젝트들 다 복사하고  source.droppableId 와 일치하는 객체만 대체한다
        return {
          ...oldToDos,
          [source.droppableId] : boardCopy
        }
      })
    }
    if(destination.droppableId !== source.droppableId){
      setToDos((allBoard) => {
        const sourceBoard = [...allBoard[source.droppableId]];
        const targetBoard = [...allBoard[destination.droppableId]];
        sourceBoard.splice(source.index,1);
        targetBoard.splice(destination.index,0,draggableId);
        return {
          ...allBoard,
          [source.droppableId] : sourceBoard,
          [destination.droppableId] : targetBoard
        }
      })
    }
    
  };
  return (
    <>
      <GlobalStyle/>
         <DragDropContext onDragEnd={onDragEnd}>
          <Wrapper>
            <Boards>
              {Object.keys(toDos).map(boardId => <Board boardId={boardId} key={boardId} toDos={toDos[boardId]}/>)}
            </Boards>
          </Wrapper>
        </DragDropContext>
    </>
  );
  
  
}

export default App;
