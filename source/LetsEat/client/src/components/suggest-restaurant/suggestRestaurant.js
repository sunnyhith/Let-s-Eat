import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth";

import Button from "components/CustomButtons/Button.js";
import {testSuggest} from "components/suggest-restaurant/suggestionDb"

const suggest = () =>{
    console.log("Enter click");
    return(
        <div>
            <div>
                <Button mt={20} onClick ={testSuggest}> dont click</Button>
            </div>
            <div>
                <Button mt={20} onClick ={testSuggest}> dont click</Button>
            </div>
            <div>
                <Button mt={20} onClick ={testSuggest}> test suggest restaurant</Button>
            </div>
        </div>
    )
};

export default suggest;