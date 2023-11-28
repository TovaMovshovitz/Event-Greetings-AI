function updateQuestions() {
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

    // You can add more logic for additional questions based on the event type
}

function generateGreeting() {
    const selectedEvent = document.getElementById('event').value;
    const age = document.getElementById('age') ? document.getElementById('age').value : '';
    const relation = document.getElementById('relation') ? document.getElementById('relation').value : '';
    const degree = document.getElementById('degree') ? document.getElementById('degree').value : '';
    const type = 'short';  // You can implement logic for type selection
    const atmosphere = 'happy';  // You can implement logic for atmosphere selection

    // Display selected options
    const selectedOptionsDiv = document.getElementById('selectedOptions');
    selectedOptionsDiv.innerHTML = `<p>Event: ${selectedEvent}</p>`;
    if (age) selectedOptionsDiv.innerHTML += `<p>Age: ${age}</p>`;
    if (relation) selectedOptionsDiv.innerHTML += `<p>Relation: ${relation}</p>`;
    if (degree) selectedOptionsDiv.innerHTML += `<p>Degree: ${degree}</p>`;
    selectedOptionsDiv.innerHTML += `<p>Type: ${type}</p>`;
    selectedOptionsDiv.innerHTML += `<p>Atmosphere: ${atmosphere}</p>`;

    // Call the server to generate a greeting
    fetch('/generate-greeting', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ event: selectedEvent, age, relation, degree, type, atmosphere }),
    })
    .then(response => response.json())
    .then(data => {
        // Display the generated greeting
        const generatedGreetingDiv = document.getElementById('generatedGreeting');
        generatedGreetingDiv.innerHTML = `<p>${data.greeting}</p>`;
    });
}

function changeGreeting() {
    // Reset the generated greeting
    document.getElementById('generatedGreeting').innerHTML = '';
}
