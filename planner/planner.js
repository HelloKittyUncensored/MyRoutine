// hover navigatie
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        gsap.to(link, { color: "#e63946", duration: 0.3 });
    });
    link.addEventListener('mouseleave', () => {
        gsap.to(link, { color: "#fff", duration: 0.3 });
    });
});


//database 
let db;

const request = indexedDB.open("FitnessPlannerDB", 1);

request.onupgradeneeded = function (event) {
    db = event.target.result;

    db.createObjectStore("workouts", {
        keyPath: "id",
        autoIncrement: true
    });
};

request.onsuccess = function (event) {
    db = event.target.result;
    loadWorkouts();
};

function saveWorkout() {
    window.event.preventDefault();
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const routine = document.getElementById("routine").value;


    let errors = 0;
    document.getElementById("date_error").textContent = "";
    document.getElementById("time_error").textContent = "";
    document.getElementById("routine_error").textContent = "";

    if(!date){
        document.getElementById("date_error").textContent = "Vul een datum in!";
        errors++;
    }
    if(!time){
        document.getElementById("time_error").textContent = "Vul een tijd in!";
        errors++;
    }   
    if(!routine){
        document.getElementById("routine_error").textContent = "Vul een routine in!";
        errors++;
    }
    
    if(!errors){
        const workout = {
            date: date,
            time: time,
            routine: routine,
            completed: false
        };

        const transaction = db.transaction(["workouts"], "readwrite");
        const store = transaction.objectStore("workouts");

        store.add(workout);
        transaction.oncomplete = function () {
            loadWorkouts();
        };
    }

}

function loadWorkouts() {
    const list = document.getElementById("plannerList");
    list.innerHTML = "";

    const transaction = db.transaction(["workouts"], "readonly");
    const store = transaction.objectStore("workouts");

    const request = store.openCursor();

    request.onsuccess = function (event) {
        const cursor = event.target.result;

        if (cursor) {
            const item = cursor.value;

            const li = document.createElement("li");

            li.innerHTML = `
                ${item.date} - ${item.time} - ${item.routine}
                <button onclick="completeWorkout(${item.id})">✅</button>
                <button onclick="deleteWorkout(${item.id})">❌</button>
            `;

            list.appendChild(li);

            cursor.continue();
        }
    };
}

function deleteWorkout(id) {
    const transaction = db.transaction(["workouts"], "readwrite");
    const store = transaction.objectStore("workouts");

    store.delete(id);

    transaction.oncomplete = function () {
        loadWorkouts();
    };
}

function completeWorkout(id) {
    const today = new Date();
    console.log(today);

    const transaction = db.transaction(["workouts"], "readwrite");
    const store = transaction.objectStore("workouts");

    const request = store.get(id);

    request.onsuccess = function () {
        const workout = request.result;
        const workoutDate = new Date(workout.date);

        if (workoutDate <= today) {
            store.delete(id);
            increaseCounter();
        } else {
            alert("Je kan deze training nog niet afvinken!");
        }
    };

    transaction.oncomplete = function () {
        loadWorkouts();
    };
}

function increaseCounter() {
    let count = localStorage.getItem("fitnessCounter");

    if (count === null) {
        count = 0;
    }

    count = parseInt(count);
    count++;

    localStorage.setItem("fitnessCounter", count);
    document.getElementById("counter").textContent = count;
}

function loadCounter() {
    let count = localStorage.getItem("fitnessCounter");

    if (count === null) {
        count = 0;
    }

    document.getElementById("counter").textContent = count;
}

window.onload = function () {
    loadCounter();
};
