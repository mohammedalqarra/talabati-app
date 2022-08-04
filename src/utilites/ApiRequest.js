import React from 'react';
import {Api_url, login_api, signup_api} from './ApiConstants';
import {mainAxios} from './axios';

const GetRequest = async (url, token) => {
  if (token) {
    return await mainAxios
      .get(Api_url + url, {headers: {Authorization: token}})
      .then(resp => {
        return resp;
      })
      .catch(error => {
        return error;
      });
  } else {
    return await mainAxios
      .get(Api_url + url)
      .then(resp => {
        return resp;
      })
      .catch(error => {
        return error;
      });
  }
};

const PostRequest = async (end_point, data, token) => {
  if (token) {
    return await mainAxios
      .post(end_point, data, {headers: {Authorization: token}})
      .then(resp => {
        console.log('response ', resp);
        return resp;
      })
      .catch(error => {
        console.log('response ', error);
        if (error.toJSON().message === 'Network Error') {
          console.log('No Internet');
        } else if (error.response.status === 401) {
          if (end_point == login_api || signup_api) {
            return error.response.data.message;
          }
          // return error.response;
        } else if (error.response.status === 422) {
          return error.response.data.message;
        }
      });
  } else {
    // console.log('token without ', data);
    return await mainAxios
      .post(end_point, data)
      .then(resp => {
        // console.log('come without token ', resp, data);
        return resp;
      })
      .catch(error => {
        if (error.toJSON().message === 'Network Error') {
          console.log('No Internet');
        } else if (error.response.status === 401) {
          if (end_point == login_api || signup_api) {
            return error.response.data.message;
          }
          // return error.response;
        } else if (error.response.status === 422) {
          return error.response.data.message;
        }
      });
  }
};

const PutRequest = async (end_point, data, token) => {
  return await mainAxios
    .put(end_point, data, {
      headers: {Authorization: token, 'Content-type': 'application/json'},
    })
    .then(resp => {
      return resp;
    })
    .catch(error => {
      alert(error.response.data.message);
      if (error.response.status === 401) {
        if (end_point == login_api || signup_api) {
          return error.response.data.message;
        }
        // return error.response;
      } else if (error.response.status === 422) {
        return error.response.data.message;
      }
    });
};

const DeleteRequest = async (end_point, token) => {
  const resp = await mainAxios.delete(end_point, {
    headers: {Authorization: token, 'Content-type': 'application/json'},
  });
  return resp.data;
};

const DeleteCartRequest = async (end_point, token) => {
  if (token) {
    const resp = await mainAxios
      .delete(end_point, {
        headers: {Authorization: token, 'Content-type': 'application/json'},
      })
      .catch(error => {
        console.log('err1', error);
      });
    return resp;
  } else {
    const resp = await mainAxios.delete(end_point).catch(error => {
      console.log('err', error);
    });
    return resp;
  }
};
const MultipartRequest = async (end_point, token, formData) => {
  return await mainAxios
    .post(end_point, formData, {
      headers: {
        Accept: 'application/json',
        Authorization: token,
        'Content-type': 'multipart/form-data',
      },
    })
    .then(resp => {
      return resp;
    })
    .catch(error => {
      console.log(JSON.stringify(error));
      return error;
    });
};
export {
  GetRequest,
  PostRequest,
  PutRequest,
  DeleteRequest,
  DeleteCartRequest,
  MultipartRequest,
};
