import { Droppable } from "react-beautiful-dnd"
import styled from "styled-components"
import DragabbleCard from "./DragabbleCard"

const Wrapper = styled.div`
  padding: 10px 0px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius : 10px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
`

const Title = styled.h1`
    text-align: center;
    font-weight: bold;
`

const Area = styled.div<IAreaProps>`
    background-color: ${(props) => props.isDraggingOver ? "#dfe6e9" : props.isDraggingFromThis ? "#b2bec3" : "transparent"};
    flex-grow: 1;
    transition: background-color .5s;
    padding: 20px;
`

interface IBoardProps {
    toDos:string[];
    boardId:string;
}

interface IAreaProps{
    isDraggingOver :boolean
    isDraggingFromThis : boolean;
}

function Board({toDos,boardId} : IBoardProps){
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Droppable droppableId={boardId}>
                {
                (magic,shapshot) => 
                <Area isDraggingOver={shapshot.isDraggingOver} isDraggingFromThis={Boolean(shapshot.draggingFromThisWith)} ref={magic.innerRef} {...magic.droppableProps}> 
                    {toDos.map((toDo,index) => (
                    <DragabbleCard key={toDo} index={index} toDo={toDo}/>
                    ))}
                    {magic.placeholder}
                    
                </Area>
                }
            </Droppable>
        </Wrapper>
        
    )
}
export default Board