import styled from "styled-components";

export const Button = styled.button`
  font-size: 14px;
  cursor: pointer;
  padding: 8px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: none;

  &.withText {
    width: 180px;
    text-transform: uppercase;
    span {
      margin: 2px 10px;
      white-space: nowrap;
    }
  }
  &.red {
    background-color: #e10600;

    color: white;
  }
  &.neutral {
    background-color: #daedf4;
    color: black;
    &:disabled {
      background-color: white;
      cursor: default;
      color: #daedf4;
    }
  }
  &.correctAnswerChecker {
    &.correct {
      background-color: #32cd32;
    }
  }
`;

export const QTypeContainer = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 5px;

  > span {
    width: 45px;
  }
  label {
    margin: 10px;
  }
  input {
    margin: 0;
  }
  button {
    margin-left: 20px;
  }
`;

export const RowQuestionContainer = styled.div`
  background-color: white;
  display: flex;

  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  height: 60px;
  margin: 15px 5px;
  label {
    display: inline-block;
    width: 45px;
    text-align: center;
  }
  textarea {
    width: calc(100% - 665px);
    height: calc(100% - 20px);
    border: none;
    resize: none;
    padding: 10px;
  }
  button {
    border: none;
    justify-self: flex-end;
    margin-left: 15px;
  }
`;

export const AnswersContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 10px;
`;
export const AnswerContainer = styled.div`
  margin: 5px;
  display: flex;
  background-color: white;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  label {
    width: 40px;
    text-align: center;
  }
  input {
    width: 230px;
    height: 30px;
    border: none;
    padding: 0 10px;
  }
  button {
    border: none;
  }
`;
export const QuestionWrapper = styled.div`
  padding: 10px;

  border-bottom: 3px solid #d3d3d3;
`;
export const QIMGContainer = styled.div`
  img {
    width: 323px;
    margin-left: 5px;
  }
`;

export const QuestionPicContainer = styled.div`
  width: 358px;
  margin: 5px;
  display: flex;
  background-color: white;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;

  label {
    width: 55px;
    text-align: center;
    font-size: 14px;
  }

  input {
    width: 249px;
    height: 30px;
    border: none;
    padding: 0 10px;
  }
  img {
    margin-top: 5px;
    width: 355px;
  }
`;

export const QuestionExplContainer = styled.div`
  width: 100%;
  margin: 5px;
  display: flex;
  background-color: white;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;

  > label {
    width: 100px;
    text-align: center;
    font-size: 14px;
  }

  > input {
    width: calc(100% - 335px);
    height: 60px;
    border: none;
    padding: 0 10px;
    margin-right: 15px;
  }
  

`;
