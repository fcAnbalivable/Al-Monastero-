// script.js

document.addEventListener("DOMContentLoaded", function () {
  const steps = document.querySelectorAll(".step");
  const progressIndicators = document.querySelectorAll(".step-indicator");

  const nextButtons = document.querySelectorAll(".next-button");
  const prevButtons = document.querySelectorAll(".prev-button");

  // People selection
  const peopleBtns = document.querySelectorAll(".people-btn");
  const numPersoneInput = document.getElementById("numPersone");

  // Date selection
  const dataInput = document.getElementById("dataPrenotazione");

  // Time selection
  const timeBtns = document.querySelectorAll(".time-btn");
  const oraInput = document.getElementById("oraPrenotazione");

  // Track current step (1-4)
  let currentStep = 1;

  // Helper function: show the given step
  function showStep(stepNumber) {
    steps.forEach((step) => {
      step.classList.remove("active");
    });
    const stepToShow = document.querySelector(
      `.step[data-step="${stepNumber}"]`
    );
    if (stepToShow) {
      stepToShow.classList.add("active");
    }

    // Update progress bar
    progressIndicators.forEach((indicator) => {
      indicator.classList.remove("active");
    });
    const indicatorToActivate = document.getElementById(
      `step-indicator-${stepNumber}`
    );
    if (indicatorToActivate) {
      indicatorToActivate.classList.add("active");
    }
  }

  showStep(currentStep);

  // STEP 1: People selection
  peopleBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // remove selected from all
      peopleBtns.forEach((b) => b.classList.remove("selected"));
      // add selected to the clicked one
      this.classList.add("selected");
      // store the value
      numPersoneInput.value = this.getAttribute("data-value");

      // enable the "Next" button
      const parentFieldset = this.closest("fieldset");
      const nextBtn = parentFieldset.querySelector(".next-button");
      if (nextBtn) {
        nextBtn.disabled = false;
      }
    });
  });

  // STEP 2: Date selection
  dataInput.addEventListener("change", function () {
    const parentFieldset = this.closest("fieldset");
    const nextBtn = parentFieldset.querySelector(".next-button");
    if (this.value) {
      nextBtn.disabled = false;
    } else {
      nextBtn.disabled = true;
    }
  });

  // STEP 3: Time selection
  timeBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      timeBtns.forEach((b) => b.classList.remove("selected"));
      this.classList.add("selected");
      oraInput.value = this.getAttribute("data-time");

      const parentFieldset = this.closest("fieldset");
      const nextBtn = parentFieldset.querySelector(".next-button");
      if (nextBtn) {
        nextBtn.disabled = false;
      }
    });
  });

  // Next Buttons
  nextButtons.forEach((button) => {
    button.addEventListener("click", function () {
      currentStep++;
      if (currentStep > 4) currentStep = 4;
      showStep(currentStep);
    });
  });

  // Prev Buttons
  prevButtons.forEach((button) => {
    button.addEventListener("click", function () {
      currentStep--;
      if (currentStep < 1) currentStep = 1;
      showStep(currentStep);
    });
  });

  // Final Submit
  const form = document.getElementById("bookingForm");
  form.addEventListener("submit", function (e) {
    // REMOVE or COMMENT OUT e.preventDefault() so it sends to Formspree:
    // e.preventDefault();

    // If you want to see the data in console anyway, you can log it before submission:
    console.log("Numero persone:", numPersoneInput.value);
    console.log("Data prenotazione:", dataInput.value);
    console.log("Orario prenotazione:", oraInput.value);
    console.log("Nome:", form.nome.value);
    console.log("Cognome:", form.cognome.value);
    console.log("Email:", form.email.value);
    console.log("Telefono:", form.telefono.value);

    // The form will now actually POST to Formspree.
    // On success, you'll get an email at the address you set on the Formspree dashboard.
  });
});
