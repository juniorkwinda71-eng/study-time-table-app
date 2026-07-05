const enterBtn = document.getElementById("enterBtn");
const diary = document.getElementById("diary");
const transition = document.getElementById("transition");

enterBtn.addEventListener("click", () => {

    // Step 1: Lock interaction
    enterBtn.disabled = true;

    // Step 2: Add dramatic diary opening effect
    diary.style.transform = "rotateY(-40deg) scale(0.95)";
    diary.style.transition = "0.8s ease";

    setTimeout(() => {

        diary.style.opacity = "0";

    }, 700);

    // Step 3: Show page transition overlay
    setTimeout(() => {

        transition.style.opacity = "1";
        transition.style.visibility = "visible";

    }, 900);

    // Step 4: Animate pages flipping
    const pages = document.querySelectorAll(".page");

    pages.forEach((page, index) => {

        setTimeout(() => {

            page.style.transform = "rotateY(0deg)";
            page.style.transition = "0.8s ease";

        }, 1200 + index * 250);

    });

    // Step 5: Redirect to diary dashboard
    setTimeout(() => {

        window.location.href = "diary.html";

    }, 2500);

});