namespace QuizApp.Models { 
    public class QuizResultDto
    {
        public int TotalQuestions { get; set; }
        public int CorrectAnswers { get; set; }
        public List<int> WrongQuestionIds { get; set; } = new();
    }
}