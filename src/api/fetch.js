import _ from 'lodash';
// import axios from 'axios';

export function on400(resp) {
  if (resp.status >= 400) {
    throw new Error('Bad response from server');
  }
  return resp;
}

export function toJSON(resp) {
  if (resp.status === 204) {
    return resp;
  }
  return resp.json();
}

export default function(url, method, data) {
  //let body = JSON.stringify(data);
  //let options = {
  //  timeout: 1e4,
  //  headers: {
  //    'Content-Type': 'application/json; charset=utf-8'
  //  }
  //};
  //
  //if (method.toLowerCase() !== 'get') {
  //  options = _.assign({}, options, { method, body });
  //}

  // return axios(`https://myapptest.herokuapp.com/${url}`, options)
  //  .then(on400)
  //  .then(toJSON);

  let localValue = localStorage.getItem('models');
  let models = [];

  let parseValue = (value) => {
    let v;
    try {
      v = JSON.parse(value);
    } catch (e) {
      v = [];
    }
    return v;
  };

  if (url === 'api/models' && method.toLowerCase() === 'get') {
    if (!_.isEmpty(localValue)) {
      models = parseValue(localValue);
    }
    return new Promise((resolve) => {
      setTimeout(() => { resolve(models); }, 500);
    });
  }


  if (url === 'api/model/create' && method.toLowerCase() === 'post') {
    const item = _.assign({}, data, { id: _.now()});
    if (_.isEmpty(localValue)) {
      models.push(item);
    } else {
      localValue = parseValue(localValue);
      models = _.concat(localValue, item);
    }
    localStorage.setItem('models', JSON.stringify(models));
    return new Promise((resolve) => {
      setTimeout(() => { resolve(item); }, 500);
    });
  }


  if (/api\/model/.test(url) && method.toLowerCase() === 'put') {
    const id = _.toNumber(url.replace(/\D+/g,''));
    if (_.isEmpty(localValue)) {
      models.push(_.assign({}, data, { id: _.now()}));
    } else {
      localValue = parseValue(localValue);
      models =  _.map(localValue, (item) => {
        if (item.id === id) {
          return _.assign({}, item, { ...data });
        }
        return item;
      });
    }
    localStorage.setItem('models', JSON.stringify(models));
    return new Promise((resolve) => {
      setTimeout(() => { resolve(_.find(models, ['id', id])); }, 500);
    });
  }


  if (/api\/model/.test(url) && method.toLowerCase() === 'delete') {
    const id = _.toNumber(url.replace(/\D+/g,''));
    if (!_.isEmpty(localValue)) {
      localValue = parseValue(localValue);
      models = _.reject(localValue, ['id', id]);
    }
    localStorage.setItem('models', JSON.stringify(models));
    return new Promise((resolve) => {
      setTimeout(() => { resolve(true); }, 500);
    });
  }
}
