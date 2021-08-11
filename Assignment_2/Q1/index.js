const fetch = require('cross-fetch');

let result = {
    actors: [],
    genres: []
}

const getResult = async () => {
    try {
        const res = await fetch('https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json');
        if (res.status != 200) {
            throw new Error(`Error Code: ${res.status}. Try again later.`)
        } else {
            const movies = await res.json();
            movies.forEach(movie => {
                if (movie['cast'] != []) {
                    movie['cast'].forEach(cast => {
                        if (!result['actors'].find(actor => actor['name'] == cast)) {
                            var actor = {
                                name: cast,
                                movies: [movie['title']]
                            }
                            result['actors'].push(actor);
                        } else {
                            for (const [index, actor] of result['actors'].entries()) {
                                if (actor['name'] == cast) {
                                    result['actors'][index]['movies'].push(movie['title']);
                                }
                            }
                        }
                    });
                }
                if (movie['genres'] != []) {
                    movie['genres'].forEach(type => {
                        if (!result['genres'].find(genre => genre['type'] == type)) {
                            var gen = {
                                type,
                                movies: [movie['title']]
                            }
                            result['genres'].push(gen);
                        } else {
                            for (const [index, gen] of result['genres'].entries()) {
                                if (gen['type'] == type) {
                                    result['genres'][index]['movies'].push(movie['title']);
                                }
                            }
                        }
                    });
                }
            });
            console.log(JSON.stringify(result));
        }
    } catch (err) {
        console.error(err);
    }
};

getResult();