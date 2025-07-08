using Microsoft.AspNetCore.Mvc;
using QuizApp.Models;
using System.Linq;
using System.Collections.Generic;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private static List<User> users = new();

    [HttpPost("register")]
    public IActionResult Register([FromBody] User newUser)
    {
        if (users.Any(u => u.Login == newUser.Login))
            return BadRequest(new { message = "Login already exists." });

        users.Add(newUser);

        return Ok(new { token = "dummy-register-token" });
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] User loginUser)
    {
        var user = users.FirstOrDefault(u => u.Login == loginUser.Login && u.Password == loginUser.Password);
        if (user == null)
            return Unauthorized(new { message = "Invalid credentials." });

        return Ok(new { token = "dummy-login-token" });
    }
}
