import React from "react";
import Question from "./Question";
function Dashboard (props) {
    console.log(props)
    const rows =
      props.data.map((row, index)=> {
          return (
               <tr>
                   <td > {index + 1}. {row.user_name} </td>
                    <td>{row.score} </td>
               </tr>
                   )
      })

    return (
        <table className= "ui inverted greed table">
            <thead>
            <tr>
                <th>Name</th>
                <th>Score</th>
            </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}
export default Dashboard;
