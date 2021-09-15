const express = require('express')
const path = require('path')
const cors = require('cors');
const router = express.Router();
const axios = require('axios')
const app = express()
app.use(cors());

app.use(express.static(path.join(__dirname, 'dist/HW8-FE')));

const port = process.env.PORT || 8080;
const api_key = '1c631779670da6470dc551b6877429b9';


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/HW8-FE/index.html'))
})

app.get('/mylist', (req, res) => {
  // use local storage here
  res.send('No movie in the list.')
})

app.get('/test', (req, res) => {
  // use local storage here
  res.send(JSON.stringify(results, null, 4))
})

app.get('/detail/:type', (req, res) => {

  const id = req.query.id;
  const type = req.params.type;

  const detail_url = 'https://api.themoviedb.org/3/'
  + type
  + '/'
  + id
  + '?api_key='
  + api_key 
  + '&language=en-US&page=1';

  console.log('get detail for id: ' + id + " type: " + type);

  axios.get(detail_url).then(response => {
    // console.log(response.data);
    res.send(response.data);
  });

  // use local storage here
  // res.send(JSON.stringify(results, null, 4))
})

app.get('/trailer/:type', (req, res) => {

  const id = req.query.id;
  const type = req.params.type;

  const trailer_url = 'https://api.themoviedb.org/3/'
  + type
  + '/'
  + id
  + '/videos'
  + '?api_key='
  + api_key 
  + '&language=en-US&page=1';

  console.log('get trailer for id: ' + id + " type: " + type);

  axios.get(trailer_url).then(response => {
    res.send(response.data);
  });

})

app.get('/cast/:type', (req, res) => {

  const id = req.query.id;
  const type = req.params.type;

  const trailer_url = 'https://api.themoviedb.org/3/'
  + type
  + '/'
  + id
  + '/credits'
  + '?api_key='
  + api_key 
  + '&language=en-US&page=1';

  console.log('get cast for id: ' + id + " type: " + type);

  axios.get(trailer_url).then(response => {
    res.send(response.data);
  });

})

app.get('/review/:type', (req, res) => {

  const id = req.query.id;
  const type = req.params.type;

  const review_url = 'https://api.themoviedb.org/3/'
  + type
  + '/'
  + id
  + '/reviews'
  + '?api_key='
  + api_key 
  + '&language=en-US&page=1';

  console.log('get review for id: ' + id + " type: " + type);

  axios.get(review_url).then(response => {
    res.send(response.data);
  });

})

app.get('/person/:id', (req, res) => {

  const id = req.params.id;

  const trailer_url = 'https://api.themoviedb.org/3/'
  + 'person/'
  + id
  + '?api_key='
  + api_key 
  + '&language=en-US&page=1';

  console.log('get person for id: ' + id);

  axios.get(trailer_url).then(response => {
    res.send(response.data);
  });

})

app.get('/external/:id', (req, res) => {

  const id = req.params.id;

  const external_url = 'https://api.themoviedb.org/3/'
  + 'person/'
  + id
  + '/external_ids'
  + '?api_key='
  + api_key 
  + '&language=en-US&page=1';

  console.log('get external for id: ' + id);

  axios.get(external_url).then(response => {
    res.send(response.data);
  });

})

app.get('/playing', (req, res) => {

  // const id = req.params.id;

  const external_url = 'https://api.themoviedb.org/3/'
  + 'movie/now_playing'
  + '?api_key='
  + api_key 
  + '&language=en-US&page=1';

  console.log('get now-playing movies');

  axios.get(external_url).then(response => {
    res.send(extractN(response.data.results, 5));
  });

})

function extractN(jsonObj, n) {
  rtnObj = [];
  for (let i = 0; i < n; i++) {
    rtnObj.push(jsonObj[i]);
  }
  // console.log(rtnObj);
  return rtnObj;
}

app.get('/popMovie', (req, res) => {

  // const id = req.params.id;

  const popMovie_url = 'https://api.themoviedb.org/3/'
  + 'movie/popular'
  + '?api_key='
  + api_key 
  + '&language=en-US&page=1';

  console.log('get popular movies');

  axios.get(popMovie_url).then(response => {
    res.send(response.data.results);
  });

})

app.get('/topMovie', (req, res) => {

  // const id = req.params.id;

  const media_url = 'https://api.themoviedb.org/3/'
  + 'movie/top_rated'
  + '?api_key='
  + api_key 
  + '&language=en-US&page=1';

  console.log('get toprated movies');

  axios.get(media_url).then(response => {
    res.send(response.data.results);
  });

})

app.get('/trendMovie', (req, res) => {

  const media_url = 'https://api.themoviedb.org/3/'
  + 'trending/movie/day'
  + '?api_key='
  + api_key 
  + '&language=en-US&page=1';

  console.log('get trending movies');

  axios.get(media_url).then(response => {
    res.send(response.data.results);
  });

})

app.get('/popTV', (req, res) => {

  const media_url = 'https://api.themoviedb.org/3/'
  + 'tv/popular'
  + '?api_key='
  + api_key 
  + '&language=en-US&page=1';

  console.log('get popular tv shows');

  axios.get(media_url).then(response => {
    res.send(response.data.results);
  });

})

app.get('/topTV', (req, res) => {

  const media_url = 'https://api.themoviedb.org/3/'
  + 'tv/top_rated'
  + '?api_key='
  + api_key 
  + '&language=en-US&page=1';

  console.log('get top rated tv shows');

  axios.get(media_url).then(response => {
    res.send(response.data.results);
  });

})

app.get('/trendTV', (req, res) => {

  const media_url = 'https://api.themoviedb.org/3/'
  + 'trending/tv/day'
  + '?api_key='
  + api_key 
  + '&language=en-US&page=1';

  console.log('get trending tv shows');

  axios.get(media_url).then(response => {
    res.send(response.data.results);
  });

})

app.get('/rec/:type', (req, res) => {

  const id = req.query.id;
  const type = req.params.type;

  const media_url = 'https://api.themoviedb.org/3/'
  + type
  + '/'
  + id
  + '/recommendations?api_key='
  + api_key 
  + '&language=en-US&page=1';

  console.log('get recommendation for id: ' + id + " type: " + type);

  axios.get(media_url).then(response => {
    res.send(response.data.results);
  });
})

app.get('/similar/:type', (req, res) => {

  const id = req.query.id;
  const type = req.params.type;

  const media_url = 'https://api.themoviedb.org/3/'
  + type
  + '/'
  + id
  + '/similar?api_key='
  + api_key 
  + '&language=en-US&page=1';

  console.log('get similar for id: ' + id + " type: " + type);

  axios.get(media_url).then(response => {
    // console.log(response.data);
    res.send(response.data.results);
  });

  // use local storage here
  // res.send(JSON.stringify(results, null, 4))
})

app.get('/search', (req, res) => {
  const movies = {
    'movies': ['movie1', 'movie2', 'movie3', 'bad_movie1', 'bad_movie2']
  }
  
  // const value = req.url.match(/search=(.+)/i)[1];
  // console.log(value);

  const query = req.url.match(/search=(.+)/i)[1]; // use regex to capture the search query

  const search_url = 'https://api.themoviedb.org/3/search/multi?api_key=' 
  + api_key 
  + '&language=en-US&query='
  + query

  console.log('searched for: ' + query);

  // axios.get(search_url)
  // res.send(movies)  

  axios.get(search_url).then(response => {

    const value = response.data;
    const results = [];

    // format the response into [query, [results]] format
    if (value.results) {
      
      for (let i = 0; i < Math.min(value.results.length, 10); i++) {

        const movie = {
          'name':'',
          'path':'',
          'type':'',
          'id':''
        };

        // if (value.results[i].title) {
        //   results.push(value.results[i].title);
        // }

        // else if (value.results[i].name) {
        //   results.push(value.results[i].name);
        // }

        if (value.results[i].title) {
          movie.name = value.results[i].title;
        }

        else if (value.results[i].name) {
          movie.name = value.results[i].name;
        }

        if (value.results[i].backdrop_path) {
          // results.push(value.results[i].backdrop_path);
          movie.path = value.results[i].backdrop_path;
        } else {
          movie.path = null;
        }

        if (value.results[i].media_type) {
          movie.type = value.results[i].media_type;
        }

        if (value.results[i].id) {
          movie.id = value.results[i].id;
        }
        
        results.push(movie);
      }
    }
    // console.log(results);
    res.send([query, results]);
  });

})

// app.use('/*', function(req, res) {
	// res.sendFile(path.join(__dirname + '/dist/HW8-FE/index.html'))
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;