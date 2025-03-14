const getLocalImage = (imageName: string) => {
    const images: Record<string, any> = {
      "tv.png": require("../assets/products/tv.png"),
      "laptop.png": require("../assets/products/laptop.png"),
      "frog.jpg": require("../assets/products/frog.jpg"),
    };
  
    return images[imageName] 
  };
  