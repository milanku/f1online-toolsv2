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
    //width: 180px;
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
  display: flex;

  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
  flex-wrap: wrap;
  height: 130px;
  margin: 0;

  &.minusOne {
    height: 225px;
    width: calc(100% - 300px);
  }
  &.minusTwo {
    height: 225px;
    width: calc(100% - 600px);
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  label {
    display: inline-block;
    width: 45px;
    text-align: center;
    margin-top: 10px;
  }
  textarea {
    width: calc(100% - 75px);
    height: calc(100% - 65px);
    border: none;
    resize: none;
    padding: 10px;
    background-color: white;
    overflow: hidden;
  }
  button {
    border: none;
    //width: 32px;
    margin: 10px;
    &.withText {
      margin: 0;
      margin-top: 10px;
      margin-left: 10px;
      //width: 180px;
    }
  }
`;

export const AnswersContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 15px;
  margin-bottom: 10px;
  margin-left: 55px;
  width: 100%;
`;
export const AnswerContainer = styled.div`
  margin: 5px 10px 5px 0;
  display: flex;
  background-color: white;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  label {
    width: 22px;

    text-align: right;
  }
  input {
    width: 187px;
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
  width: 290px;
  display: flex;

  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin-left: 10px;

  > div {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 15px;
  }

  label {
    width: 55px;
    text-align: center;
    font-size: 14px;
  }

  input {
    width: calc(100% - 35px);
    height: 30px;
    border: none;
    padding: 0 10px;
    background-color: white;
  }
  img {
    margim: 0;
    width: 100%;
  }
  span.picTitle {
    position: absolute;
    background-color: white;
    padding: 2px 10px;
    font-size: 12px;
    //right: 0;
    //top: 20px;
  }
`;

export const QuestionExplContainer = styled.div`
  width: 100%;
  margin: 0;
  margin-left: 55px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;

  > div {
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  label {
    margin-top: 10px;
    width: 100px;
    text-align: center;
    font-size: 14px;
  }
  textarea {
    width: 100%;
    height: 58px;
    border: none;
    resize: none;
    overflow: hidden;
    padding: 10px;
    background-color: white;
  }
  > input {
    width: calc(100% - 335px);
    height: 60px;
    border: none;
    padding: 0 10px;
    margin-right: 15px;
  }
  button {
    margin-left: 10px;
  }
`;
//-.....................................................
export const QuestionContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
