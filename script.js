/* =========================
   SCREEN NAVIGATION
========================= */

const screens = document.querySelectorAll(".screen");


function showScreen(screenId) {

    const currentScreen =
        document.querySelector(".active-screen");

    const nextScreen =
        document.getElementById(screenId);


    // Make sure the screen exists
    if (!nextScreen) {
        console.log("Screen not found:", screenId);
        return;
    }


    // Don't do anything if we're already there
    if (currentScreen === nextScreen) {
        return;
    }


    // Hide current screen
    if (currentScreen) {
        currentScreen.classList.remove("active-screen");
    }


    // Show next screen
    nextScreen.classList.add("active-screen");


    // Start the new screen from the top
    nextScreen.scrollTop = 0;
}


/* =========================
   WELCOME BUTTON
========================= */

const startBtn =
    document.getElementById("startBtn");


if (startBtn) {

    startBtn.addEventListener("click", function () {

        showScreen("opening");

    });

}


/* =========================
   NEXT BUTTONS
========================= */

const nextButtons =
    document.querySelectorAll("[data-next]");


nextButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const nextScreen =
            button.getAttribute("data-next");


        showScreen(nextScreen);

    });

});


/* =========================
   FLOWER CAROUSEL
========================= */

const flowerSlides =
    document.querySelectorAll(".carousel-slide");

const prevFlowerBtn =
    document.getElementById("prevBtn");

const nextFlowerBtn =
    document.getElementById("nextBtn");

const carouselDots =
    document.getElementById("carouselDots");


let flowerIndex = 0;


/* =========================
   CREATE FLOWER DOTS
========================= */

if (
    flowerSlides.length > 0 &&
    carouselDots
) {

    flowerSlides.forEach(function (slide, index) {

        const dot =
            document.createElement("span");

        dot.classList.add("carousel-dot");


        if (index === 0) {
            dot.classList.add("active");
        }


        dot.addEventListener("click", function () {

            flowerIndex = index;

            updateFlowerCarousel();

        });


        carouselDots.appendChild(dot);

    });

}


const flowerDots =
    document.querySelectorAll(".carousel-dot");


/* =========================
   UPDATE FLOWER CAROUSEL
========================= */

function updateFlowerCarousel() {

    flowerSlides.forEach(function (slide) {

        slide.classList.remove("active");

    });


    flowerDots.forEach(function (dot) {

        dot.classList.remove("active");

    });


    if (flowerSlides[flowerIndex]) {

        flowerSlides[flowerIndex]
            .classList.add("active");

    }


    if (flowerDots[flowerIndex]) {

        flowerDots[flowerIndex]
            .classList.add("active");

    }

}


/* =========================
   PREVIOUS FLOWER
========================= */

if (prevFlowerBtn) {

    prevFlowerBtn.addEventListener(
        "click",
        function () {

            flowerIndex--;


            if (flowerIndex < 0) {

                flowerIndex =
                    flowerSlides.length - 1;

            }


            updateFlowerCarousel();

        }
    );

}


/* =========================
   NEXT FLOWER
========================= */

if (nextFlowerBtn) {

    nextFlowerBtn.addEventListener(
        "click",
        function () {

            flowerIndex++;


            if (
                flowerIndex >=
                flowerSlides.length
            ) {

                flowerIndex = 0;

            }


            updateFlowerCarousel();

        }
    );

}


/* =========================
   CODING CAROUSEL
========================= */

const codingCards =
    document.querySelectorAll(".coding-card");

const codingPrev =
    document.getElementById("codingPrev");

const codingNext =
    document.getElementById("codingNext");


let codingIndex = 0;


/* =========================
   UPDATE CODING CAROUSEL
========================= */

function updateCodingCarousel() {

    codingCards.forEach(function (card) {

        card.classList.remove("active");

    });


    if (codingCards[codingIndex]) {

        codingCards[codingIndex]
            .classList.add("active");

    }

}


/* =========================
   PREVIOUS CODING CARD
========================= */

if (codingPrev) {

    codingPrev.addEventListener(
        "click",
        function () {

            codingIndex--;


            if (codingIndex < 0) {

                codingIndex =
                    codingCards.length - 1;

            }


            updateCodingCarousel();

        }
    );

}


/* =========================
   NEXT CODING CARD
========================= */

if (codingNext) {

    codingNext.addEventListener(
        "click",
        function () {

            codingIndex++;


            if (
                codingIndex >=
                codingCards.length
            ) {

                codingIndex = 0;

            }


            updateCodingCarousel();

        }
    );

}


/* =========================
   INITIALIZE WEBSITE
========================= */

showScreen("welcome");

updateFlowerCarousel();

updateCodingCarousel();