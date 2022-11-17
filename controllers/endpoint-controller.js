const { readEndpoints } = require("../models/endpoint-model");

exports.getEndpoints = (req, res, next) => {
  readEndpoints().then((endpoint) => {
    console.log(endpoint);
    res.status(200).send({ endpoints: endpoint });
  });
};
