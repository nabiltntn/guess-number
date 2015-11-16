if (Meteor.isClient) {

  Template.hello.onRendered(() => {
    let maxValue = 50000
    let currentValue = 10
    let found = false

    
    do {
      currentValue += 1;
      found = NumberGame.checkNumber(currentValue)
    } while (currentValue <= maxValue && found == false);





    if(found) {
      console.log(`Found !!! ${currentValue}`)
    } else {
      console.log(`Not Found !!! ${currentValue}`)
    }


  })

}
