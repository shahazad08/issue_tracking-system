const Student = require("../models/student_sample.model")

exports.findAll = (req, res) => {
  Student.find()
    .then(users => {
      res.send(users);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Something went wrong while getting list of users."
      });
    });
};

exports.getStudent = (req, res) => {
  Student.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id
        });
      }
      res.send(user);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "User not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Error getting user with id " + req.params.id
      });
    });
};


exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Please fill all required field"
    });
  }
  // Find user and update it with the request body
  Student.findByIdAndUpdate(req.params.id, {
    cic_id: req.body.cic_id,
    engineer_name: req.body.engineer_name,
    issue_type: req.body.issue_type,
    issue_description: req.body.issue_description,
    additional_information: req.body.additional_information,
    productImage: req.file.path

  }, { new: true })

    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "user not found with id " + req.params.id
        });
      }
      res.status(200).send({
        message:"User Updated Successfull",
        user
      });
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "user not found with id " + req.params.id
        });
      }
      return res.status(500).send({

        message: "Error updating user with id " + req.params.id
      });
    });
};


// Create and Save a new Student
exports.create = (req, res) => {
  console.log("FIle Path", req.file);
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Please fill all required field"
    });
  }

  // Create a new Student
  cic_id = req.body.cic_id,
    engineer_name = req.body.engineer_name,
    issue_type = req.body.issue_type,
    issue_description = req.body.issue_description,
    additional_information = req.body.additional_information,
    productImage = req.file.path
  const student = new Student({
    cic_id: cic_id,
    engineer_name: engineer_name,
    issue_type: issue_type,
    additional_information: additional_information,
    issue_description: issue_description,
    productImage: productImage
  })

  // Save user in the database
  student.save()
    .then(data => {
      res.status(200).send({
        message:"User Created Successfull",
        data
      });
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Something went wrong while creating new user."
      });
    });
};


// Delete Student
exports.delete = (req, res) => {
  Student.findByIdAndRemove(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "user not found with id " + req.params.id
        });
      }
      res.send({ message: "user deleted successfully!" });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "user not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Could not delete user with id " + req.params.id
      });
    });
};