const fetch = require('cross-fetch');

var queryString = "hello123"; //Type something here

let repos = [];

const resultTemplate = {
    name: "",
    full_name: "",
    private: "",
    owner: {
        login: "",
        name: "",
        followersCount: "",
        followingCount: "",
    },
    licenseName: "",
    score: "",
    numberOfBranch: ""
}

const errors = {
    400: "Bad request",
    401: "Unauthorized",
    403: "API access forbidden",
    404: "Not found",
}

const error_codes = Object.keys(errors).map(code => Number(code));

const makeGetCall = async (uri) => {
    try {
        const res = await fetch(uri);
        if (error_codes.includes(res.status)) {
            return res.status;
        } else if ([200, 201, 202].includes(res.status)) {
            return await res.json();
        } else {
            throw new Error(`Error Code: ${res.status}. Try again later.`)
        }
    } catch (error) {
        console.log(error);
    }
}

const getNameProperty = async (uri) => {
    const response = await makeGetCall(uri);
    if (response.hasOwnProperty('name') && !error_codes.includes(response)) {
        return response['name']
    } else if (error_codes.includes(response)) {
        return errors[response];
    } else {
        return null
    }
}

const getLength = async (uri) => {
    const response = await makeGetCall(uri);
    if (response != [] && !error_codes.includes(response)) {
        return response.length
    } else if (error_codes.includes(response)) {
        return errors[response];
    } else {
        return null
    }
}

const getSingleRepo = async (result) => {
    var repo = {
        ...resultTemplate
    };
    repo.name = result.name;
    repo.full_name = result['full_name'];
    repo.private = result['private'];
    repo.owner.login = result['owner']['login'];
    repo.licenseName = result['license'];
    repo.score = result['score'];
    repo.owner.name = await getNameProperty(result['owner']['url']);
    repo.owner.followersCount = await getLength(result['owner']['followers_url']);
    repo.owner.followingCount = await getLength(result['owner']['following_url']);
    repo.numberOfBranch = await getLength(result['branches_url']);
    return repo;
}

const getResult = async () => {
    try {
        results = await makeGetCall("https://api.github.com/search/repositories?q=" + queryString);
        for (result of results['items']) {
            var repo = await getSingleRepo(result);
            repos.push(repo);
        }
        console.log(repos);
    } catch (err) {
        console.error(err.message);
    }
};

getResult();