import { Draggable } from "react-beautiful-dnd"
import React from "react";
import styled from "styled-components"

const Card = styled.div<{isDragging:boolean}>`
  border-radius: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.isDragging ? "#74B9FF" : props.theme.cardColor};
  margin-top: 10px;
  box-shadow: ${props => props.isDragging ? "0px 2px 25px rgba(0,0,0,0.05)" : "none"};
`

interface IDragabbleCardProps{
  toDo:string;
  index:number;
}

function DragabbleCard({toDo,index}:IDragabbleCardProps){
    return (
        <Draggable key={toDo} draggableId={toDo} index={index}>
          {(magic,shapshot) => 
          <Card  isDragging={shapshot.isDragging} ref={magic.innerRef}{...magic.dragHandleProps}  {...magic.draggableProps}>
            {toDo}
          </Card>}
        </Draggable>
    )
}
export default React.memo(DragabbleCard)