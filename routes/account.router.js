function AccountRouter() {
    this.router = express.Router();
    this.router.get('/account', this.getAccount);
    this.router.post('/account', this.postAccount);
}

module.exports = AccountRouter;