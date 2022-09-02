import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "../Button/Button.css";

const BackArrow = () => {
const navigate = useNavigate();
          return (
                    <>
                       <BiArrowBack 
                              className="arrow-back" 
                              tittle={"Back"} 
                              color="var(--blue)" 
                              size="2em" 
                              cursor="pointer" 
                              onClick={() => navigate(-1)}
                        />
                    <br />
                    </>
          )
};


export default BackArrow;
