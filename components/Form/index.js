//import { loadJsonFile } from "load-json-file";
import { useState, useEffect, useRef } from "react";
import FormQuestion, { QUESTION_TYPES } from "./src/FormQuestion";
import {
  faCheckDouble,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as S from "./src/styled";
import styled from "styled-components";
import { downloadFile } from "../../utils/downloadFile";
import quiz003 from "../quiz003.json";

const Button = styled(S.Button)`
  //position: absolute;
  //right: 20px;
  margin: 10px 5px;
`;

const ButtonsRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const RowQuestionContainer = styled(S.RowQuestionContainer)`
  justify-content: flex-start;
  align-items: center;

  &.title {
    width: 400px;
  }
  &.title2 {
    width: 650px;
  }

  label {
    width: 120px;
    text-align: left;
  }
  input {
    height: 85px;
    width: calc(100% - 40px);
    border: none;
    padding: 0 10px;
  }
  textarea {
    width: 100%;
  }
`;

const QuizTitle = styled.h1`
  margin-left: 10px;
  width: 100px;
`;
const SectionTitle = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  &.bordertop {
    border-top: 3px solid #d3d3d3;
  }
  h2 {
    width: 200px;
  }
  button {
    margin-left: 10px;
  }
`;

const TopRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const AnswerContainer = styled(S.AnswerContainer)`
  label {
    width: 50px;
  }
`;

const AnswerItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  > div {
    margin-top: 0;
    margin-bottom: 2px;
  }
`;

const ResultLevelContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;

  height: 170px;

  ${S.AnswerContainer} {
    width: calc(50% - 15px);
    margin: 0 0 0px 10px;

    label {
    }
    label.long {
      width: 160px;
    }
    input {
      width: calc(100% - 70px);
    }
    input.long {
      width: calc(100% - 180px);
    }
  }
`;
const Order = styled.div`
  width: 60px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    width: 32px;
    margin-top: 10px;
  }
`;
const ResultTextContainer = styled.div`
  display: flex;
  align-items: flex-start;

  label {
    display: inline-block;
    text-align: center;
  }
  textarea {
    height: calc(100% - 10px);
  }
`;
const ResultLevelData = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  height: 100%;
  width: calc(100% - 500px);

  > div {
    calc(50% - 10px);
  }
  ${ResultTextContainer} {
    width: calc(100% - 13px);
    height: calc(100% - 35px);
    margin: 10px 0 0 10px;

    label {
      width: 100px;
      background-color: white;
      height: calc(100% - 5px);
    }
    textarea {
      width: calc(100% - 110px);
      border: none;
      resize: none;
    }
  }
`;
const ResultLevelImageContainer = styled.div`
  margin-left: 5px;
  background-color: green;
  height: 170px;
  img {
    height: 100%;
  }
`;

const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  input {
    width: calc(100% - 20px);
  }
  label {
    padding-bottom: 5px;
    width: 100%;
    font-size: 13px;
    text-align: center;
  }
  button {
    border: none;
    background-color: #e10600;
    color: white;
    padding: 10px 15px;
    margin-top: 5px;
    cursor: pointer;
  }
`;

export default function Index() {
  const inputFile = useRef(null);
  //const [title, setTitle] = useState("");
  //const [summary, setSummary] = useState("");
  //const [questions, setQuestions] = useState([]);
  //const [winnerTexts, setWinnerTexts] = useState([]);
  const [loadedFromFile, setLoadedFromFile] = useState(false);
  const [errors, setErrors] = useState("");

  const [title, setTitle] = useState(quiz003.quizTitle);
  const [summary, setSummary] = useState(quiz003.quizSynopsis);
  const [questions, setQuestions] = useState(quiz003.questions);
  const [winnerTexts, setWinnerTexts] = useState(quiz003.winnerTexts);

  useEffect(() => {
    //setLoadedFromFile(true);
  }, []);

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        question: "",
        questionPic: "",
        answerSelectionType: "",
        points: 1, //not supported yet
        answers: [],
        correctAnswers: [],
        explanation: "",
        questionType: "",
      },
    ]);
  };
  const setQuestion = (newValue, questionIndex) => {
    setQuestions((prev) => {
      const array = [...prev];
      array[questionIndex] = newValue;
      return array;
    });
  };
  const deleteQuestion = (index) => {
    setQuestions((prev) => prev.filter((v, i) => i !== index));
  };

  const checkQuestionsValidity = () => {
    let errors = "";
    if (!title) {
      errors = `${errors}\nKvíz nemá názov`;
    }
    if (!summary) {
      errors = `${errors}\nKvíz nemá žiadny popis`;
    }
    if (questions.length === 0) {
      errors = `${errors}\nKvíz musí mať aspoň jednu otázku`;
    }
    for (let index = 0; index < questions.length; index++) {
      const question = questions[index];
      if (
        question.question.length === 0 &&
        (question.questionPic.length === 0 || question.questionPic === "none")
      ) {
        errors = `${errors}\nOtázka ${
          index + 1
        } nemá znenie ani fotku, musí mať aspoň jedno`;
      }
      if (question.answers.length < 2) {
        errors = `${errors}\nOtázka ${
          index + 1
        } nemá určené aspoň dve odpovede`;
      }
      if (question.correctAnswers.length === 0) {
        errors = `${errors}\nOtázka ${
          index + 1
        } nemá určenú ani jednu správnu odpoveď`;
      }
      if (question.explanation.length === 0) {
        errors = `${errors}\nOtázka ${index + 1} nemá vysvetlenie`;
      }
    }
    if (winnerTexts.length < 2) {
      errors = `${errors}\nKvíz by mal mať aspoň dve úrovne hodnotenia`;
    }
    for (let index = 0; index < winnerTexts.length; index++) {
      const wtext = winnerTexts[index];
      if (!wtext.pic) {
        errors = `${errors}\n${
          index + 1
        }. úroveň hodnotenia nemá stanovený max. počet bodov, ktorý možno stratiť`;
      }
      if (!wtext.pic) {
        errors = `${errors}\n${index + 1}. úroveň hodnotenia nemá fotku`;
      }
      if (!wtext.text) {
        errors = `${errors}\n${index + 1}. úroveň hodnotenia nemá komentár`;
      }
    }
    setErrors(errors);
    return errors;
  };

  const onSummarySet = (value) => {
    setSummary(value);
  };
  const onTitleSet = (value) => {
    setTitle(value);
  };

  const onSubmit = () => {
    const validityResult = checkQuestionsValidity();
    if (validityResult) {
      console.log(validityResult);
    } else {
      console.log("VSEETKO OK, generujem");

      downloadFile({
        objectToJson: {
          quizTitle: title,
          quizSynopsis: summary,
          questions: questions.map((q) => ({
            ...q,
            explanationPic:
              q.explanationPic && q.explanationPic != "none"
                ? q.explanationPic
                : "",
            answerSelectionType: (q.answerSelectionType =
              q.correctAnswers.length === 1 ? "single" : "multiple"),
          })),
          winnerTexts: winnerTexts,
          quizType: "guess",
        },
        fileName: "kviz",
      });
    }
  };
  const addWinnerText = () => {
    setWinnerTexts((prev) => [
      ...prev,
      {
        maxPtsLoss: 0,
        text: "",
        pic: "",
      },
    ]);
  };
  const deleteWinnerText = (index) => {
    setWinnerTexts((prev) => prev.filter((v, i) => index !== i));
  };
  const onPointsSet = (index, points) => {
    setWinnerTexts((prev) => {
      const array = [...prev];
      array[index].maxPtsLoss = parseInt(points);
      return array;
    });
  };
  const onPicSet = (index, pic) => {
    setWinnerTexts((prev) => {
      const array = [...prev];
      array[index].pic = pic;
      return array;
    });
  };
  const onWinnerTextSet = (index, text) => {
    setWinnerTexts((prev) => {
      const array = [...prev];
      array[index].text = text;
      return array;
    });
  };

  const onFileOpenClick = async (e) => {
    var fr = new FileReader();
    fr.readAsText(e.target.files[0]);
    fr.onload = function (event) {
      const data = JSON.parse(event.target.result);

      setQuestions(data.questions);
      setTitle(data.quizTitle);
      setSummary(data.quizSynopsis);
      setWinnerTexts(data.winnerTexts);
      setLoadedFromFile(true);
    };
  };
  /*
  useEffect(() => {
    if (!loadedFromFile) {
      setQuestions([]);
      setTitle("");
      setSummary("");
      setWinnerTexts([]);
    }
  }, [loadedFromFile]);*/

  return (
    <div>
      <TopRowContainer>
        <QuizTitle>Kvíz</QuizTitle>
        <RowQuestionContainer className="title">
          <label>Názov kvízu:</label>
          <input
            placeholder="Názov kvízu"
            type="text"
            value={title}
            onChange={(e) => onTitleSet(e.target.value)}
          />
        </RowQuestionContainer>
        <RowQuestionContainer className="title2">
          <label>Popis kvízu:</label>
          <textarea
            rows="2"
            placeholder="Krátky popis kvízu, o čom je."
            type="text"
            value={summary}
            onChange={(e) => onSummarySet(e.target.value)}
          />
        </RowQuestionContainer>
        <FileUploadContainer>
          <label htmlFor="fileinput">Nahrať kvíz zo súboru</label>
          <input
            type="file"
            id="fileinput"
            placeholder="Nahrať zo súboru..."
            //style={{ width: 0 }}
            onChange={(e) => onFileOpenClick(e)}
            ref={inputFile}
          />
          {loadedFromFile && (
            <button onClick={() => setLoadedFromFile(false)}>Zrušiť</button>
          )}
        </FileUploadContainer>
      </TopRowContainer>
      <SectionTitle className="bordertop">
        <h2>Otázky</h2>
        <Button
          //disabled={!showAddQuestion}
          className="withText neutral"
          onClick={() => addQuestion()}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Pridať otázku</span>
        </Button>
      </SectionTitle>
      {questions.map((question, index) => (
        <FormQuestion
          key={index}
          questionData={question}
          setQuestionData={(val) => setQuestion(val, index)}
          deleteQuestion={() => deleteQuestion(index)}
          questionIndex={index}
        />
      ))}

      <SectionTitle>
        <h2>Hodnotenie</h2>
        <Button
          //disabled={!showAddQuestion}
          className="withText neutral"
          onClick={() => addWinnerText()}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Pridať úroveň</span>
        </Button>
      </SectionTitle>
      {winnerTexts.map((winnerText, index) => (
        <ResultLevelContainer key={index}>
          <Order>
            <span>LVL {index + 1}</span>
            <S.Button
              className="red"
              onClick={() => deleteWinnerText(index)}
              tabIndex="-1"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </S.Button>
          </Order>
          <ResultLevelData>
            <AnswerContainer>
              <label className="long">{`Max. bodová strata:`}</label>
              <input
                className="long"
                maxLength={100}
                type="number"
                placeholder={`Počet bodov`}
                id={`Winnertext${index}`}
                value={winnerText.maxPtsLoss}
                onChange={(e) => onPointsSet(index, e.target.value)}
              />
            </AnswerContainer>
            <AnswerContainer>
              <label>{`IMG:`}</label>
              <input
                maxLength={100}
                placeholder={`Link na fotku k úrovni ${index + 1}`}
                id={`Winnertext${index}`}
                value={winnerText.pic}
                onChange={(e) => onPicSet(index, e.target.value)}
              />
            </AnswerContainer>
            <ResultTextContainer>
              <label>Komentár:</label>
              <textarea
                rows="2"
                placeholder="Čo sa má zobraziť ľuďom, ktorí dosiahli túto úroveň."
                type="text"
                value={winnerText.text}
                onChange={(e) => onWinnerTextSet(index, e.target.value)}
              />
            </ResultTextContainer>
          </ResultLevelData>
          <ResultLevelImageContainer>
            <img
              src={
                winnerText.pic
                  ? winnerText.pic
                  : "https://wpadmin.f1online.sk/wp-content/uploads/title-logo-wb.png"
              }
            />
          </ResultLevelImageContainer>
        </ResultLevelContainer>
      ))}
      <ButtonsRow>
        <Button
          //disabled={!showAddQuestion}
          className="withText neutral"
          onClick={() => onSubmit()}
        >
          <FontAwesomeIcon icon={faCheckDouble} />
          <span>Vyrobiť kvíz</span>
        </Button>
      </ButtonsRow>
      {errors.split("\n").map((error, index) => {
        if (index === 0) return;
        return <p key={index}>{`CHYBA: ${error}`}</p>;
      })}
    </div>
  );
}
