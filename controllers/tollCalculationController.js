let validations = require('../validation')
let tollCalculationService = require('../services/tollCalculationService')

let sequelize 

module.exports = {
     vehicleEntry : async function (req,res)  {
         console.log("tollCalculationController.vehicleEntry", req.body)

         const validationResponse = validations.verifySchema(
          "VEHICLE_SCHEMA",
          req.body
        );
  
        if (!validationResponse.success) {
          let resp = {
            success: false,
            message: 'Invalid Request Body'
          }
          return res.status(422).send(resp);
        }

        let resp = await tollCalculationService.vehicleEntry(sequelize, req.body)
        if(resp.success == false)
        {
          return res.status(422).send(resp);
        }
        
        return res.status(200).send(resp);
      },

      vehicleExit : async function (req,res)  {
      console.log("tollCalculationController.vehicleEntry", req.body)
      const validationResponse = validations.verifySchema(
        "VEHICLE_SCHEMA",
        req.body
      );

      if (!validationResponse.success) {
        console.log("validationResponse is ", validationResponse)
        let resp = {
          success: false,
          message: 'Invalid Request Body'
        }
        return res.status(422).send(resp);
      }

      let resp = await tollCalculationService.vehicleExit(sequelize, req.body)
      if(resp.success == false)
        {
          return res.status(422).send(resp);
        }
      return res.status(200).send(resp);
     },

     setConnection : function  (user) {
      sequelize = user
     }

}


