function selectCreateMarkUp(arr) {
    return arr
      .map(({ id, name }) => `<option value="${id}">${name}</option>`)
      .join('');
  }
  
  function createMarkUp(arr) {
    const { url, width, height } = arr[0];
    const { name, description, temperament } = arr[0].breeds[0];
  
    return `
      <img class="cat-info-img" src="${url}" alt="${name}" width="${width}", height="${height}">
      <div><h2>${name}</h2>
      <p>${description}</p>
      <p><span>Temperament:</span> ${temperament}</p></div>`;
  }
  
  export { selectCreateMarkUp, createMarkUp };