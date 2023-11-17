const router = require('express').Router();
const { Traveller, Trip, Location } = require('../../models');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
    try {
        const travellerData = await Traveller.findAll();
        console.log(travellerData);
        res.status(200).json(travellerData);
    } catch (err) {
        //console.log(err);
        res.status(500).json(err);
    }
});


router.get('/:id', async (req, res) => {
    try {
        const travellerData = await Traveller.findByPk(req.params.id, {
            include: [{ model: Location, as: 'destinations' }],
        });
        res.status(200).json(travellerData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const travellerData = await Traveller.create(req.body);
        res.status(200).json(travellerData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const travellerData = await Traveller.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!travellerData) {
            res.status(404).json({ message: 'No traveller found with that id!' });
            return;
        }

        res.status(200).json(travellerData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
      const travellerData = await Traveller.findOne({ where: { email: req.body.email } });
      console.log(travellerData);
      if (!travellerData) {
        res.status(404).json({ message: 'Login failed. Please try again!' });
        return;
      }
  
      const validPassword = await bcrypt.compare(
        req.body.password,
        travellerData.password
      );
      if (!validPassword) {
        res.status(400).json({ message: 'Login failed. Please try again!' });
        return;
      }
      const tripDetails = await Trip.findAll({ where: { traveller_id: travellerData.id } }, {
        include: [{ model: Location}],
    });
    const responseData = {
        message: 'You are now logged in!',
        trips: tripDetails
    };
      res.status(200).json(responseData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;