const fetch = require('cross-fetch');

var queryString = "hello123"; //Type something here

let repos = [];

const resultTemplate = {
  name: "",
  full_name: "",
  private: "",
  owners: {
    login: "",
    name: "",
    followersCount: "",
    followingCount: "",
  },
  licenseName: "",
  score: "",
  numberOfBranch: ""
}

const makeGetCall = async (uri) => {
  try {
    const res = await fetch(uri);
    if (res.status != 200) {
      throw new Error(`Error Code: ${res.status}. Try again later.`)
    } else {
      return await res.json();
    }
  } catch (error) {
    console.log(error.message);
  }
}

const getSingleRepo = async (result) => {
  var repo = {
    ...resultTemplate
  };
  repo.name = result.name;
  repo.full_name = result['full_name'];
  repo.private = result['private'];
  repo.owners.login = result['owner']['login'];
  repo.licenseName = result['license'];
  repo.score = result['score'];
  // The following lines are commented because of API usage limitations
  // repo.owner.name = await makeGetCall(result['owner']['url'])['name'] || null;
  // repo.owner.followersCount = await makeGetCall(result['owner']['followers_url']).length;
  // repo.owner.followingCount = await makeGetCall(result['owner']['following_url']).length;
  // repo.numberOfBranch = await makeGetCall(result['branches_url'].replace('{/branches}', '')).length;
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