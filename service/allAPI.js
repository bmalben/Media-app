import { commonAPI } from './commonAPI'
import { server_url } from './server_url'



// upload a video

export const uploadVideoAPI=async(video)=>{
    return await commonAPI("POST",`${server_url}/allVideos`,video)
}

// get all video

export const getAlluploadedVideosAPI=async()=>{
    return await commonAPI("GET",`${server_url}/allVideos`,"")
}

// get a video

export const getAVideoAPI=async(id)=>{
    return await commonAPI("GET",`${server_url}/allVideos/${id}`,"")
}

// delete a video

export const deleteVideoAPI=async(id)=>{
    return await commonAPI("DELETE",`${server_url}/allVideos/${id}`,{})
}

// Add History

export const addHistoryAPI=async(video)=>{
    return await commonAPI("POST",`${server_url}/history`,video)
}

// get History

export const getHistoryAPI=async()=>{
    return await commonAPI("GET",`${server_url}/history`,"")
}

// delete a history

export const deleteHistoryAPI=async(id)=>{
    return await commonAPI("DELETE",`${server_url}/history/${id}`,{})
}

// Add Category

export const addCategoryAPI=async(category)=>{
    return await commonAPI("POST",`${server_url}/category`,category)
}

// get category

export const getCategoryAPI=async()=>{
    return await commonAPI("GET",`${server_url}/category`,"")
}

// delete a category

export const deleteCategoryAPI=async(id)=>{
    return await commonAPI("DELETE",`${server_url}/category/${id}`,{})
}

// update Category

export const updateCategoryAPI=async(id,categoryDetials)=>{
    return await commonAPI("PUT",`${server_url}/category/${id}`,categoryDetials)
}