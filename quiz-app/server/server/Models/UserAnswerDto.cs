namespace QuizApp.Models
{ 
    public class UserAnswerDto
    {
        public int QuestionId { get; set; }
        public List<int> SelectedIndexes { get; set; } = new();
    }
}