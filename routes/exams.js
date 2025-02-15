const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const connection = require('../config/database');

router.get('/', function (req, res) { 
    connection.query('SELECT * FROM exams', function(err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'List Data Exams',
                data: rows
            });
        }
    });
});

router.post('/store', [
    body('name').notEmpty(),
    body('description').notEmpty(),
    body('duration').notEmpty(),
    body('code').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    const formData = {
        name: req.body.name,
        description: req.body.description,
        duration: req.body.duration,
        code: req.body.code,
    };

    connection.query('INSERT INTO exams SET ?', formData, function(err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
                error: err.sqlMessage
            });
        } else {
            return res.status(201).json({
                status: true,
                message: 'Insert Data Successfully',
                data: rows[0]
            });
        }
    });
});

router.get('/(:id)', function (req, res) {
    const id = req.params.id;

    connection.query(`SELECT * FROM exams where id = ${id}`, function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
                error: err.sqlMessage
            });
        }

        if (rows.length <= 0) {
            return res.status(404).json({
                status: false,
                message: 'Data Exam Not Found!'
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Detail Data Exam',
                data: rows[0]
            });
        }
    });
});

router.patch('/update/:id', [
    body('name').notEmpty(),
    body('description').notEmpty(),
    body('duration').notEmpty(),
    body('code').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(402).json({
            errors: errors.array()
        });
    }

    const id = req.params.id;

    const formData = {
        name: req.body.name,
        description: req.body.description,
        duration: req.body.duration,
        code: req.body.code,
    };

    connection.query(`UPDATE exams SET ? WHERE id = ${id}`, formData, function (err) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error'
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Update Data Successfully!',
            });
        }
    });
});

router.delete('/delete/(:id)', function (req, res) {
    const id = req.params.id;

    connection.query(`DELETE FROM exams WHERE id = ${id}`, function (err) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Delete Data Successfully!'
            });
        }
    });
});

module.exports = router;