import { Droppable } from "react-beautiful-dnd"
import styled from "styled-components"
import DragabbleCard from "./DragabbleCard"

const Wrapper = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius : 10px;
  min-height: 200px;
`

const Title = styled.h1`
    text-align: center;
    font-weight: bold;
`

interface IBoardProps {
    toDos:string[];
    boardId:string;
}

function Board({toDos,boardId} : IBoardProps){
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Droppable droppableId={boardId}>
                {
                (magic) => 
                <Wrapper ref={magic.innerRef} {...magic.droppableProps}> 
                    {toDos.map((toDo,index) => (
                    <DragabbleCard key={toDo} index={index} toDo={toDo}/>
                    ))}
                    {magic.placeholder}
                    
                </Wrapper>
                }
            </Droppable>
        </Wrapper>
        
    )
}
export default Board