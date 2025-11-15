export const FTL_RATES = {
    temperatureControlledRPM: 2.95,
    firstTemperatureClassRPM: 0.06, // greater than 33 degrees
    secondTemperatureClassRPM: 0.04, // 0 to 33 degrees
    thirdTemperatureClassRPM: 0.09, // -20 to 0 degrees
    canadaRPM: 2.95,
    usRPM: 2.50,
    canadaSameCity: 300,
    usSameCity: 250,
    pickupDateFee: 50, // first day
    additionalLocationTypeFee: 75,
    noDockFee: 75,
    heavyAndLightScalingFee: 50,
    blindShipmentFee: 125,
    floorLoadeItemsFee: 100,
    residentialFee: 25,
    liftgateFee: 150,
    palletJackFee: 50,
    aboveWeightFee: 25, //per 1000 lbs
    sameDayDeliveryFee: 100,
}
 export const LTL_RATES = {
    canadaRPM: 0.90,
    usRPM: 0.77,
    canadaSameCity: 250,
    usSameCity: 200,
    pickupDateFee: 50, // first day
    additionalLocationTypeFee: 75,
    noDockFee: 75,
    residentialFee: 25,
    liftgateFee: 150,
    palletJackFee: 50,
    insideLocationFee: 50,
    overweightFee: 130,
    sameDayDeliveryFee: 100,
}
