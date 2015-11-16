if (Meteor.isClient) {

  NumberGame = {
    checkNumber(number) {
      
      let numArray = number.toString().split("")
      let digitToCheck = _.uniq(numArray)
      let digitNotToCheck = _.difference(_.map(_.range(10), (val) => {return val.toString()}), digitToCheck)
      
      
      
      let propsToCheck = _.values(_.pick(NumberFunction, digitToCheck))
      let propsNotToCheck = _.values(_.pick(NumberFunction, digitNotToCheck))
      

      let allCheck = propsToCheck.every(currentFunc => currentFunc(numArray) == true);
      let allNotCheck = propsNotToCheck.every(currentFunc => currentFunc(numArray) == false);
      
      return allCheck && allNotCheck
    }
  }

  NumberFunction = {
    '0' :  function (number) {// un des chiffre somme des autres
      //Calcul des sommes
      let valid = false
      if(number.length > 1) {
        let somme = 0
        //Calculer la somme
        for (let i = 0, length = number.length; i <length ; i++) {
          somme += parseInt(number[i])
        }
        //Comparer la difference des chifres avec la somme
        for (let i = 0, length = number.length; i <length ; i++) {
          if(somme - parseInt(number[i]) == parseInt(number[i])) {
            valid = true
          }
        }
      }
      return valid
    },
    '1' : function (number) {// chiffres suite décroissante
      let valid = true
      if(number.length > 1) {
      let sorted = _.sortBy(number, (num) => { return -num})
      for (let i = 0, length = number.length; i < length ; i++) {
         if(sorted[i] !== number[i]) {
           valid = false
         }
      }
      }
      
      return valid
    },
    '2' : function (number) {// au moins 2 chiffres impairs
      return _.countBy(number, (digit) => {
        return digit % 2 != 0
      }).true >= 2
    },
    '3' : function (number) {// chiffres tous différents
      return number.length > 1 && _.uniq(number).length == number.length
    },
    '4' : function (number) {// 4ème chiffre pair
      return number.length >= 4 && number[3] % 2 == 0
    },
    '5' : function (number) {// produit pas multiple de 5
      let produit = 1
      for (let i = 0; i < number.length; i++) {
        produit *= parseInt(number[i])
      }
      return produit % 5 != 0
    },
    '6' : function (number) {// 3 chiffres impairs à la suite
      let valid = false
      if(number.length >=3) {
        for (let i = 0; i < number.length - 2 ; i++) {
          if(number[i] % 2 != 0 && number[i+1] % 2 != 0 && number[i+2] % 2 != 0) {
            valid = true
          }
        }
      }
      return valid
    },
    '7' : function(number) {// nombre premier
      //Tester les nombre de 2 à racine de N
      let valid = false
      let num = parseInt(number)
      let numMax = Math.floor(Math.sqrt(num))
      for (let i = 0; i < numMax - 2 ; i++) {
        if(num % (i + 2) == 0) {
          valid = true
        }
      }
      
      return valid
    },
    '8' : function(number) {// 2 chiffres pairs à la suite
      let valid = false
      if(number.length >=2) {
        for (let i = 0; i < number.length - 1 ; i++) {
          if(number[i] % 2 == 0 && number[i+1] % 2 == 0) {
            valid = true
          }
        }
      }
      return valid
    },
    '9' : function(number) {// produit des chiffres impairs carré parfait
      let impairs = _.filter(number, function(num){ return num % 2 != 0})
      let produit = 1;
      for (let i = 0, length = impairs.length; i < length ; i++) {
        produit *= parseInt(impairs[i])
      }
      return Math.sqrt(produit) % 1 == 0
    }

  }


}
