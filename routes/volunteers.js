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
      const error = {
        message: "The volunteer was not found",
        errorMessage: err.message
      };
      console.error(error);
      res.status(400).json(error);
    } else {
      res.status(201).json({
        message: "Item was  created successfully"
      });
    }
  });
});

router.get("/email-check/:email", (req, res) => {
  Volunteer.findOne({ email: req.params.email }, (err, vol) => {
    if (vol !== null) {
      res.status(200).json({
        exist: true
      });
    } else {
      res.status(200).json({
        exist: false
      });
    }
  });
});
router.patch("/:id", (req, res) => {
  Volunteer.findById(req.params.id, (err, vol) => {
    if (err) {
      const error = {
        message: "The volunteer was not updated",
        errorMessage: err.message
      };
      console.error(error);
      res.status(400).json(error);
    }
    for (let i in req.body) {
      vol[i] = req.body[i];
    }
    vol.save((err, userA) => {
      if (err) return res.status(400).json({ msg: "nu s-a updatat" });
      res.status(201).json({ msg: "Volunteer updated" });
    });
  });
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
          message: "The volunteer was not updated",
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

router.get("/extract-data", (req, res, next) => {
  Volunteer.find({}, (err, volunteers) => {
    if (err) {
      throw err;
    } else {
      require('fs').writeFileSync('data.json', JSON.stringify(volunteers));
      res.status(200).json({
        total: volunteers.length,
        volunteers
      });
    }
  });
});

module.exports = router;
