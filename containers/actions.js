
export const _pressHandler = (link) => {
  console.log(link);
  SafariView.isAvailable()
    .then(SafariView.show({
      url: link,
      readerMode: true
    }))
    .catch(error => {
      // Fallback WebView code for iOS 8 and earlier
    });
  }
