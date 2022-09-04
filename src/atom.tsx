import {atom,selector} from "recoil"
import { localStorageEffect } from "./localStroage";
export interface ITodo{
    id  : number,
    text : string;
}


interface IToDoItem{
    boardId:string;
    value : ITodo[]
}

interface IToDoState extends Array<IToDoItem>{
   
} 



export const toDoState = atom<IToDoState>({
    key:"toDo",
    default:[
        {
            boardId:"To Do",
            value:[]
        }
    ],
    effects:[localStorageEffect("toDo")]
})