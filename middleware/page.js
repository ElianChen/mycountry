/**
 * Created by yaoyin on 2016/5/23.
 */

var num_per_page = 10;

exports.set = function(opts){

    return function(req, res, next){
        num_per_page = opts.perpage || num_per_page;
        next();
    }
};

exports.info = function(fn){

    return function(req, res, next){

        fn(function(err, total){
            if(err){
                return next(err);
            }
            req.page = res.locals.page = {
                perpage: num_per_page,
                totalRecord: total,
                totalPages: Math.ceil(total/num_per_page)
            };
            next();
        });
    }
};

exports.content = function(fn){

    return function(req, res, next){

        var page = req.params.page ; //页码
        var from = (page-1) * num_per_page;
        var to = page * num_per_page;

        fn(
            function(err, docs){

                if(err){
                    return next(err);
                }


                var ret = docs.slice(from,to);

                var results = {
                    record: ret,
                    curPage: page,
                    totalRecord: docs.length,
                    perpage: num_per_page,
                    totalPages: Math.ceil(docs.length/num_per_page)
                };

                req.results = res.locals.results = results;

                next();
            }
        );
    }
};