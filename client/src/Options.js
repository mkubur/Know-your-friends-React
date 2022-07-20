import React from "react"
import Answer from "./Answer";


class Options extends React.Component {

    render(props) {
        const fun = this.props.updateSelected
        return (
         <Answer updateSelected = {fun}  body={this.props.option}> </Answer>
        )
    }
}
export default Options;