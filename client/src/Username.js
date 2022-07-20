import React from "react";
import {useState} from "react";
import "./Question.css";



function Username (props){
    const [name, setName] = useState('')
    const clicked = props.logIn;
    const addUser = ()=> {
        clicked(name);
    }

    return (
        <div className="username">
        <div className="ui inverted segment">
            <div className="ui inverted form">
                <div className="one fields">
                    <div className="field">
                        <label>Name</label>
                        <input placeholder="Your Name" type="text" onChange={(e)=> {setName(e.target.value)}}/>
                    </div>
                </div>
                <div className="ui submit button" onClick={addUser}>Start</div>
            </div>
        </div>
        </div>
    )
}
export default Username;

