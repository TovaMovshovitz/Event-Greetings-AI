// Move the general questions outside the updateQuestions function
const typeInput = document.getElementById('type');
const atmosphereInput = document.getElementById('atmosphere');

async function updateQuestions() {
    const selectedEvent = document.getElementById('event').value;
    const additionalQuestionsDiv = document.getElementById('additionalQuestions');

    // Clear previous questions
    additionalQuestionsDiv.innerHTML = '';

    // Add additional questions based on the selected event
    if (selectedEvent === 'birthday') {
        additionalQuestionsDiv.innerHTML += '<label for="age">Enter age:</label>';
        additionalQuestionsDiv.innerHTML += '<input type="number" id="age">';
    } else if (selectedEvent === 'wedding') {
        additionalQuestionsDiv.innerHTML += '<label for="relation">Your relation to the couple:</label>';
        additionalQuestionsDiv.innerHTML += '<input type="text" id="relation">';
    } else if (selectedEvent === 'graduation') {
        additionalQuestionsDiv.innerHTML += '<label for="degree">Enter degree:</label>';
        additionalQuestionsDiv.innerHTML += '<input type="text" id="degree">';
    }
    // Add more conditions for other events
}

async function generateGreeting() {
    const selectedEvent = document.getElementById('event').value;
    const age = document.getElementById('age') ? document.getElementById('age').value : '';
    const relation = document.getElementById('relation') ? document.getElementById('relation').value : '';
    const degree = document.getElementById('degree') ? document.getElementById('degree').value : '';
    const type = typeInput.value;
    const atmosphere = atmosphereInput.value;

    // Display selected options
    const selectedOptionsDiv = document.getElementById('selectedOptions');
    selectedOptionsDiv.innerHTML = `<p>Event: ${selectedEvent}</p>`;
    if (age) selectedOptionsDiv.innerHTML += `<p>Age: ${age}</p>`;
    if (relation) selectedOptionsDiv.innerHTML += `<p>Relation: ${relation}</p>`;
    if (degree) selectedOptionsDiv.innerHTML += `<p>Degree: ${degree}</p>`;
    if (type) selectedOptionsDiv.innerHTML += `<p>Type: ${type}</p>`;
    if (atmosphere) selectedOptionsDiv.innerHTML += `<p>Atmosphere: ${atmosphere}</p>`;

    try {
        // Call the server to generate a greeting
        const response = await fetch('/generate-greeting', {
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

        // Display the generated greeting
        const generatedGreetingDiv = document.getElementById('generatedGreeting');
        generatedGreetingDiv.innerHTML = `<p>${data.greeting}</p>`;
    } catch (error) {
        console.error('Error:', error);
        // Handle error gracefully, e.g., display an error message to the user
    }
}

function changeGreeting() {
    // Reset the generated greeting
    document.getElementById('generatedGreeting').innerHTML = '';
}

// Initial call to load the general questions
updateQuestions();
