exports.getHome = (req, res) => {
    res.json({ 
      message: "Welcome to your Express Boilerplate!",
      author: "Your Name",
      version: "1.0.0"
    });
  };
  