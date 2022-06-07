const { DataTypes } = require('sequelize');

module.exports = {
    model,
    serialize
};

function model(sequelize) {
    
    const attributes = {
        id_ng: {
            type: DataTypes.INTEGER, 
            autoIncrement: true, 
            primaryKey: true 
        },
        source_ng: { 
            type: DataTypes.STRING, 
            allowNull: false
        },        
        post_date_ng: { 
            type: DataTypes.DATE, 
            allowNull: false 
        },        
        title_ng: { 
            type: DataTypes.STRING, 
            allowNull: false
        },        
        local_page_path_ng: { 
            type: DataTypes.TEXT ,
            allowNull: false
        },
        actual_month_ng: { 
            type: DataTypes.STRING, 
            allowNull: false
        },
        header_image_ng: { 
            type: DataTypes.STRING, 
            allowNull: false
        }, 
        news_html_url: { 
            type: DataTypes.STRING, 
            allowNull: false
        }, 
        is_big_news_ng: { 
            type: DataTypes.BOOLEAN, 
            allowNull: false,
            defaultValue: false
        }, 
        number_visits_ng: { 
            type: DataTypes.INTEGER
        },    
        
    };

    const options = {
        defaultScope: {
            // exclude password hash by default
            attributes: { exclude: ['passwordHash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('news_ng', attributes, options);
}

function serialize(input) {
    
    let output = []; 

    for ( let i = 0; i < input.length; i++ ) {
        const news = input[i];
        output.push( {
            id_ng: news.id_ng,
            source_ng: news.source_ng,
            post_date_ng: news.post_date_ng,
            title_ng: news.title_ng,
            local_page_path_ng: news.local_page_path_ng,
            actual_month_ng: news.actual_month_ng,
            header_image_ng: news.header_image_ng,
            news_html_url: news.news_html_url,
            is_big_news_ng: news.is_big_news_ng,
            number_visits_ng: news.number_visits_ng
        })
    }
    return output;
}