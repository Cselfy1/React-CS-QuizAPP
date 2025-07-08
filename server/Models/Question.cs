namespace QuizApp.Models
{
    public class Question
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public List<string> Options { get; set; } = new();
        public List<int> CorrectAnswerIndexes { get; set; } = new(); // Indexes of correct options
    }
}
