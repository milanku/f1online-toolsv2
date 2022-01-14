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
    showAddQuestion,
    onAddAnswer,
    value,
    onValueChange,
    questionPic,
    onSetQuestionPic,
  } = props;

  return (
    <>
      <S.RowQuestionContainer>
        <label>{`${index + 1}.`}</label>
        <textarea
          rows="2"
          placeholder="Znenie otázky"
          type="text"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
        />
        <S.Button
          tabIndex="-1"
          disabled={questionPic}
          className="withText neutral"
          onClick={() => onSetQuestionPic("none")}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Pridať fotku</span>
        </S.Button>
        <S.Button
          tabIndex="-1"
          disabled={!showAddQuestion}
          className="withText neutral"
          onClick={() => onAddAnswer()}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Pridať odpoveď</span>
        </S.Button>
        <S.Button
          className="red withText"
          onClick={() => onDelete()}
          tabIndex="-1"
        >
          <FontAwesomeIcon icon={faTrashAlt} />
          <span>Zmazať otázku</span>
        </S.Button>
      </S.RowQuestionContainer>
      {questionPic && (
        <S.QuestionPicContainer>
          <label htmlFor={`photopic${index}`}>Foto:</label>
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
          {questionPic !== "none" && <img src={questionPic} />}
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

const ExplanationContainer = ({
  index,
  explanation,
  explanationPic,
  onExplanationPicChange,
  onExplanationChange,
}) => {
  return (
    <S.QuestionExplContainer>
      <label htmlFor={`explanation${index}`}>Vysvetlenie:</label>
      <input
        id={`explanation${index}`}
        placeholder="Vysvetlenie k odpovediam (zobrazí sa po vyplnení kvízu pod otázkou)"
        value={explanation}
        onChange={(e) => onExplanationChange(e.target.value)}
      />
      <S.Button
        tabIndex="-1"
        disabled={explanationPic}
        className="withText neutral"
        onClick={() => onExplanationPicChange("none")}
      >
        <FontAwesomeIcon icon={faPlus} />
        <span>Pridať fotku</span>
      </S.Button>
      {explanationPic && (
        <S.QIMGContainer>
          <S.AnswerContainer>
            <label>IMG</label>
            <input
              onChange={(e) =>
                onExplanationPicChange(e.target.value ? e.target.value : "none")
              }
              maxLength={100}
              placeholder={`Link na fotku k vysvetleniu`}
              id={`EXPLpic${index}`}
              value={explanationPic != "none" ? explanationPic : ""}
            />

            <S.Button
              className="red"
              onClick={() => onExplanationPicChange("")}
              tabIndex="-1"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </S.Button>
          </S.AnswerContainer>
          {explanationPic != "none" && <img src={explanationPic} />}
        </S.QIMGContainer>
      )}
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
      answers: [...questionData.answers, { value: "" }],
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
        <>
          <QuestionInput
            index={questionIndex}
            value={questionData.question}
            onValueChange={(q) => setQuestionTitle(q)}
            onDelete={() => deleteQuestion()}
            showAddQuestion={
              questionData.answers.length < CONST.MAX_ANSWER_PER_QUESTION
            }
            onAddAnswer={() => addAnswer()}
            questionPic={questionData.questionPic}
            onSetQuestionPic={(src) => setQuestionPic(src)}
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
        </>
      )}
    </S.QuestionWrapper>
  );
}
