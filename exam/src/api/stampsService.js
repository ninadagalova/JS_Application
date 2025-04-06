import { get, post, put, del } from './requester.js';
import { baseStampsUrl} from '../constants.js';

async function getAll() {
    return await get(`${baseStampsUrl}?sortBy=_createdOn%20desc`);
}

async function getById(stampId) {
    return await get(`${baseStampsUrl}/${stampId}`);
}


async function create(stampData) {
    const { 'name-input': name, 'image-url-input': imageUrl, 'year-input': year , 'more-info-textarea': learnMore , ...otherData } = stampData;
    return await post(baseStampsUrl, { name, imageUrl, year , learnMore , ...otherData });
}

async function update(stampId, stampData) {
    const {  'name-input':name, 'image-url-input': imageUrl, 'year-input':year , 'more-info-textarea': learnMore,  ...otherData} = stampData;
    return await put(`${baseStampsUrl}/${stampId}`, { name, imageUrl,year, learnMore ,  ...otherData});
}

async function deleteById(stampId) {
    await del(`${baseStampsUrl}/${stampId}`);
}
async function getLikes(stampId){
    return await get(`http://localhost:3030/data/likes?where=stampsId%3D%22${stampId}%22&distinct=_ownerId&count`);
}

async function  isLiked(stampId, userId) {
    return await get(
      `http://localhost:3030/data/likes?where=stampsId%3D%22${stampId}%22%20and%20_ownerId%3D%22${userId}%22&count`
    );
  }
  async function onLike(stampsId) {
    return await post(`http://localhost:3030/data/likes`, {stampsId});
  }

const stampsService = { getAll, getById, create, update, deleteById, getLikes, isLiked, onLike };
export default stampsService;