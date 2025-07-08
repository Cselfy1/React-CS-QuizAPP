using Microsoft.AspNetCore.Mvc;
using QuizApp.Models;

namespace QuizApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuizController : ControllerBase
    {
        
        [HttpGet("category/{categoryName}")]
        public IActionResult GetQuizByCategory(string categoryName)
        {
            var quiz = QuizRepository.AllQuizzes.FirstOrDefault(q => q.Category.Equals(categoryName, StringComparison.OrdinalIgnoreCase));
            if (quiz == null)
                return NotFound("Quiz category not found");

            return Ok(quiz);
        }

      
        [HttpPost("submit")]
        public IActionResult SubmitAnswers([FromBody] List<UserAnswerDto> userAnswers)
        {
            if (userAnswers == null || userAnswers.Count == 0)
                return BadRequest("No answers provided");

      
            var quiz = QuizRepository.AllQuizzes.FirstOrDefault(q => q.Category == "JavaScript");
            if (quiz == null)
                return NotFound("Quiz not found");

            int correctCount = 0;
            List<int> wrongQuestionIds = new();

            foreach (var question in quiz.Questions)
            {
                var userAnswer = userAnswers.FirstOrDefault(a => a.QuestionId == question.Id);
                if (userAnswer == null)
                {
                    wrongQuestionIds.Add(question.Id);
                    continue;
                }

          
                bool isCorrect = userAnswer.SelectedIndexes.Count == question.CorrectAnswerIndexes.Count
                                 && !userAnswer.SelectedIndexes.Except(question.CorrectAnswerIndexes).Any();

                if (isCorrect)
                    correctCount++;
                else
                    wrongQuestionIds.Add(question.Id);
            }

            var result = new QuizResultDto
            {
                TotalQuestions = quiz.Questions.Count,
                CorrectAnswers = correctCount,
                WrongQuestionIds = wrongQuestionIds
            };

            return Ok(result);
        }
    }
}
