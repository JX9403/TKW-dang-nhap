function Validator(options) {
  var selectorRules = {};
  // la mot object co cac key la ten selector, moi key chua 1 mang cac rule
  // ham thuc hien validate
  function validate(inputElement, rule) {
    var errorMessage ;
    var errorElement = inputElement.parentElement.querySelector(
      options.errorSelector
    );
// lay ra cac rule cua selector
    var rules = selectorRules[rule.selector];
  
    // lap qua tung rule va check, neu co loi thi dung kiem tra
    for( var i = 0; i< rules.length; i++){
      errorMessage = rules[i](inputElement.value);
      if(errorMessage) break;
    }

    if (errorMessage) {
      errorElement.innerText = errorMessage;
      inputElement.parentElement.classList.add("invalid");
    } else {
      errorElement.innerText = "";
      inputElement.parentElement.classList.remove("invalid");
    }
  }

  //lay element cua form can validate
  var formElement = document.querySelector(options.form);
  if (formElement) {
    options.rules.forEach(function (rule) {
      //luu lai cac rule cho moi input
      //tao key cho obj selectorRules la mot mang co 1 phan tu la rule test dau tien
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test);
      } else {
        selectorRules[rule.selector] = [rule.test];
      }

      var inputElement = formElement.querySelector(rule.selector);

      if (inputElement) {
        //xu li truong hop blur khoi input
        inputElement.onblur = function () {
          validate(inputElement, rule);
        };

        //xu li moi khi nguoi dung nhap moi

        inputElement.oninput = function () {
          var errorElement = inputElement.parentElement.querySelector(
            options.errorSelector
          );
          errorElement.innerText = "";
          inputElement.parentElement.classList.remove("invalid");
        };
      }
    });

 
  }
}

Validator.isRequired = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : "Vui long nhap truong nay!";
    },
  };
};

Validator.isEmail = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      return regex.test(value) ? undefined : "Truong nay phai la email";
    },
  };
};

Validator.minLength = function (selector, min) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= min
        ? undefined
        : `Mat khau phai chua it nhat ${min} ki tu!`;
    },
  };
};

Validator.isConfirmed = function (selector, getConfirmValue, message) {
  return {
    selector: selector,
    test: function (value) {
      return value === getConfirmValue() ? undefined : message;
    },
  };
};

Validator.isEmailConfirm = function(selector, getConfirmValue, message){
  
  return {
    selector: selector,
    test : function(value){
      return ( value.indexOf('@stu.ptit.edu.vn') >=0 ) ? undefined : message;
    },
  }
}
