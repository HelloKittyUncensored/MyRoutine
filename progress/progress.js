// hover navigatie
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        gsap.to(link, { color: "#e63946", duration: 0.3 });
    });
    link.addEventListener('mouseleave', () => {
        gsap.to(link, { color: "#fff", duration: 0.3 });
    });
});

// databank
let db;
const request = indexedDB.open("FitnessDB", 1);

request.onupgradeneeded = function (event) {
    db = event.target.result;

    db.createObjectStore("prs", { keyPath: "id" });
    db.createObjectStore("stats", { keyPath: "id" });
};

function savePRs() {
    window.event.preventDefault();
    const newPRs = {
        id: "oef",
        squat: Number(document.getElementById("squat").value),
        bench: Number(document.getElementById("bench").value),
        deadlift: Number(document.getElementById("deadlift").value)
    };

    const transaction = db.transaction(["prs"], "readwrite");
    const store = transaction.objectStore("prs");
    const getRequest = store.get("oef");

    getRequest.onsuccess = function () {

        const oldPRs = getRequest.result;
        let message = "Opgeslagen!";
        let improvement = false;

        if (oldPRs) {
            if (newPRs.bench > oldPRs.bench) {
                message = `Bench +${newPRs.bench - oldPRs.bench}kg`;
                improvement = true;
            }
            if (newPRs.squat > oldPRs.squat) {
                message = `Squat +${newPRs.squat - oldPRs.squat}kg`;
                improvement = true;
            }
            if (newPRs.deadlift > oldPRs.deadlift) {
                message = `Deadlift +${newPRs.deadlift - oldPRs.deadlift}kg`;
                improvement = true;
            }
        }

        document.getElementById("lastPR").textContent = message;

        if (improvement) {
            gsap.from("#lastPR", {
                scale: 1.2,
                duration: 0.3,
                yoyo: true,
                repeat: 1
            });
        }
        store.put(newPRs);
    };
}

function saveStats() {
    const stats = {
        id: "main",
        weight: Number(document.getElementById("weight").value),
        height: Number(document.getElementById("height").value)
    };

    const transaction = db.transaction(["stats"], "readwrite");
    const store = transaction.objectStore("stats");

    store.put(stats);
}

function loadProgress() {
    const transaction = db.transaction(["prs", "stats"], "readonly");
    const prStore = transaction.objectStore("prs");
    const statsStore = transaction.objectStore("stats");

    prStore.get("main").onsuccess = function (e) {
        const data = e.target.result;
        if (data) {
            document.getElementById("squat").value = data.squat;
            document.getElementById("bench").value = data.bench;
            document.getElementById("deadlift").value = data.deadlift;
        }
    };

    statsStore.get("main").onsuccess = function (e) {
        const data = e.target.result;
        if (data) {
            document.getElementById("weight").value = data.weight;
            document.getElementById("height").value = data.height;
        }
    };
}

request.onsuccess = function (event) {
    db = event.target.result;
    loadProgress();
};


gsap.from("#lastPR", {scale: 1.2,duration: 0.3,yoyo: true,repeat: 1});

gsap.to("button", {scale: 0.95,duration: 0.1,yoyo: true,repeat: 1});

