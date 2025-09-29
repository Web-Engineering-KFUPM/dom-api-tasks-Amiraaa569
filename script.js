/*
=======================================
TODO1: Welcome Board
---------------------------------------
When the page loads, display a welcome message
inside the <p> element with id="t1-msg".

✅ Task:
- Select the element with id "t1-msg".
- Change its text to "Hello, World!".

💡 Hint:
document.getElementById("t1-msg").innerHTML = "Hello, World!";
*/
(function () {
    if (window.__initDone) return;
    window.__initDone = true;

    function onReady(fn) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", fn, { once: true });
        } else {
            fn();
        }
    }

    onReady(function () {
        const t1Msg = document.getElementById("t1-msg");
        if (t1Msg) t1Msg.textContent = "Hello, World!";

        /*
        =======================================
        TODO2: Interaction Corner
        ---------------------------------------
        There is a button with id="t2-btn".
        When the button is clicked, change the text inside
        the <p> with id="t2-status" to:
            "You clicked the button!"

        ✅ Task:
        - Get the button element.
        - Add a click event listener.
        - Inside the event, change the text of the status paragraph.

        💡 Hint:
        button.addEventListener("click", function () {
            // change text here
        });
        */
        const btn = document.getElementById("t2-btn");
        const status = document.getElementById("t2-status");
        if (btn && status && !btn.__clicked) {
            btn.__clicked = true;
            btn.addEventListener("click", function () {
                status.textContent = "You clicked the button!";
            });
        }

        /*
        =======================================
        TODO3: Inspiring Quote Board
        ---------------------------------------
        Use the Quotable API to display a random quote.

        🌍 API Link:
        https://dummyjson.com/quotes/random

        ✅ Task:
        - When the button with id="t3-loadQuote" is clicked:
            - Fetch a random quote from the API.
            - Display the quote text inside the <p> with id="t3-quote".
            - Display the author inside the <p> with id="t3-author".

        💡 Hint:
        The API returns JSON like:
        {
          "content": "Do not watch the clock. Do what it does. Keep going.",
          "author": "Sam Levenson"
        }

        Use:
        data.content   // the quote text
        data.author    // the author
        */
        const qBtn = document.getElementById("t3-loadQuote");
        const qEl = document.getElementById("t3-quote");
        const aEl = document.getElementById("t3-author");

        if (qBtn && qEl && aEl && !qBtn.__quoteListener) {
            qBtn.__quoteListener = true;
            qBtn.addEventListener("click", async function () {
                qEl.textContent = "Loading...";
                aEl.textContent = "";
                try {
                    const res = await fetch("https://dummyjson.com/quotes/random", { cache: "no-store" });
                    const data = await res.json();
                    qEl.textContent = data.content ?? data.quote ?? "";
                    aEl.textContent = data.author ?? "";
                } catch (e) {
                    qEl.textContent = "Failed to load quote.";
                    aEl.textContent = "";
                }
            });
        }

        /*
        =======================================
        TODO4: Dammam Weather Now
        ---------------------------------------
        Use the OpenWeatherMap API to display live weather data.

        🌍 API Link:
        https://api.openweathermap.org/data/2.5/weather?q=Dammam&appid=API_KEY=metric

        ⚠️ Replace YOUR_API_KEY with your actual API key from:
        https://openweathermap.org/api

        ✅ Task:
        - When the button with id="t4-loadWx" is clicked:
        - Fetch current weather data for Dammam.
        - Show temperature in the element with id="t4-temp".
        - Show humidity in the element with id="t4-hum".
        - Show wind speed in the element with id="t4-wind".

        💡 Hint:
        data.main.temp      → temperature (°C)
        data.main.humidity  → humidity (%)
        data.wind.speed     → wind speed (m/s)
        */
        const wxBtn = document.getElementById("t4-loadWx");
        const wxTemp = document.getElementById("t4-temp");
        const wxHum = document.getElementById("t4-hum");
        const wxWind = document.getElementById("t4-wind");
        const wxErr = document.getElementById("t4-err");

        if (wxBtn && wxTemp && wxHum && wxWind && !wxBtn.__wxListener) {
            wxBtn.__wxListener = true;
            wxBtn.addEventListener("click", async function () {
                if (wxErr) wxErr.textContent = "";
                wxBtn.disabled = true;
                try {
                    const API_KEY = "d51f2f00c3b137ccfd135bd8f9dd50aa";
                    const res = await fetch(
                        `https://api.openweathermap.org/data/2.5/weather?q=Dammam&appid=d51f2f00c3b137ccfd135bd8f9dd50aa&units=metric`,
                        { cache: "no-store" }
                    );
                    if (!res.ok) throw new Error(String(res.status));
                    const data = await res.json();
                    wxTemp.textContent = Math.round(data.main.temp) + "°C";
                    wxHum.textContent = data.main.humidity + "%";
                    wxWind.textContent = data.wind.speed + " m/s";
                } catch (e) {
                    if (wxErr) wxErr.textContent = "Failed to load weather.";
                } finally {
                    wxBtn.disabled = false;
                }
            });
        }
    });
})();
