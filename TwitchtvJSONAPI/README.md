## Twitchtv JSON API
    
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