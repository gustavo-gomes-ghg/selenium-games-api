const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const newsService = require('./news.service');
const newsModel = require('./news.model');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.get('/:post_date', getByDate);
router.get('/:start/:end', getByStartEnd);
router.get('/:source', getBySource);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {

    newsService.getAll()
        .then(news => { res.json( newsModel.serialize( news ) ) })
        .catch(next);
}

function getById(req, res, next) {
    newsService.getById(req.params.id)
        .then(news => res.json( newsModel.serialize( news ) ))
        .catch(next);
}

function getByDate(req, res, next) {
    newsService.getByDate(req.params.post_date_ng)
        .then(news => res.json( newsModel.serialize( news ) ))
        .catch(next);
}

function getByStartEnd(req, res, next) {
    newsService.getByStartEnd(req.params.start, req.params.end)
        .then(news => res.json( newsModel.serialize( news ) ))
        .catch(next);
}

function getBySource(req, res, next) {
    newsService.getBySource(req.params.source_ng)
        .then(news => res.json( newsModel.serialize( news ) ))
        .catch(next);
}

function create(req, res, next) {
    newsService.create(req.body)
        .then(() => res.json({ message: 'News created' }))
        .catch(next);
}

function update(req, res, next) {
    newsService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'News updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    newsService.delete(req.params.id)
        .then(() => res.json({ message: 'News deleted' }))
        .catch(next);
}

// schema functions
function createSchema(req, res, next) {
    const schema = Joi.object({
        source_ng: Joi.string().required(),
        post_date_ng: Joi.string().required(),
        title_ng: Joi.string().required(),
        local_page_path_ng: Joi.string().required(),
        actual_month_ng: Joi.string().required(),
        header_image_ng: Joi.string().required(),
        news_html_url: Joi.string().required(),
        is_big_news_ng: Joi.boolean().required(),       
        key_ng_boneco: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        source_ng: Joi.string().empty(''),
        post_date_ng: Joi.string().empty(''),
        title_ng: Joi.string().empty(''),
        local_page_path_ng: Joi.string().empty(''),
        actual_month_ng: Joi.string().empty(''),
        header_image_ng: Joi.string().empty(''),
        news_html_url: Joi.string().empty('')
    });
    validateRequest(req, next, schema);
}
