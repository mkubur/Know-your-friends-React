import React from "react";

class Answer extends React.Component{
    // updates the state of selected answer in Question state
    onChangeValue = (event)=> {
        this.props.updateSelected(this.props.id);
    }
    render(props) {
        const text = this.props.body;
        return (
            <div className ="field">
                <div className="ui radio checkbox">
                    <input type="radio" id = {this.props.id} name="option"  tabIndex="0"  onChange={this.onChangeValue} />
                    <label > {text} </label>
                </div>
            </div>
        )
    }
}
export default Answer;