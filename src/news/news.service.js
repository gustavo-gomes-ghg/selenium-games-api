const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
require('dotenv').config();
const Exception       = require('_middleware/exception');

module.exports = {
    getAll,
    getById,
    getByDate,
    getByStartEnd,
    getBySource,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.News.findAll({
        limit: 100,
        order: [
            ['post_date_ng', 'DESC']
        ]
    });
}

async function getById(id) {
    return await getNews(id);
}

async function getByDate(date) {
    return await db.News.findAll(
        {
            where: {
                post_date_ng: new Date(date)
            },
            order: [
                ['post_date_ng', 'DESC']
            ]
        }
    );
}

async function getByStartEnd(start, end) {
    return await db.News.findAll(
        {
            where: {
                [Op.between]: [new Date(start), new Date(end)], 
            },
            order: [
                ['post_date_ng', 'DESC']
            ]
        }
    );
}

async function getBySource(source) {
    return await db.News.findAll(
        {
            where: {
                source_ng: source,
            },
            limit: 100,
            order: [
                ['post_date_ng', 'DESC']
            ]
        }
    );
}

async function create(params) {

    // validate part 1
    if (   !params.title_ng 
        || !params.local_page_path_ng 
        || !params.source_ng 
        || !params.post_date_ng 
        || !params.header_image_ng 
        || !params.news_html_url 
        || !params.key_ng_boneco 
        || params.is_big_news_ng === undefined
        || !params.actual_month_ng 
        )
    {
        throw new Exception(409, 'podou nos dados faltantes');
    }

    // validate part 2 - Email
    if ( params.key_ng_boneco !== process.env.KEY_NG ) {
        throw new Exception(403, '');

    }

    // instantiate news object
    const news = new db.News(params);

    // save news
    const saved_news = await news.save();
    
    return saved_news;
}

async function update(id, params) {
    const news = await getNews(id);

    // copy params to news and save
    Object.assign(news, params);
    
    await news.save();
    
    return news;
}

async function _delete(id) {
    const news = await getNews(id);
    await news.destroy();
}

// helper functions

async function getNews(id) {
    const news = await db.News.findByPk(id);
    if (!news) throw new Exception(409, 'News not found');
    return news;
}

