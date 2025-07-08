using System.Collections.Generic;

namespace QuizApp.Models
{
    public static class QuizRepository
    {
        public static List<Quiz> AllQuizzes { get; } = new()
        {
            new Quiz
            {
                Category = "JavaScript",
                Questions = new List<Question>
                {
                    new Question
                    {
                        Id = 1,
                        Text = "What is the result of '2' + 2 in JavaScript?",
                        Options = new() { "4", "'22'", "NaN", "undefined" },
                        CorrectAnswerIndexes = new() { 1 }
                    },
                    new Question
                    {
                        Id = 2,
                        Text = "Which keyword creates a constant in JavaScript?",
                        Options = new() { "let", "const", "var", "define" },
                        CorrectAnswerIndexes = new() { 1 }
                    },
                    new Question
                    {
                        Id = 3,
                        Text = "How do you declare a function in JavaScript?",
                        Options = new() { "function myFunc() {}", "func myFunc() {}", "def myFunc() {}", "declare myFunc() {}" },
                        CorrectAnswerIndexes = new() { 0 }
                    },
                    new Question
                    {
                        Id = 4,
                        Text = "Which method converts JSON to a JavaScript object?",
                        Options = new() { "JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.toObject()" },
                        CorrectAnswerIndexes = new() { 0 }
                    },
                    new Question
                    {
                        Id = 5,
                        Text = "What does '===' mean in JavaScript?",
                        Options = new() { "Assignment", "Equal value and type", "Equal value only", "Not equal" },
                        CorrectAnswerIndexes = new() { 1 }
                    },
                    new Question
                    {
                        Id = 6,
                        Text = "Which of these are falsy values in JavaScript? (Select all that apply)",
                        Options = new() { "0", "null", "undefined", "NaN", "'false'" },
                        CorrectAnswerIndexes = new() { 0, 1, 2, 3 } // note: string 'false' is truthy
                    },
                    new Question
                    {
                        Id = 7,
                        Text = "How do you write a comment in JavaScript?",
                        Options = new() { "// This is a comment", "/* This is a comment */", "# This is a comment", "<!-- This is a comment -->" },
                        CorrectAnswerIndexes = new() { 0, 1 }
                    },
                    new Question
                    {
                        Id = 8,
                        Text = "What is the output of: console.log(typeof NaN);",
                        Options = new() { "'number'", "'NaN'", "'undefined'", "'object'" },
                        CorrectAnswerIndexes = new() { 0 }
                    },
                    new Question
                    {
                        Id = 9,
                        Text = "Which built-in method returns the length of the string?",
                        Options = new() { "length()", "size()", "length", "count()" },
                        CorrectAnswerIndexes = new() { 2 }
                    },
                    new Question
                    {
                        Id = 10,
                        Text = "What is the keyword to declare a variable with block scope?",
                        Options = new() { "var", "let", "const", "block" },
                        CorrectAnswerIndexes = new() { 1 }
                    }
                }
            }
        };
    }
}
