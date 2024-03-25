export const useDownloadClick = (data: { src: string; label: string }) => () => {
  fetch(data.src)
    .then((response) => {
      console.log(response)
      return response.blob()
    })
    .then((blob) => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const fileName = data.src.split('/').pop();
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName || '';
      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error("Error fetching the file:", error);
    });
};
