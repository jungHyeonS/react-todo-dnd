import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Can = styled.div`
    width: 60px;
    height: 60px;
    /* background: red; */
    position: fixed;
    bottom: 0;
    right: 0;
    div{
        width: 100%;
        height: 100%;
    }
`

const TrashCan = styled.div`
  width: 48px;
  height: 48px;
  position: relative;
  overflow: hidden;
  margin-left: 0px;
  margin-bottom: 25px;
  .trash-lid{
    width: 62%;
    height: 10%;
    position: absolute;
    left: 50%;
    margin-left: -31%;
    top: 10.5%;
    background-color: #000;
    border-top-left-radius: 80%;
    border-top-right-radius: 80%;
    -webkit-transform: rotate(-5deg);
    -moz-transform: rotate(-5deg);
    -ms-transform: rotate(-5deg);
    transform: rotate(-5deg); 
    background-color: #E5E9EA
  }
  .trash-lid::after{
    content: "";
  width: 26%;
  height: 100%;
  position: absolute;
  left: 50%;
  margin-left: -13%;
  margin-top: -10%;
  background-color: inherit;
  border-top-left-radius: 30%;
  border-top-right-radius: 30%;
  -webkit-transform: rotate(-1deg);
  -moz-transform: rotate(-1deg);
  -ms-transform: rotate(-1deg);
  transform: rotate(-1deg); 
  }
  .trash-container{
    width: 56%;
  height: 65%;
  position: absolute;
  left: 50%;
  margin-left: -28%;
  bottom: 10%;
  background-color: #000;
  border-bottom-left-radius: 15%;
  border-bottom-right-radius: 15%;
  background-color: #E5E9EA
  }
  .trash-container::after{
    content: "";
  width: 110%;
  height: 12%;
  position: absolute;
  left: 50%;
  margin-left: -55%;
  top: 0;
  background-color: inherit;
  border-bottom-left-radius: 45%;
  border-bottom-right-radius: 45%;
  }
  .trash-line-1{
    width: 4%;
  height: 50%;
  position: absolute;
  left: 38%;
  margin-left: -2%;
  bottom: 17%;
  background-color: #252527;
  }
  .trash-line-2{
    width: 4%;
  height: 50%;
  position: absolute;
  left: 50%;
  margin-left: -2%;
  bottom: 17%;
  background-color: #252527;
  }
  .trash-line-3{
    width: 4%;
  height: 50%;
  position: absolute;
  left: 62%;
  margin-left: -2%;
  bottom: 17%;
  background-color: #252527;
  }
`

function Trash(){
    return (
        <Can>
            <Droppable droppableId="trash">
                {
                    (magic,shapshot) =>
                    (
                        <div ref={magic.innerRef}>
                            <TrashCan>
                                <div className="trash-lid">
                                </div>
                                <div className="trash-container">
                                </div>
                                <div className="trash-line-1"></div>
                                <div className="trash-line-2"></div>
                                <div className="trash-line-3"></div>
                            </TrashCan>
                        </div>
                    )
                }
            </Droppable>
        </Can>
    );
}
export default Trash