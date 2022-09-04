import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atom";


const Form = styled.form`
    width: 100px;
    height: 100px;
`

interface IBoardForm {
    boardId : string
}

function AddBoard(){
    const setToDos = useSetRecoilState(toDoState);
    const {register,setValue,handleSubmit} = useForm<IBoardForm>()
    const onValid = ({boardId}:IBoardForm) => {
        setToDos((allBoard)=>{
            const newBoard = {
                boardId : boardId,
                value :[]
            }
            return [
                ...allBoard,
                newBoard
            ];
        })
        setValue("boardId","");
    }
    return (
        <Form onSubmit={handleSubmit(onValid)}>
            <input {...register("boardId")} type="text" placeholder={`Add task to`}/>
        </Form>

    );
}
export default AddBoard;