namespace QuizApp.Models { 
    public class Quiz
    {
        public string Category { get; set; } = string.Empty;
        public List<Question> Questions { get; set; } = new();
    }
}