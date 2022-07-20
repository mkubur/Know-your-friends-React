import React from "react";
import Options from "./Options";
import "./Question.css";
import axios from "axios";
import Answer from "./Answer";
import Username from "./Username";
import Dashboard from "./Dashboard";
class Question extends React.Component {
    state = {
        question_id: 0,
        question_body: '',
        correct : 0,
        correctCount: 0,
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        finished : false,
        selected: -1,
        index : 0,
        questions : [],
        loggedIn : false,
        form_id : 0,
        testedUser : '',
        dashboard : [],
        dbClicked : false
}
    // updates the selected value

    componentDidMount() {
        axios.get('http://localhost:3001/questions', {
            question_id: this.question_id,
            question_body: this.question_body,
            correct : this.correct,
            option1 : this.option1,
            option2 : this.option2,
            option3 : this.option3,
            option4 : this.option4,
            form_id : this.form_id

        }).then((response)=> {
            //console.log(response)
            this.setState({questions: response.data})
            //console.log(this.state.questions)

        })


    }

    getNextQuestion = ()=> {
        // set the options

        const i = this.state.index
        this.setState({option1 : this.state.questions[i].option1})
        this.setState({option2 : this.state.questions[i].option2})
        this.setState({option3 : this.state.questions[i].option3})
        this.setState({option4 : this.state.questions[i].option4})
        // set question
        this.setState({question_body : this.state.questions[i].question_body})
        // set the correct answer
        this.setState({correct : this.state.questions[i].correct})
        this.setState({form_id : this.state.questions[0].form_id})
    }

    updateSelected = (key) => {
        this.setState({selected: key})
    }

    submitScore = ()=> {
        axios.post('http://localhost:3001/submitScore', {
            name: this.state.testedUser,
            score: this.state.correctCount,
            form_id : this.state.form_id
        })
    }

    onAnswerSubmit = ()=> {
        if (this.state.selected === -1) return;
        if (this.state.selected === this.state.correct) {
            this.setState({correctCount: this.state.correctCount+1})
        }

        if (this.state.index === this.state.questions.length) {
            this.setState({finished : true});
            this.submitScore();
            this.getDashboard();
            return;
        }
        // updates the index to the next question
        this.setState({index : this.state.index+1})
        this.getNextQuestion()
        // populate next question and answers
    }

    logIn = (name)=> {

        this.setState({loggedIn : true, testedUser : name});
        console.log(name)
    }

    getDashboard = ()=> {
        axios.get('http://localhost:3001/dashboard', {
            params : {form_id : this.state.form_id }
        }).then((res)=> {
            console.log(res)
            this.setState({dashboard : res.data})
        })
    }

    displayDashboard = ()=> {
        this.setState({dbClicked : true})
    }

    render() {
        if (this.state.dbClicked) {
            return (
                <div className="dashboard">
                    <a className="ui blue ribbon label">Mohamed's Dashboard </a>
                    <Dashboard data={this.state.dashboard}/>
                </div>

            )
        }
        if (this.state.finished) {
            return (
                <div className="center">
            <div className="ui grey statistic">
                <div className="label">
                    Well done! your score
                </div>
                <div className="value">
                    {this.state.correctCount}
                </div>
            </div>
                    <button className="ui purple button" onClick={this.displayDashboard}> View Dashboard </button>
                </div>
            )
         }
        if (!this.state.loggedIn) {
            return < Username logIn= {this.logIn} />
        }
        return (
            <div className="ui segment">
                 <div className="center">
                    <h3> {this.state.question_body} </h3>
                     <Answer className = "answer" updateSelected = {this.updateSelected} id = {1} body={this.state.option1}/>
                     <Answer updateSelected = {this.updateSelected} id = {2} body={this.state.option2}/>
                     <Answer updateSelected = {this.updateSelected} id = {3} body={this.state.option3}/>
                     <Answer updateSelected = {this.updateSelected} id = {4} body={this.state.option4}/>
                     <button className= "ui blue button"
                             onClick={this.onAnswerSubmit}>Check</button>
                     <button className="ui orange button" onClick={this.getNextQuestion} > Start </button>
                </div>


            </div>
        )
    }
}
export default Question;
