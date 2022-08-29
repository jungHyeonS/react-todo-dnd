import React from 'react';
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd"
import { createGlobalStyle} from 'styled-components';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { toDoState } from './atom';
import DragabbleCard from './Components/DragabbleCard';

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
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3,1fr);
`

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius : 10px;
  min-height: 200px;
`



const toDos = ["a","b","c","d","e","f"];

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState)

  //드래그가 끝났을때
  const onDragEnd = ({draggableId,destination,source} : DropResult) => {
    if(!destination) return
    setToDos(oldToDos => {
      const copyToDos = [...oldToDos];
      copyToDos.splice(source.index,1);
      copyToDos.splice(destination?.index,0,draggableId)
      return copyToDos
    })
  };
  return (
    <>
      <GlobalStyle/>
         <DragDropContext onDragEnd={onDragEnd}>
          <Wrapper>
            <Boards>
              <Droppable droppableId='one'>
              {
                (magic) => 
                <Board ref={magic.innerRef} {...magic.droppableProps}> 
                  {toDos.map((toDo,index) => (
                    <DragabbleCard key={toDo} index={index} toDo={toDo}/>
                  ))}
                  {magic.placeholder}
                  
                </Board>
              }
              </Droppable>
            </Boards>
          </Wrapper>
        </DragDropContext>
    </>
  );
  
  
}

export default App;
