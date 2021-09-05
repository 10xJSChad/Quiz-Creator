import React from 'react';
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      screen: 0,
    }
  }
  
  changeScreen(screen){
    this.setState({
      screen: screen,
    })
  }

  render(){
    if(this.state.screen == 1) return(<QuizCreator/>)
    return(
        <div className="main-screen">
          <p>Welcome to quiz game</p>
          <button onClick={() => this.changeScreen(1)}>Create a quiz</button>
          <button>Import a quiz</button>
        </div>
    )
  }
}

class QuizCreator extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      questions: [],
      question: ["Question", 1, "Answer A", "Answer B", "Answer C", "Answer D"],
      correct: 0,
    }
    this.onChange = this.onChange.bind(this);
    this.inputTest = this.inputTest.bind(this);
    this.setAnswer = this.setAnswer.bind(this);
  }

  onChange(value, index){
    let question = this.state.question;
    question[index] = value;
    this.setState({
         question: question,
    });
  }

  setAnswer(index){
    this.setState({
         correct: index,
    });
    this.render();
  }

  AnswerButton(answer, val){
    var style = {}
    if(val == this.state.correct)
      style = {backgroundColor: "greenyellow"}

    return(
      <button 
      className="question-button"
      style={style}
      onClick={e => this.setAnswer(val)}
      >
        {this.state.question[val+1]}
        </button>
    )
  }

  inputTest(index){
    return(
      <input
      className="question-create-input"
      type="text"
      value={this.state.question[index]}
      onChange={e => this.onChange(e.target.value, index)}
    />
    )
  }

  
  render(){
    return(
      <>
      <div className="question-box">
      <h1>Create a question</h1>
        {this.inputTest(0)} <br/>
        {this.inputTest(2)}
        {this.inputTest(3)}
        {this.inputTest(4)}
        {this.inputTest(5)}
      </div>


      <div className="question-box">
      <h1>Question Preview</h1>
        <p className="question-text">{this.state.question[0]}</p>
        {this.AnswerButton(this.state.question[2], 1)}
        {this.AnswerButton(this.state.question[3], 2)}
        {this.AnswerButton(this.state.question[4], 3)}
        {this.AnswerButton(this.state.question[5], 4)}
        <br/>
        <button>Add question</button>
        <p>Click on an answer to mark it as correct</p>
      </div>
      </>
    )
  }
}

class Quiz extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      current: 0,
      questions: [["What color is red", 1, "Red", "Blue", "Left", "Right"], ["What color is blue", 2, "Red", "Blue", "Left", "Right"]],
      correct: 0,
    }

    this.checkAndIncrement = this.checkAndIncrement.bind(this)
  }

  checkAndIncrement(answer){
    if(answer == this.state.questions[this.state.current][1]){
      this.setState({
        correct: this.state.correct + 1,
      })
    }

    this.setState({
      current: this.state.current + 1,
    })
  }


  render(){
    if(this.state.current == this.state.questions.length){
      return(
        <div className="end-screen">
          <h1>The end</h1>
          <h1>You scored {this.state.correct} out of {this.state.questions.length}</h1>
        </div>
      )
    }
    return(
      <QuestionBox checkAndIncrement={this.checkAndIncrement} data={this.state.questions[this.state.current]}/>
    )
  }
}

class QuestionBox extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      guess: 0,
    }
    this.GiveAnswer = this.GiveAnswer.bind(this);
  }

  AnswerButton(answer, val){
    let buttonClass = "question-button";

    if(this.props.data[1] == val && this.state.guess != 0){
      buttonClass = "question-button-right"
    } else if (this.props.data[1] != val && this.state.guess != 0){
      buttonClass = "question-button-wrong"
    }

    if(answer != ""){
      return(
        <button className={buttonClass} onClick={() => this.GiveAnswer(val)}>{answer}</button>
      )
    }
  }

  GiveAnswer(val){
    if(this.state.guess != 0) return;
    this.setState({
      guess: 1
    })
    
    setTimeout(() => {
      this.props.checkAndIncrement(val);
      this.setState({
        guess: 0,
      })
    }, 3000);
  }

  render(){
    return(
      <div className="question-box">
        <p className="question-text">{this.props.data[0]}</p>
        {this.AnswerButton(this.props.data[2], 1)}
        {this.AnswerButton(this.props.data[3], 2)}
        {this.AnswerButton(this.props.data[4], 3)}
        {this.AnswerButton(this.props.data[5], 4)}
      </div>
    )
  }
}
export default App;
