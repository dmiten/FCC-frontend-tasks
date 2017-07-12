## 1. Wikipedia Viewer

**_Objective:_** Build a CodePen.io app that is functionally similar to [this](https://codepen.io/FreeCodeCamp/full/wGqEga/).<br>
Fulfill the below user stories. Use whichever libraries or APIs you need. Give it your own personal style.<br>
<br>
**User Story:**
- I can search Wikipedia entries in a search box and see the resulting Wikipedia entries.
- I can click a button to see a random Wikipedia entry.
  
**_Hints:_**
- Here's a URL you can use to get a random Wikipedia article: https://en.wikipedia.org/wiki/Special:Random
- Here's an entry on [using Wikipedia's API](https://www.mediawiki.org/wiki/API:Main_page).
- Use this link to experiment with Wikipedia's API.
      
<i>WikipediaViewer/npm i && npm start</i><br> 
<i>https://codepen.io/dmiten/full/awbqjz</i>
  
## 2. Twitchtv JSON API
    
**_Objective:_** Build a CodePen.io app that is functionally similar to [this](https://codepen.io/FreeCodeCamp/full/Myvqmo).
  
Fulfill the below user stories. Use whichever libraries or APIs you need. Give it your own personal style.
  
**_User Story:_**
- I can see whether Free Code Camp is currently streaming on Twitch.tv.<br>
- I can click the status output and be sent directly to the Free Code Camp's Twitch.tv channel.<br>
- If a Twitch user is currently streaming, I can see additional details about what they are streaming.<br>
- I will see a placeholder notification if a streamer has closed their Twitch account (or the account never existed). You can verify this works by adding brunofin and comster404 to your array of Twitch streamers.<br>
  
**_Hints:_**
- See an example call to Twitch.tv's [JSONP API](http://forum.freecodecamp.com/t/use-the-twitchtv-json-api/19541).
- The relevant documentation about this API call is [here](https://dev.twitch.tv/docs/v5/reference/streams/#get-stream-by-user).
- Here's an array of the Twitch.tv usernames of people who regularly stream: ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]
  
_**UPDATE:**_
Due to a change in conditions on API usage explained here Twitch.tv now requires an API key, but we've built a workaround. Use https://wind-bow.gomix.me/twitch-api instead of twitch's API base URL (i.e. https://api.twitch.tv/kraken) and you'll still be able to get account information, without needing to sign up for an API key.
    
<i>TwitchtvJSONAPI/npm i && npm start</i><br>
<i>https://codepen.io/dmiten/full/dRPaxX</i>
  
## 3. Build a JavaScript Calculator
  
**_Objective:_** Build a CodePen.io app that is functionally similar to [this](https://codepen.io/FreeCodeCamp/full/rLJZrA).

Fulfill the below user stories. Use whichever libraries or APIs you need. Give it your own personal style.

**_User Story:_**
- I can add, subtract, multiply and divide two numbers.
- I can clear the input field with a clear button.
- I can keep chaining mathematical operations together until I hit the equal button, and the calculator will tell me the correct output.<br>

<i>JavaScriptCalculator/npm i && npm start</i><br>
<i>https://codepen.io/dmiten/full/qjZqEX</i>

## 4. Build a Pomodoro Clock

**_Objective:_** Build a CodePen.io app that is functionally similar to [this](https://codepen.io/FreeCodeCamp/full/aNyxXR/).

Fulfill the below user stories. Use whichever libraries or APIs you need. Give it your own personal style.

User Story:
- I can start a 25 minute pomodoro, and the timer will go off once 25 minutes has elapsed.
- I can reset the clock for my next pomodoro.
- I can customize the length of each pomodoro.

<i>PomodoroClock/npm i && npm start</i><br>
<i>https://codepen.io/dmiten/full/vZyBRW</i>

## 5. Build a Tic Tac Toe Game
 
**_Objective:_** Build a CodePen.io app that is functionally similar to [this](https://codepen.io/FreeCodeCamp/full/KzXQgy).
 
Fulfill the below user stories. Use whichever libraries or APIs you need. Give it your own personal style.
 
User Story:
- I can play a game of Tic Tac Toe with the computer.
- My game will reset as soon as it's over so I can play again.
- I can choose whether I want to play as X or O.
  
<i>TicTacToeGame/npm i && npm start</i><br>
<i>https://codepen.io/dmiten/full/rwmdBR</i>
 
## 6. Build a Simon Game
 
**_Objective:_** Build a CodePen.io app that is functionally similar to [this](https://codepen.io/FreeCodeCamp/full/obYBjE).
 
Fulfill the below user stories. Use whichever libraries or APIs you need. Give it your own personal style.
 
**_User Story:_**
- I am presented with a random series of button presses.
- Each time I input a series of button presses correctly, I see the same series of button presses but with an additional step.
- I hear a sound that corresponds to each button both when the series of button presses plays, and when I personally press a button.
- If I press the wrong button, I am notified that I have done so, and that series of button presses starts again to remind me of the pattern so I can try again.
- I can see how many steps are in the current series of button presses.
- If I want to restart, I can hit a button to do so, and the game will return to a single step.
- I can play in strict mode where if I get a button press wrong, it notifies me that I have done so, and the game restarts at a new random series of button presses.
- I can win the game by getting a series of 20 steps correct. I am notified of my victory, then the game starts over.
 
**_Hint:_** Here are mp3s you can use for each button:

https://s3.amazonaws.com/freecodecamp/simonSound1.mp3<br>
https://s3.amazonaws.com/freecodecamp/simonSound2.mp3<br>
https://s3.amazonaws.com/freecodecamp/simonSound3.mp3<br>
https://s3.amazonaws.com/freecodecamp/simonSound4.mp3<br>
 
<i>SimonGame/npm i && npm start</i><br>
<i>https://codepen.io/dmiten/full/QgqjaO</i>