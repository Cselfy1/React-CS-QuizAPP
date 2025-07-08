import React, { useEffect, useState } from "react";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswerIndexes?: number[];
}

interface Quiz {
  category: string;
  questions: Question[];
}

interface UserAnswer {
  questionId: number;
  selectedIndexes: number[];
}

interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  wrongQuestionIds: number[];
}

export const Quiz: React.FC = () => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://localhost:7091/api/Quiz/category/JavaScript")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load quiz");
        return res.json();
      })
      .then((data) => {
        setQuiz(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load quiz");
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={styles.loading}>Loading quiz...</div>;
  if (error) return <div style={styles.error}>{error}</div>;
  if (!quiz) return null;

  const question = quiz.questions[currentIndex];

  const toggleOption = (optionIndex: number) => {
    setUserAnswers((prev) => {
      const existing = prev.find((a) => a.questionId === question.id);
      if (!existing) {
        return [...prev, { questionId: question.id, selectedIndexes: [optionIndex] }];
      } else {
        let newSelected = [...existing.selectedIndexes];
        if (newSelected.includes(optionIndex)) {
          newSelected = newSelected.filter((i) => i !== optionIndex);
        } else {
          newSelected.push(optionIndex);
        }
        return [...prev.filter((a) => a.questionId !== question.id), { questionId: question.id, selectedIndexes: newSelected }];
      }
    });
  };

  const isOptionSelected = (optionIndex: number) => {
    const answer = userAnswers.find((a) => a.questionId === question.id);
    return answer?.selectedIndexes.includes(optionIndex) || false;
  };

  const handleNext = async () => {
    setError("");
    if (currentIndex + 1 < quiz.questions.length) {
      setCurrentIndex(currentIndex + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      try {
        const response = await fetch("https://localhost:7091/api/Quiz/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userAnswers),
        });

        if (!response.ok) {
          setError("Failed to submit answers");
          return;
        }

        const resultData: QuizResult = await response.json();
        setResult(resultData);
      } catch {
        setError("Network error while submitting answers");
      }
    }
  };

  if (result) {
    return (
      <div style={styles.resultContainer}>
        <h2 style={styles.title}>Quiz Result</h2>
        <p style={styles.resultText}>
          You answered <strong>{result.correctAnswers}</strong> out of <strong>{result.totalQuestions}</strong> questions correctly.
        </p>
        {result.wrongQuestionIds.length > 0 && (
          <p style={{ ...styles.resultText, color: "#d33" }}>
            Wrong question IDs: {result.wrongQuestionIds.join(", ")}
          </p>
        )}
        <button style={styles.restartButton} onClick={() => {
          setResult(null);
          setCurrentIndex(0);
          setUserAnswers([]);
          setError("");
        }}>
          Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{quiz.category} Quiz</h2>
      <p style={styles.progress}>
        Question {currentIndex + 1} of {quiz.questions.length}
      </p>
      <p style={styles.questionText}>{question.text}</p>
      <ul style={styles.optionsList}>
        {question.options.map((opt, idx) => (
          <li key={idx} style={styles.optionItem}>
            <label style={styles.label}>
              <input
                type="checkbox"
                checked={isOptionSelected(idx)}
                onChange={() => toggleOption(idx)}
                style={styles.checkbox}
              />{" "}
              <span style={styles.optionText}>{opt}</span>
            </label>
          </li>
        ))}
      </ul>
      <button
        onClick={handleNext}
        disabled={!userAnswers.find((a) => a.questionId === question.id)}
        style={{
          ...styles.nextButton,
          backgroundColor: userAnswers.find((a) => a.questionId === question.id) ? "#0066ff" : "#999",
          cursor: userAnswers.find((a) => a.questionId === question.id) ? "pointer" : "not-allowed",
        }}
      >
        {currentIndex + 1 === quiz.questions.length ? "Finish" : "Next"}
      </button>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: 650,
    margin: "40px auto",
    padding: 30,
    backgroundColor: "#f9faff",
    borderRadius: 15,
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#222",
  },
  loading: {
    textAlign: "center",
    marginTop: 100,
    fontSize: 20,
    color: "#555",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  error: {
    color: "#cc0000",
    textAlign: "center",
    marginTop: 15,
    fontWeight: "600",
  },
  title: {
    textAlign: "center",
    color: "#003366",
    marginBottom: 15,
    fontSize: "2rem",
    fontWeight: "700",
    textTransform: "uppercase",
  },
  progress: {
    fontSize: 16,
    marginBottom: 15,
    fontWeight: "600",
    color: "#0066cc",
  },
  questionText: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 25,
  },
  optionsList: {
    listStyle: "none",
    padding: 0,
    marginBottom: 25,
  },
  optionItem: {
    marginBottom: 15,
  },
  label: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    fontSize: 16,
    color: "#222",
  },
  checkbox: {
    width: 22,
    height: 22,
    marginRight: 15,
    cursor: "pointer",
  },
  optionText: {
    userSelect: "none",
  },
  nextButton: {
    padding: "12px 30px",
    borderRadius: 25,
    border: "none",
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    transition: "background-color 0.3s ease",
    boxShadow: "0 4px 12px rgba(0, 102, 255, 0.5)",
  },
  resultContainer: {
    maxWidth: 600,
    margin: "60px auto",
    textAlign: "center",
    backgroundColor: "#e7f3ff",
    padding: 30,
    borderRadius: 15,
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    color: "#004085",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  resultText: {
    fontSize: 18,
    marginBottom: 20,
  },
  restartButton: {
    marginTop: 20,
    padding: "10px 25px",
    fontSize: 16,
    fontWeight: "600",
    backgroundColor: "#0066ff",
    color: "white",
    border: "none",
    borderRadius: 25,
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0, 102, 255, 0.6)",
  },
};
