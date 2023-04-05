const request = require("request");
const TelegramBot = require("node-telegram-bot-api");
const token = "5489355555:AAEsCvhlI9mt5ZZ_4n787L46qAhTs76glaU";
const bot = new TelegramBot(token, { polling: true });
var bye = "bye";
var Hi = "hi";

bot.on("message", function (mg) {
  if (mg.text == "/start") {
    //image is printed if given text is /start
    bot.sendPhoto(mg.chat.id, "https://images.app.goo.gl/HCXt9W82ckitZLgD9");
  } else if (mg.text.toString().toLowerCase().includes(bye)) {
    bot.sendPhoto(mg.chat.id, "https://images.app.goo.gl/cX6JVS4ZEnVY18w57"); //an image is printed if given text includes word "bye"
  } else if (mg.text.toString().toLowerCase().indexOf(Hi) === 0) {
    bot.sendPhoto(mg.chat.id, "https://images.app.goo.gl/vFad9pPBaCdBaZef6"); // an image is printed if given text includes word "hi"
  } else {
    request(
      "http://api.weatherapi.com/v1/forecast.json?key=16d8aad4a4ef47a389e53010221308&q=" +
        mg.text +
        "&aqi=no",
      function (err, responce, body) {
        console.log(JSON.parse(body));
        if ("error" in JSON.parse(body)) {
          if (JSON.parse(body).error.code.toString().length > 0) {
            bot.sendMessage(mg.chat.id, "Location not found");
          }
        } else {
          let data = JSON.parse(body);
          loc_name = data.location.name;
          loc_country = data.location.country;
          loc_temp = data.current.temp_f;
          loc_reg = data.location.region;
          loc_con = data.current.condition.text;
          loc_hum = data.current.humidity;
          loc_dir = data.current.wind_dir;
          speed = data.current.wind_mph;
          bot.sendMessage(mg.chat.id, "region : " + loc_reg);
          bot.sendMessage(mg.chat.id, "country : " + loc_country);
          bot.sendMessage(mg.chat.id, "current temperature in f : " + loc_temp);
          bot.sendMessage(mg.chat.id, "present condition : " + loc_con);
          bot.sendMessage(mg.chat.id, "Humidity : " + loc_hum);
          bot.sendMessage(mg.chat.id, "wind direction : " + loc_dir);
          bot.sendMessage(mg.chat.id, "wind speed in mph : " + speed);
        }
      }
    );
  }
});
