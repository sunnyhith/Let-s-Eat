import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth";

import Button from "components/CustomButtons/Button.js";
import {testVote} from "components/events/votingUtil"

const suggest = () =>{
    console.log("Enter click");
    return(
        <div>
            <div>
                <Button mt={20} onClick ={testVote}> dont click</Button>
            </div>
            <div>
                <Button mt={20} onClick ={testVote}> dont click</Button>
            </div>
            <div>
                <Button mt={20} onClick ={testVote}> test voting</Button>
            </div>
        </div>
    )
};

export default suggest;