const express = require("express");
const router = express.Router();
const Volunteer = require("../models/Volunteer");
const mongoose = require("mongoose");

router.get("/", (req, res, next) => {
  // Return All ASII volunteers
  const volunteers = Volunteer.find({}, (err, volunteers) => {
    if (err) {
      throw err;
    } else {
      res.status(200).json({
        total: volunteers.length,
        volunteers
      });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  const volunteerToDelete = Volunteer.findByIdAndDelete(req.params.id, err => {
    if (err) {
      res.status(400).json({
        message: "Invalid Request"
      });
    } else {
      res.status(200).json({
        message: "Volunteer was deleted"
      });
    }
  });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  const volunteer = Volunteer.findById(id, (err, volunteer) => {
    if (err) {
      res.status(400).json({
        message: "Invalid request",
        errorMessage: err.message
      });
    } else {
      res.status(200).json({
        volunteer
      });
    }
  });
});

router.post("/", (req, res, next) => {
  const newVolunteer = new Volunteer(req.body);
  newVolunteer.save(err => {
    if (err) {
      res.status(400).json({
        message: "The volunteer was not found",
        errorMessage: err.message
      });
    } else {
      res.status(201).json({
        message: "Item was created successfully"
      });
    }
  });
});

router.patch("/:id", (req, res) => {
  User.findById(id, function (err, user) {
    if (err) reject(err);
    for (let i in userData) {
        user[i] = userData[i];
    }
    user.save(function (err, updatedUser) {
        if (err) return reject(err);
        resolve(updatedUser);
    });
});
  Volunteer.findById(req.params.id,(err,volunteer)=>{
    if (err) {
      res.status(400).json({
        message: "Tshe volunteer was not updated",
        errorMessage: err.message
      });
    }else{
      for(let i in req.body){
        volunteer[i] = req.body[i]
      }

      Volunteer.save(err => {
        if (err) {
          res.status(400).json({
            message: "The volunteer was not found",
            errorMessage: err.message
          });
        } else {
          res.status(201).json({
            message: "Item was updated successfully"
          });
        }
      })
    }
  })
});
router.put("/:id", (req, res, next) => {
  const updateVolunteer = Volunteer.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body
    },
    (err, volunteer) => {
      if (err) {
        res.status(400).json({
          message: "Tshe volunteer was not updated",
          errorMessage: err.message
        });
      } else {
        res.status(400).json({
          message: "The volunteer updated successfully",
          volunteer
        });
      }
    }
  );
});

module.exports = router;
