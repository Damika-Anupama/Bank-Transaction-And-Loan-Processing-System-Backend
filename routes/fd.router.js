function fdRouter() {
  const router = express.Router();
  router.get("/", (req, res) => {
    res.json({ message: "ok" });
  });
}

module.exports = fdRouter;