

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Ajay's Bio</title>
<style>
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f3f3f3;
  }
  .container {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  h1 {
    color: #333;
    text-align: center;
  }
  p {
    color: #555;
    margin-bottom: 20px;
  }
  span.emoji {
    font-size: 1.2em;
    margin-left: 5px;
  }
  span.emoji::before {
    content: attr(data-emoji);
  }
</style>
</head>
<body>

<div class="container">
  <h1>Ajay's Bio</h1>
  <p>Hi there! <span class="emoji" data-emoji="👋"></span> I'm Ajay, an aspiring front-end web developer driven by my passion for creating captivating and intuitive user experiences.
    Currently, I'm immersing myself in the intricacies and expertise of JavaScript, HTML, and CSS. <span class="emoji" data-emoji="🌱"></span></p>
  <p>Outside of coding, I'm a car and gadget enthusiast. <span class="emoji" data-emoji="🚗💻"></span> Whether it's discussing the latest automotive innovations or geeking out over the newest tech gadgets, I'm always up for a chat.
    Feel free to ask me anything about cars and gadgets—I love sharing my knowledge and exploring new advancements in these fields. <span class="emoji" data-emoji="💬"></span></p>
  <p>One thing to know about me: I'm friendly and approachable. Don't hesitate to reach out—I'm always eager to connect, share ideas, and help fellow developers! <span class="emoji" data-emoji="💫"></span></p>
  <p>Let's connect and create something amazing together! <span class="emoji" data-emoji="⚡"></span></p>
</div>

</body>
</html>
