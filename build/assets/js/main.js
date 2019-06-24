'use strict'
/* ----------------------------
  Validation
  first: Mask prototype
  second Validation
---------------------------- */


let inputValidPhone = false;
let inputValidPass = false;

window.onload = function() {
  document.querySelector(".preloader").classList.add('hide');
};

document.addEventListener('DOMContentLoaded', function () {

  /* ----------------------------
    This is MASK-validation
  ---------------------------- */

  function mask() {
    let matrix = "_ (___) ___-__-__",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
    if (def.length >= val.length) val = def;
    this.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
    });
  };
    let input = document.querySelector("#phone-number");
    input.addEventListener("input", mask, false);

  /* ----------------------------
    CustomValidation 
  ---------------------------- */

  function CustomValidation(input) {
    this.invalidities = [];
    this.validityChecks = [];

    //add reference to the input node
    this.inputNode = input;

    //trigger method to attach the listener
    this.registerListener();
  }

  CustomValidation.prototype = {
    addInvalidity: function (message) {
      this.invalidities.push(message);
    },
    getInvalidities: function () {
      return this.invalidities.join('. \n');
    },
    checkValidity: function (input) {
      for (let i = 0; i < this.validityChecks.length; i++) {

        let isInvalid = this.validityChecks[i].isInvalid(input);
        if (isInvalid) {
          this.addInvalidity(this.validityChecks[i].invalidityMessage);
        }

        let requirementElement = this.validityChecks[i].element;


        if (requirementElement) {

          if (isInvalid) {
            requirementElement.classList.add('invalid');
            requirementElement.classList.remove('valid');

            if (input.name == 'phone') {
              inputValidPhone = false;
            } else if (input.name == 'password') {
              inputValidPass = false;
            }

          } else {
            requirementElement.classList.remove('invalid');
            requirementElement.classList.add('valid');

            if (input.name == 'phone') {
              inputValidPhone = true;
            } else if (input.name == 'password') {
              inputValidPass = true;
            }
          }
          
          if (inputValidPhone && inputValidPass) {
            document.querySelector('input[type="submit"]').removeAttribute("disabled");
          } else {
            document.querySelector('input[type="submit"]').disabled = "true";
          }
        }
        
          // end if requirementElement

      } // end for
    },
    checkInput: function () { // checkInput now encapsulated

      this.inputNode.CustomValidation.invalidities = [];
      this.checkValidity(this.inputNode);

      if (this.inputNode.CustomValidation.invalidities.length === 0 && this.inputNode.value !== '') {
        this.inputNode.setCustomValidity('');
      } else {
        let message = this.inputNode.CustomValidation.getInvalidities();
        this.inputNode.setCustomValidity(message);
      }
    },
    registerListener: function () { //register the listener here

      let CustomValidation = this;

      this.inputNode.addEventListener('keyup', function () {
        CustomValidation.checkInput();
      });

    }

  };



  /* ----------------------------
    Validity Checks
  ---------------------------- */

  let usernameValidityChecks = [

    {
      isInvalid: function (input) {
        let length = input.value.length < 17;
        return length ? true : false;
      },
      invalidityMessage: 'Needs to be at least 11 characters',
      element: document.querySelector('label[for="phone-number"] .form__input-requirements')
      
    }
  ];

  let passwordValidityChecks = [
    {
      isInvalid: function (input) {
        return input.value.length < 5 | input.value.length > 100;
      },
      invalidityMessage: 'This input needs to be between 5 and 100 characters',
      element: document.querySelector('label[for="password"] .form__input-requirements')
    }
  ];

  let usernameInput = document.getElementById('phone-number');
  let passwordInput = document.getElementById('password');


  usernameInput.CustomValidation = new CustomValidation(usernameInput);
  usernameInput.CustomValidation.validityChecks = usernameValidityChecks;

  passwordInput.CustomValidation = new CustomValidation(passwordInput);
  passwordInput.CustomValidation.validityChecks = passwordValidityChecks;
  
});