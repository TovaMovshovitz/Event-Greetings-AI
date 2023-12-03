const typeInput = document.getElementById('type');
const atmosphereInput = document.getElementById('atmosphere');
const changeGreetingButton = document.getElementById('changeGreetingButton');
const selectedOptionsDiv = document.getElementById('selectedOptions');
const generatedGreetingDiv = document.getElementById('generatedGreeting');

const greetingsData = []; // Array to store the retrieved greetings
let currentGreetingIndex = 0; // Index to keep track of the currently displayed greeting

[typeInput, atmosphereInput].forEach(input => {
    input.addEventListener('input', () => {
        changeGreetingButton.style.display = 'none'
        generatedGreetingDiv.style.display = 'none';
        selectedOptionsDiv.innerHTML = '';
        generatedGreetingDiv.innerHTML = '';
    });
});

async function updateAdditionalQuestion() {
    changeGreetingButton.style.display = 'none'
    generatedGreetingDiv.style.display = 'none';
    selectedOptionsDiv.innerHTML = '';
    generatedGreetingDiv.innerHTML = '';

    const selectedEvent = document.getElementById('event').value;
    const additionalQuestionsDiv = document.getElementById('additionalQuestions');

    // Clear previous questions
    additionalQuestionsDiv.innerHTML = '';

    // Add additional questions based on the selected event
    if (selectedEvent === 'birthday') {
        additionalQuestionsDiv.innerHTML += '<label for="age">Enter age:</label>';
        additionalQuestionsDiv.innerHTML += '<input type="number" id="age" class="additionalQuestionsInput" placeholder="age">';
    } else if (selectedEvent === 'wedding') {
        additionalQuestionsDiv.innerHTML += '<label for="relation">Your relation to the couple:</label>';
        additionalQuestionsDiv.innerHTML += '<input type="text" id="relation" class="additionalQuestionsInput" placeholder="relation">';
    } else if (selectedEvent === 'graduation') {
        additionalQuestionsDiv.innerHTML += '<label for="degree">Enter degree:</label>';
        additionalQuestionsDiv.innerHTML += '<input type="text" id="degree" class="additionalQuestionsInput" placeholder="degree">';
    }
    const additionalQuestionsInput = document.getElementsByClassName("additionalQuestionsInput")[0]
    additionalQuestionsInput.addEventListener('input', () => {
        changeGreetingButton.style.display = 'none';
        generatedGreetingDiv.style.display = 'none';
        selectedOptionsDiv.innerHTML = '';
        generatedGreetingDiv.innerHTML = '';
    });
}

async function generateGreeting() {
    const selectedEvent = document.getElementById('event').value;
    const age = document.getElementById('age') ? document.getElementById('age').value : '';
    const relation = document.getElementById('relation') ? document.getElementById('relation').value : '';
    const degree = document.getElementById('degree') ? document.getElementById('degree').value : '';
    const type = typeInput.value;
    const atmosphere = atmosphereInput.value;

    // Display selected options
    selectedOptionsDiv.innerHTML = `<p><b>Event:</b> ${selectedEvent}</p>`;
    if (age) selectedOptionsDiv.innerHTML += `<p><b>Age:</b> ${age}</p>`;
    if (relation) selectedOptionsDiv.innerHTML += `<p><b>Relation:</b> ${relation}</p>`;
    if (degree) selectedOptionsDiv.innerHTML += `<p><b>Degree:</b> ${degree}</p>`;
    if (type) selectedOptionsDiv.innerHTML += `<p><b>Type:</b> ${type}</p>`;
    if (atmosphere) selectedOptionsDiv.innerHTML += `<p><b>Atmosphere:</b> ${atmosphere}</p>`;

    try {
        // Call the server to generate a greeting
        const response = await fetch('http://localhost:3000/generate-greeting', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ event: selectedEvent, age, relation, degree, type, atmosphere }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        greetingsData.length = 0; // Clear the existing greetings
        currentGreetingIndex = 0;
        greetingsData.push(...Object.values(data.greetings));

        // Display the first greeting
        displayCurrentGreeting();

        changeGreetingButton.style.display = 'inline-block'

    } catch (error) {
        console.error('Error:', error);
        // Handle error gracefully, e.g., display an error message to the user
    }
}

function displayCurrentGreeting() {
    // Check if there are greetings to display
    if (greetingsData.length > 0) {
        generatedGreetingDiv.innerText = `${greetingsData[currentGreetingIndex]}`;
        generatedGreetingDiv.style.display = 'inline-block'
    } else {
        generatedGreetingDiv.innerHTML = '<p>No greetings available.</p>';
    }
}

function changeGreeting() {
    // If all greetings have been viewed, make a new request else Move to the next greeting
    if (currentGreetingIndex === greetingsData.length - 1) {
        generateGreeting();
    } else {
        currentGreetingIndex = (currentGreetingIndex + 1) % greetingsData.length;
        displayCurrentGreeting();
    }
}

// Initial call to load the general questions
updateAdditionalQuestion();
