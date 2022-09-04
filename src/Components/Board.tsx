import { Droppable } from "react-beautiful-dnd"
import styled from "styled-components"
import DragabbleCard from "./DragabbleCard"
import { useForm } from "react-hook-form"
import { ITodo, toDoState } from "../atom"
import { useSetRecoilState } from "recoil"
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

const Form = styled.form`
    width: 100%;
    input{
        width: 100%;
    }
`

interface IBoardProps {
    toDos:ITodo[];
    boardId:string;
}

interface IAreaProps{
    isDraggingOver :boolean
    isDraggingFromThis : boolean;
}

interface IForm{
    toDo:string;
}

function Board({toDos,boardId} : IBoardProps){
    const setToDos = useSetRecoilState(toDoState)
    const { register, setValue, handleSubmit} = useForm<IForm>()
    const onValid = ({toDo}:IForm) => {
        const newTodo = {
            id:Date.now(),
            text : toDo
        };
        setToDos((allBoards) => {
            // console.log(allBoards);
            const boardCopy = allBoards;

            const boardIndex = boardCopy.findIndex((item) => item.boardId === boardId);
            // console.log(boardIndex);
            // boardCopy[boardIndex].value.push(newTodo);
            console.log(boardCopy[boardIndex].value)
            return allBoards
        })
        setValue("toDo","")
    }
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Form onSubmit={handleSubmit(onValid)}>
                <input {...register("toDo",{required:true})} type="text" placeholder={`Add task to ${boardId}`}/>
            </Form>
            <Droppable droppableId={boardId}>
                {
                (magic,shapshot) => 
                <Area isDraggingOver={shapshot.isDraggingOver} isDraggingFromThis={Boolean(shapshot.draggingFromThisWith)} ref={magic.innerRef} {...magic.droppableProps}> 
                    {toDos.map((toDo,index) => (
                    <DragabbleCard key={toDo.id} index={index} toDoId={toDo.id} toDoText={toDo.text}/>
                    ))}
                    {magic.placeholder}
                    
                </Area>
                }
            </Droppable>
        </Wrapper>
        
    )
}
export default Board