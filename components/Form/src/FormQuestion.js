import { useState } from "react";
import { CONST } from "../../../utils/const";
import {
  faCheck,
  faCheckCircle,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as S from "./styled";

const alphabet = ["A)", "B)", "C)", "D)", "E)", "F)"];
export const QUESTION_TYPES = { TEXT: "text", PHOTO: "photo" };

const QuestionInput = (props) => {
  const {
    index,
    onDelete,
    answerAddEnabled,
    onAddAnswer,
    value,
    onValueChange,
    questionPic,
    onSetQuestionPic,
    explanationPic,
    onExplanationPicChange,
  } = props;

  return (
    <>
      <S.RowQuestionContainer
        className={
          questionPic && explanationPic
            ? "minusTwo"
            : questionPic || explanationPic
            ? "minusOne"
            : ""
        }
      >
        <div>
          <label>{`${index + 1}.`}</label>
          <S.Button className="red" onClick={() => onDelete()} tabIndex="-1">
            <FontAwesomeIcon icon={faTrashAlt} />
          </S.Button>
        </div>
        <textarea
          rows="2"
          placeholder="Znenie otázky"
          type="text"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
        />
        <S.Button
          tabIndex="-1"
          disabled={!answerAddEnabled}
          className="withText neutral halfwidth"
          onClick={() => onAddAnswer()}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Odpoveď</span>
        </S.Button>
        <S.Button
          tabIndex="-1"
          disabled={questionPic}
          className="withText neutral halfwidth"
          onClick={() => onSetQuestionPic("none")}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Fotka k otázke</span>
        </S.Button>
        <S.Button
          tabIndex="-1"
          disabled={explanationPic}
          className="withText neutral"
          onClick={() => onExplanationPicChange("none")}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Fotka k vysvetleniu</span>
        </S.Button>
      </S.RowQuestionContainer>
      {questionPic && (
        <S.QuestionPicContainer className={questionPic ? "" : "noshow"}>
          <>
            <img
              src={
                questionPic === "none"
                  ? "https://wpadmin.f1online.sk/wp-content/uploads/title-logo-wb.png"
                  : questionPic
              }
            />
            <span className="picTitle">Foto k otázke</span>
            <div>
              <input
                id={`photopic${index}`}
                placeholder="Link na fotku k otázke"
                value={questionPic !== "none" ? questionPic : ""}
                onChange={(e) =>
                  onSetQuestionPic(e.target.value ? e.target.value : "none")
                }
              />
              <S.Button
                className="red"
                onClick={() => onSetQuestionPic("")}
                tabIndex="-1"
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </S.Button>
            </div>
          </>
        </S.QuestionPicContainer>
      )}
      {explanationPic && (
        <S.QuestionPicContainer className={questionPic ? "" : "noshow"}>
          <>
            <img
              src={
                explanationPic === "none"
                  ? "https://wpadmin.f1online.sk/wp-content/uploads/title-logo-wb.png"
                  : explanationPic
              }
            />
            <span className="picTitle">Foto k vysvetleniu</span>
            <div>
              <input
                id={`photopic${index}`}
                placeholder="Link na fotku k otázke"
                value={explanationPic !== "none" ? explanationPic : ""}
                onChange={(e) =>
                  onExplanationPicChange(
                    e.target.value ? e.target.value : "none"
                  )
                }
              />
              <S.Button
                className="red"
                onClick={() => onSetQuestionPic("")}
                tabIndex="-1"
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </S.Button>
            </div>
          </>
        </S.QuestionPicContainer>
      )}
    </>
  );
};

const Input = (props) => {
  const {
    value,
    onValueChange,
    index,
    label,
    onDelete,
    questionType,
    isCorrectAnswer,
    onIsCorrectAnswerClicked,
    showAddQuestion,
    onAddAnswer,
  } = props;

  return (
    <S.QIMGContainer>
      <S.AnswerContainer>
        <label>{alphabet[index]}</label>
        <input
          onChange={(e) => onValueChange(e.target.value)}
          maxLength={100}
          placeholder={`${getQuestionAnswerPlaceholder(questionType)} ${
            index + 1
          }`}
          id={`ANS${props.index}`}
          value={value}
        />
        <S.Button
          className={`correctAnswerChecker ${isCorrectAnswer ? "correct" : ""}`}
          onClick={() => onIsCorrectAnswerClicked()}
          tabIndex="-1"
        >
          <FontAwesomeIcon icon={faCheck} />
        </S.Button>
        <S.Button className="red" onClick={() => onDelete()} tabIndex="-1">
          <FontAwesomeIcon icon={faTrashAlt} />
        </S.Button>
      </S.AnswerContainer>
      {questionType && questionType === QUESTION_TYPES.PHOTO && value && (
        <img src={value} />
      )}
    </S.QIMGContainer>
  );
};

const getQuestionAnswerPlaceholder = (type) => {
  switch (type) {
    case QUESTION_TYPES.TEXT:
      return "Odpoveď";
    case QUESTION_TYPES.PHOTO:
      return "Link na obrázok";
  }
  return "Odpoveď";
};

const QuestionTypePicker = ({
  questionType,
  onQuestionTypePicked,
  onDelete,
  index,
}) => {
  const onSubmit = (e) => {
    e.preventDefault();
    onQuestionTypePicked(e.target.value);
  };

  const onRadioChange = (e) => {
    onQuestionTypePicked(e.target.value);
  };

  return (
    <S.QTypeContainer>
      <span>{`${index + 1}.`}</span>
      <label>Vyber typ otázky: </label>
      <input
        type="radio"
        id={`text${index}`}
        name={`question_type${index}`}
        value={QUESTION_TYPES.TEXT}
        onChange={onRadioChange}
        checked={QUESTION_TYPES.TEXT === questionType}
      />
      <label htmlFor={`text${index}`}>S textovými odpoveďami</label>
      <input
        onChange={onRadioChange}
        type="radio"
        id={`radio${index}`}
        name={`question_type${index}`}
        value={QUESTION_TYPES.PHOTO}
        checked={QUESTION_TYPES.PHOTO === questionType}
      />
      <label htmlFor={`radio${index}`}>S fotkami ako odpoveďami</label>
      <S.Button
        tabIndex="-1"
        type="button"
        className="red withText"
        onClick={() => onDelete()}
      >
        <FontAwesomeIcon icon={faTrashAlt} />
        <span>Zmazať otázku</span>
      </S.Button>
    </S.QTypeContainer>
  );
};

const ExplanationContainer = ({ index, explanation, onExplanationChange }) => {
  return (
    <S.QuestionExplContainer>
      <textarea
        id={`explanation${index}`}
        rows="2"
        placeholder="Vysvetlenie k odpovediam (zobrazí sa po vyplnení kvízu pod otázkou)"
        value={explanation}
        onChange={(e) => onExplanationChange(e.target.value)}
      />
    </S.QuestionExplContainer>
  );
};

export default function FormQuestion({
  questionIndex,
  deleteQuestion,
  questionData,
  setQuestionData,
}) {
  const addAnswer = () => {
    if (questionData.answers.length >= CONST.MAX_ANSWER_PER_QUESTION) return;
    setQuestionData({
      ...questionData,
      answers: [...questionData.answers, ""],
    });
  };
  const removeAnswer = (index) => {
    //remove index from correct answers and lower indices that were higher by 1
    setQuestionData({
      ...questionData,
      correctAnswers: questionData.correctAnswers
        .filter((v) => v !== index)
        .map((el) => {
          if (el >= index) return el - 1;
          return el;
        }),
      answers: questionData.answers.filter((v, i) => i !== index),
    });
  };

  const onTypePicked = (type) => {
    setQuestionData({
      ...questionData,
      questionType: type,
    });
  };
  const setAnswer = (answerValue, index) => {
    setQuestionData({
      ...questionData,
      answers: questionData.answers.map((answer, i) => {
        if (index === i) {
          return answerValue;
        }
        return answer;
      }),
    });
  };

  const toggleCorrectAnswer = (index) => {
    if (questionData.correctAnswers.includes(index)) {
      setQuestionData({
        ...questionData,
        correctAnswers: questionData.correctAnswers.filter(
          (el) => el !== index
        ),
      });
    } else {
      setQuestionData({
        ...questionData,
        correctAnswers: [...questionData.correctAnswers, index],
      });
    }
  };

  const setQuestionTitle = (value) => {
    setQuestionData({
      ...questionData,
      question: value,
    });
  };
  const setQuestionPic = (src) => {
    setQuestionData({
      ...questionData,
      questionPic: src,
    });
  };
  const setExplanation = (expl) => {
    setQuestionData({
      ...questionData,
      explanation: expl,
    });
  };
  const setExplanationPic = (expl) => {
    setQuestionData({
      ...questionData,
      explanationPic: expl,
    });
  };

  console.log("rendeinrg: ", questionData);
  return (
    <S.QuestionWrapper>
      {!questionData.questionType ? (
        <QuestionTypePicker
          questionType={questionData.questionType}
          onQuestionTypePicked={(type) => onTypePicked(type)}
          index={questionIndex}
          onDelete={() => deleteQuestion()}
        />
      ) : (
        <S.QuestionContainer>
          <QuestionInput
            index={questionIndex}
            value={questionData.question}
            onValueChange={(q) => setQuestionTitle(q)}
            onDelete={() => deleteQuestion()}
            questionPic={questionData.questionPic}
            onSetQuestionPic={(src) => setQuestionPic(src)}
            onAddAnswer={() => addAnswer()}
            answerAddEnabled={
              questionData.answers.length < CONST.MAX_ANSWER_PER_QUESTION
            }
            explanationPic={questionData.explanationPic}
            onExplanationPicChange={(e) => setExplanationPic(e)}
          />

          <S.AnswersContainer>
            {questionData.answers.map((answer, index) => (
              <Input
                key={index}
                index={index}
                value={questionData.answers[index]}
                onValueChange={(value) => setAnswer(value, index)}
                isCorrectAnswer={questionData.correctAnswers.includes(index)}
                onIsCorrectAnswerClicked={(value) => toggleCorrectAnswer(index)}
                onDelete={() => removeAnswer(index)}
                questionType={questionData.questionType}
              />
            ))}
          </S.AnswersContainer>
          <ExplanationContainer
            index={questionIndex} //doesnt matter
            explanation={questionData.explanation}
            explanationPic={questionData.explanationPic}
            onExplanationChange={(e) => setExplanation(e)}
            onExplanationPicChange={(e) => setExplanationPic(e)}
          />
        </S.QuestionContainer>
      )}
    </S.QuestionWrapper>
  );
}
