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
        selectedOptionsDiv.innerHTML = '';
        generatedGreetingDiv.innerHTML = '';
    });
});

async function updateAdditionalQuestion() {
    changeGreetingButton.style.display = 'none'
    selectedOptionsDiv.innerHTML = '';
    generatedGreetingDiv.innerHTML = '';

    const selectedEvent = document.getElementById('event').value;
    const additionalQuestionsDiv = document.getElementById('additionalQuestions');

    // Clear previous questions
    additionalQuestionsDiv.innerHTML = '';

    // Add additional questions based on the selected event
    if (selectedEvent === 'birthday') {
        additionalQuestionsDiv.innerHTML += '<label for="age">Enter age:</label>';
        additionalQuestionsDiv.innerHTML += '<input type="number" id="age" class="additionalQuestionsInput">';
    } else if (selectedEvent === 'wedding') {
        additionalQuestionsDiv.innerHTML += '<label for="relation">Your relation to the couple:</label>';
        additionalQuestionsDiv.innerHTML += '<input type="text" id="relation" class="additionalQuestionsInput">';
    } else if (selectedEvent === 'graduation') {
        additionalQuestionsDiv.innerHTML += '<label for="degree">Enter degree:</label>';
        additionalQuestionsDiv.innerHTML += '<input type="text" id="degree" class="additionalQuestionsInput">';
    }
    const additionalQuestionsInput = document.getElementsByClassName("additionalQuestionsInput")[0]
    additionalQuestionsInput.addEventListener('input', () => {
        changeGreetingButton.style.display = 'none';
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
    selectedOptionsDiv.innerHTML = `<p>Event: ${selectedEvent}</p>`;
    if (age) selectedOptionsDiv.innerHTML += `<p>Age: ${age}</p>`;
    if (relation) selectedOptionsDiv.innerHTML += `<p>Relation: ${relation}</p>`;
    if (degree) selectedOptionsDiv.innerHTML += `<p>Degree: ${degree}</p>`;
    if (type) selectedOptionsDiv.innerHTML += `<p>Type: ${type}</p>`;
    if (atmosphere) selectedOptionsDiv.innerHTML += `<p>Atmosphere: ${atmosphere}</p>`;

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
        generatedGreetingDiv.innerHTML = `<p>${greetingsData[currentGreetingIndex]}</p>`;
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
