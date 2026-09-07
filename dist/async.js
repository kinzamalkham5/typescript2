"use strict";
// Promise = future mein kisi kaam ka result milega.
// const myPromise = new Promise((resolve, reject) => {
//     const success = true;
//     if (success) {
//         resolve("Kaam successful!");
//     } else {
//         reject("Kuch ghalat ho gaya!");
//     }
// });
// Yahan:
// resolve() → Promise fulfilled
// reject() → Promise rejected
// jab tak dono mein se kuch nahi hota → pending
// --------------
// 2. Promise ko use kaise karte hain?
// Promise ke saath commonly:
// .then() → success
// .catch() → error
// .finally() → dono cases mein
// myPromise
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((error) => {
//         console.log(error);
//     })
//     .finally(() => {
//         console.log("Done");
//     });
// 3. Ab Async/Await
// Ab promises ko handle karne ka cleaner tareeqa:
// async/await
// Promise chain:
// fetchUser()
//     .then((user) => {
//         return fetchPosts(user.id);
//     })
//     .then((posts) => {
//         console.log(posts);
//     })
//     .catch((error) => {
//         console.log(error);
//     });
const asyncOutput = document.getElementById("output");
const asyncStatus = document.getElementById("status");
const chainBtn = document.getElementById("chainBtn");
const allBtn = document.getElementById("allBtn");
const settledBtn = document.getElementById("settledBtn");
const raceBtn = document.getElementById("raceBtn");
const asyncBtn = document.getElementById("asyncBtn");
function showResult(message) {
    asyncOutput.textContent = message;
}
function setStatus(message) {
    asyncStatus.textContent = message;
}
function createPromise(name, delay, shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(`${name} failed`);
            }
            else {
                resolve(`${name} completed successfully`);
            }
        }, delay);
    });
}
chainBtn.addEventListener("click", () => {
    setStatus("Running...");
    showResult("Starting Promise Chain...\n");
    createPromise("Step 1", 1000)
        .then((result) => {
        showResult(result + "\n");
        return createPromise("Step 2", 1000);
    })
        .then((result) => {
        showResult(output.textContent + result + "\n");
        return createPromise("Step 3", 1000);
    })
        .then((result) => {
        showResult(output.textContent + result);
        setStatus("Completed");
    })
        .catch((error) => {
        showResult(`Error: ${String(error)}`);
        setStatus("Failed");
    });
});
allBtn.addEventListener("click", async () => {
    setStatus("Running...");
    showResult("Running Promise.all()...\n");
    const users = createPromise("Users API", 2000);
    const products = createPromise("Products API", 1000);
    const orders = createPromise("Orders API", 1500);
    try {
        const results = await Promise.all([
            users,
            products,
            orders
        ]);
        showResult("Promise.all() Results:\n\n" +
            results.join("\n"));
        setStatus("All Completed");
    }
    catch (error) {
        showResult(`Error: ${String(error)}`);
        setStatus("Failed");
    }
});
settledBtn.addEventListener("click", async () => {
    setStatus("Running...");
    showResult("Running Promise.allSettled()...\n");
    const users = createPromise("Users API", 1000);
    const products = createPromise("Products API", 1500, true);
    const orders = createPromise("Orders API", 500);
    const results = await Promise.allSettled([
        users,
        products,
        orders
    ]);
    let resultText = "Promise.allSettled() Results:\n\n";
    results.forEach((result) => {
        if (result.status === "fulfilled") {
            resultText += `Success: ${result.value}\n`;
        }
        else {
            resultText += `Failed: ${result.reason}\n`;
        }
    });
    showResult(resultText);
    setStatus("All Settled");
});
raceBtn.addEventListener("click", async () => {
    setStatus("Racing...");
    showResult("Starting Promise.race()...\n");
    const server1 = createPromise("Server 1", 3000);
    const server2 = createPromise("Server 2", 1000);
    const server3 = createPromise("Server 3", 2000);
    try {
        const winner = await Promise.race([
            server1,
            server2,
            server3
        ]);
        showResult("Promise.race() Winner:\n\n" +
            winner);
        setStatus("Race Finished");
    }
    catch (error) {
        showResult(`Error: ${String(error)}`);
        setStatus("Race Failed");
    }
});
asyncBtn.addEventListener("click", async () => {
    setStatus("Loading...");
    showResult("Starting Async/Await...\n");
    try {
        const user = await createPromise("User", 1000);
        showResult(user + "\n");
        const posts = await createPromise("Posts", 1000);
        showResult(output.textContent + posts + "\n");
        const comments = await createPromise("Comments", 1000);
        showResult(output.textContent + comments);
        setStatus("Completed");
    }
    catch (error) {
        showResult(`Error: ${String(error)}`);
        setStatus("Failed");
    }
});
