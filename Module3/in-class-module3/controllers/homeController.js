// This controller handles general routes

exports.renderHome = (req, res) => {
    // res.send("Hello world!...");
    res.render("index");
  };

  exports.renderAbout = (req, res) => {
    res.render("about");
  };

  exports.renderData = (req, res) => {
    const test = {
      title: "Test",
      items: ["one", "two", "three"]
    };
    res.render("data", { model: test });
  };