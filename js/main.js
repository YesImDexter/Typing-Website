// A $( document ).ready() block.
$(document).ready(function () {

    //FOR ADDING  DATA TO THE TABLE
    // const leaderboardlist = document.querySelector(".sub-container table");
    // const table = document.getElementById("table")


    // function UpdateTable(Datahere) {
    //     let rowCount = table.rows.length;
    //     console.log("Row Count : " + rowCount);
    //     if (rowCount > 0) {
    //         for (let i = rowCount - 1; i > 0; i--) {
    //             table.deleteRow(i);
    //         }
    //     }

    //     Datahere.forEach(entry => {
    //         let printList = '<tr>' + '<td>' + entry.name + '</td>' + '<td>' + entry.wpm + '</td>' + '</tr>';
    //         leaderboardlist.innerHTML += printList;
    //     });
    //     console.log(Datahere);
    // }

    // var Arraydata = [
    //     { name: "Ali", wpm: "24" },
    //     { name: "Amirah", wpm: "30" },
    //     { name: "Nur", wpm: "25" }
    // ];

    // // Arraydata.push(...newData);
    // localStorage['localstore'] = JSON.stringify(Arraydata);
    // var Arraydata = JSON.parse(localStorage['localstore']);
    // UpdateTable(Arraydata);

    // Select elements from the HTML document
    const typingText = document.querySelector(".typing-text p");
    const intro = document.getElementById('intro');

    // ANIMATION FOR CLOSE AND OPEN CONTAINER  ( PROTOTYPE )

    // const nameModal = document.getElementById("name-modal");
    // const leaderboardModal = document.getElementById("leaderboard-modal")

    // nameModal.addEventListener("click", (e) => {
    //     e.preventDefault()
    //     // nameModal.classList.toggle("open");
    // });

    // leaderboardModal.addEventListener("click", (e) => {
    //     e.preventDefault()
    //     // leaderboardModal.classList.toggle("open");
    // });

    inputField = document.querySelector(".container .input-field");
    mistakeTag = document.querySelector(".mistakes span");
    timeTag = document.querySelector(".time span b");
    tryAgain = document.querySelector("button");

    wpmTag = document.querySelector(".wpm span");


    // Initialize variables
    let timer,
        maxTime = timeLeft = 60,
        arrayIndex = mistakes = isTyping = indexCounter = wpm = 0; // Declare arrayIndex outside of functions to make it accessible globally.

    // Function to generate a random sentence and display it with spans
    function randomSentence() {

        // Remove and re-adds the animation
        intro.style.opacity = 1;
        intro.style.animation = 'FadeInOut 3s ease-in-out infinite';

        // Generate a random number to select a sentence from an array
        let arrayIndex = Math.floor(Math.random() * words.length);
        typingText.innerHTML = "";
        // console.log("randomSentence() selected = " + arrayIndex);

        // Create spans for each character in the selected sentence
        words[arrayIndex].split("").forEach(span => {
            let spanTag = '<span>' + span + '</span>';
            typingText.innerHTML += spanTag;
        });

        // Make the first character active");

        // Focus on the input field when a key is pressed or when the text is clicked
        document.addEventListener("keydown", () => inputField.focus());
        typingText.addEventListener("click", () => inputField.focus());
    }

    // Function to initialize the typing game
    function initTyping() {

        // Remove the animation class to stop the looping
        intro.style.opacity = 0;
        intro.style.animation = 'none';

        const character = typingText.querySelectorAll("span");
        let typedCharacter = inputField.value.split("")[indexCounter];
        // console.log("typedCharacter = " + typedCharacter);
        // console.log("correctCharacter = " + character[indexCounter].innerText);
        // console.log("initTyping() = " + indexCounter);

        if (timeLeft > 0) {
            if (!isTyping) { // Start the timer if it hasn't already started
                timer = setInterval(initTimer, 1000);
                isTyping = true;
            }

            if (mistakes == 0 && indexCounter == (character.length - 1)) {
                // Game over: clear input, stop the timer
                inputField.value = "";
                clearInterval(timer);
                inputField.disabled = true;

                character[indexCounter].classList.add('correct');
                character[indexCounter].classList.remove('active');
                console.log("Game Finish");
            } else {
                if (typedCharacter == null) {
                    // If no character is typed (e.g., the user pressed backspace), handle it
                    indexCounter--;
                    if (character[indexCounter].classList.contains("incorrect")) {
                        mistakes--; // Decrement mistakes for incorrect characters
                    }
                    character[indexCounter].classList.remove("correct", "incorrect");
                } else {
                    // Handle typed characters (correct or incorrect)
                    if (character[indexCounter].innerText === typedCharacter) {
                        character[indexCounter].classList.add('correct');
                    } else {
                        mistakes++; // Increment the mistake count for incorrect characters
                        character[indexCounter].classList.add('incorrect');
                    }
                    indexCounter++;
                }
                // console.log(indexCounter);
                if (indexCounter < character.length) {
                    character.forEach(span => span.classList.remove("active"));
                    character[indexCounter].classList.add("active");
                }
            }

            // Calculate and display WPM and mistakes
            console.log("Counter : " + indexCounter);
            console.log("Max : " + indexCounter);
            console.log("Mistakes : " + mistakes);
            console.log("Time : " + timeLeft);
            wpm = Math.round((((indexCounter - mistakes) / 5) / (timeLeft / 60)));
            if (wpm < 0 || !wpm || wpm === Infinity) {
                wpm = 0;
            }
            console.log("WPM : " + wpm);
            wpmTag.innerText = wpm;
            mistakeTag.innerText = mistakes;

        } else {
            // Game over: clear input, stop the timer
            inputField.value = "";
            clearInterval(timer);
            inputField.disabled = true;
        }
    }

    // Function to initialize the timer
    function initTimer() {
        // Instead of counting up to a certain number, put timer to count down to zero
        if (timeLeft > 0) {
            timeLeft--;
            timeTag.innerText = timeLeft;
        } else {
            clearInterval(timer);
        }
    }

    // Function to reset the game
    function resetGame() {
        // Reset all variables and start a new game
        randomSentence();
        inputField.value = "";
        clearInterval(timer);
        timeLeft = maxTime;
        arrayIndex = mistakes = isTyping = indexCounter = 0;
        timeTag.innerText = timeLeft;
        mistakeTag.innerText = mistakes;
        wpmTag.innerText = 0;
        inputField.disabled = false;
    }

    // const namebutton = document.getElementById("name-button");

    // namebutton.addEventListener("click", (event) => {
    //     event.preventDefault();
    //     console.log("Button Pressed")
    //     if (wpm > 0) {
    //         var Arraydata = JSON.parse(localStorage['localstore']);

    //         let username = document.getElementById("username").value;
    //         var newData = [
    //             { name: username, wpm: wpm }
    //         ];

    //         console.log(newData);

    //         Arraydata.push(...newData);
    //         localStorage['localstore'] = JSON.stringify(Arraydata);
    //         var Arraydata = JSON.parse(localStorage['localstore']);
    //         UpdateTable(Arraydata);
    //     } else {
    //         alert("Please Play The Typing Test First Before Submitting Marks");
    //     }

    // });

    // Start the game by generating a random sentence
    randomSentence();

    // Add event listeners to the input field and "Try Again" button
    inputField.addEventListener("input", initTyping);
    tryAgain.addEventListener("click", resetGame);
});