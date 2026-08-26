/* =========================================
   A LITTLE SOMETHING FOR YOU
   NAVIGATION + CAROUSELS
========================================= */

const screens = document.querySelectorAll(".screen");

let currentScreen = 0;


/* =========================================
   SCREEN NAVIGATION
========================================= */

function showScreen(index) {

    if (index < 0 || index >= screens.length) {
        return;
    }

    screens.forEach((screen) => {
        screen.classList.remove("active");
    });

    screens[index].classList.add("active");

    currentScreen = index;
}


/* =========================================
   NEXT BUTTONS
   ONLY BUTTON CLICKS CHANGE SCREENS
========================================= */

document.querySelectorAll("[data-next]").forEach((button) => {

    button.addEventListener("click", () => {

        const targetId = button.getAttribute("data-next");

        const targetScreen =
            document.getElementById(targetId);

        if (!targetScreen) {
            console.warn(
                `Screen "${targetId}" was not found.`
            );

            return;
        }

        const targetIndex =
            Array.from(screens).indexOf(targetScreen);

        if (targetIndex !== -1) {
            showScreen(targetIndex);
        }

    });

});


/* =========================================
   START AT WELCOME
========================================= */

showScreen(0);


/* =========================================
   CAROUSEL FUNCTION
========================================= */

function setupCarousel({
    slideSelector,
    dotsId,
    prevId,
    nextId
}) {

    const slides =
        document.querySelectorAll(slideSelector);

    const dotsContainer =
        document.getElementById(dotsId);

    const prevButton =
        document.getElementById(prevId);

    const nextButton =
        document.getElementById(nextId);


    if (
        !slides.length ||
        !dotsContainer ||
        !prevButton ||
        !nextButton
    ) {
        return null;
    }


    let currentSlide = 0;


    /* CREATE DOTS */

    slides.forEach((_, index) => {

        const dot =
            document.createElement("button");

        dot.type = "button";

        dot.className = "carousel-dot";

        dot.setAttribute(
            "aria-label",
            `Slide ${index + 1}`
        );

        dot.addEventListener("click", () => {

            currentSlide = index;

            update();

        });

        dotsContainer.appendChild(dot);

    });


    const dots =
        dotsContainer.querySelectorAll(
            ".carousel-dot"
        );


    /* UPDATE CAROUSEL */

    function update() {

        slides.forEach((slide, index) => {

            slide.classList.toggle(
                "active",
                index === currentSlide
            );

        });


        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentSlide
            );

        });

    }


    /* NEXT */

    function next() {

        currentSlide =
            (currentSlide + 1) % slides.length;

        update();

    }


    /* PREVIOUS */

    function previous() {

        currentSlide =
            (currentSlide - 1 + slides.length) %
            slides.length;

        update();

    }


    nextButton.addEventListener(
        "click",
        next
    );

    prevButton.addEventListener(
        "click",
        previous
    );


    update();


    return {
        next,
        previous
    };
}


/* =========================================
   APPRECIATION CAROUSEL
========================================= */

const appreciationCarousel =
    setupCarousel({

        slideSelector:
            ".appreciation-slide",

        dotsId:
            "appreciationDots",

        prevId:
            "appreciationPrev",

        nextId:
            "appreciationNext"

    });


/* =========================================
   CODING CAROUSEL
========================================= */

const codingCarousel =
    setupCarousel({

        slideSelector:
            ".coding-card",

        dotsId:
            "codingDots",

        prevId:
            "codingPrev",

        nextId:
            "codingNext"

    });


/* =========================================
   KEYBOARD SUPPORT
   Optional desktop feature
========================================= */

document.addEventListener("keydown", (event) => {

    if (
        event.target.tagName === "INPUT" ||
        event.target.tagName === "TEXTAREA"
    ) {
        return;
    }


    if (event.key === "ArrowRight") {

        if (
            screens[currentScreen]?.id ===
            "appreciation"
        ) {
            appreciationCarousel?.next();
        }

        if (
            screens[currentScreen]?.id ===
            "coding"
        ) {
            codingCarousel?.next();
        }

    }


    if (event.key === "ArrowLeft") {

        if (
            screens[currentScreen]?.id ===
            "appreciation"
        ) {
            appreciationCarousel?.previous();
        }

        if (
            screens[currentScreen]?.id ===
            "coding"
        ) {
            codingCarousel?.previous();
        }

    }

});