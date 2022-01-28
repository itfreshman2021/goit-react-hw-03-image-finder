import axios from 'axios';

export async function getImagesWithAxios(config) {
  try {
    const response = await axios(config);
    const dataImagesArreys = response.data.hits;
    const dataImages = dataImagesArreys.map(({ id, webformatURL, largeImageURL, tags }) => ({
      id,
      webformatURL,
      largeImageURL,
      tags,
    }));

    if (dataImagesArreys.length === 0) {
      alert('Sorry, there are no images matching your search query. Please try again.');
      return;
    }

    if (config.params.page > response.data.totalHits / 40 && response.data.totalHits) {
      alert("We're sorry, but you've reached the end of search results.");
      return;
    }

    return dataImages;
  } catch (error) {
    console.log(error);
  }
}
