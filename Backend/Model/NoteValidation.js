const Joi = require('joi');

const noteSchema = Joi.object({
    title: Joi.string(),
    content: Joi.string(),
    tags: Joi.array().items(Joi.string()),
    noteSystem: Joi.string().valid('Plain Text', 'Markdown', 'Rich Text').default('Plain Text'),
});

module.exports = noteSchema;