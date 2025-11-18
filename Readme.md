Frontend code repository: https://github.com/Damika-Anupama/Bank-Transaction-And-Loan-Processing-System-Frontend

<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Damika-Anupama/Bank-Transaction-And-Loan-Processing-System-Backend/">
    <img src="assets/logo.png" alt="Logo" width="250" height="100">
  </a>

  <h3 align="center">Bank Transaction And Loan Processing System - Backend</h3>

  <p align="center">
    A full-stack banking application backend with RESTful API services for transaction and loan management
    <br />
    <a href="https://github.com/Damika-Anupama/Bank-Transaction-And-Loan-Processing-System-Backend"><strong>Explore the repository »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Damika-Anupama/Bank-Transaction-And-Loan-Processing-System-Backend/issues">Report Bug</a>
    ·
    <a href="https://github.com/Damika-Anupama/Bank-Transaction-And-Loan-Processing-System-Backend/pulls">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
<div align = center>
  <img src="assets/logo1.png" alt="Logo" width="400" height="350" style = "margin: 50px">
</div>
<br>
This is a comprehensive banking management system backend built with Node.js and Express. The API provides secure RESTful endpoints for transaction processing, loan management, fixed deposits, and user authentication with JWT tokens. This repository contains the Backend of the Bank Transaction And Loan Processing System. The frontend of this application can be found by following this <a href="https://github.com/Damika-Anupama/Bank-Transaction-And-Loan-Processing-System-Frontend">link</a>.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With
<br>

- [![JavaScript](https://img.shields.io/badge/JavaScript-standard-brightgreen.svg?logo=javascript)](https://standardjs.com)

- [![Express.js](https://img.shields.io/badge/Express.js-4.x-brightgreen.svg?logo=node.js)](https://expressjs.com)

- [![Node.js](https://img.shields.io/badge/Node.js-14.x-brightgreen.svg?logo=node.js)](https://nodejs.org)

- [![MySQL](https://img.shields.io/badge/MySQL-8.x-brightgreen.svg?logo=mysql)](https://www.mysql.com/)

- [![npm](https://img.shields.io/badge/npm-6.x-brightgreen.svg?logo=npm)](https://www.npmjs.com/)

- [![Git](https://img.shields.io/badge/Git-2.x-brightgreen.svg?logo=git)](https://git-scm.com/)

- [![jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-8.x-brightgreen.svg?logo=npm)](https://www.npmjs.com/package/jsonwebtoken)

- [![Docker](https://img.shields.io/badge/Docker-19.x-brightgreen.svg?logo=docker)](https://www.docker.com/)

- [![Postman](https://img.shields.io/badge/Postman-7.x-brightgreen.svg?logo=postman)](https://www.postman.com/)

- [![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-1.x-brightgreen.svg?logo=visual-studio-code)](https://code.visualstudio.com/)


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started


### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```
* docker
  > <a href="https://docs.docker.com/docker-for-mac/install/">for macOS</a> |
  <a href="https://docs.docker.com/docker-for-windows/install/">for Windows</a> |
  <a href="https://docs.docker.com/engine/install/ubuntu/">for Ubuntu</a>

* Postman <a href="https://www.postman.com/">link</a>
### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Damika-Anupama/Bank-Transaction-And-Loan-Processing-System-Backend.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

### Step 1: Database Setup with Docker (Recommended)

This project uses MySQL 8.x database. We recommend using Docker for easy setup.

#### Option A: Using Docker (Recommended)

1. **Start Docker Desktop** (if on Windows/Mac) or ensure Docker daemon is running

2. **Create and run MySQL container:**
   ```sh
   docker run --name bank-mysql -e MYSQL_ROOT_PASSWORD=1234 -e MYSQL_DATABASE=bank -p 3306:3306 -d mysql:8.0
   ```

3. **Wait for MySQL to initialize (about 30 seconds):**
   ```sh
   docker exec bank-mysql mysqladmin ping -h localhost -u root -p1234
   ```

4. **Import the database dump:**
   ```sh
   # From the Backend directory
   docker exec -i bank-mysql mysql -uroot -p1234 bank < assets/Data/Dump20240216.sql
   ```

5. **Verify the import:**
   ```sh
   docker exec bank-mysql mysql -uroot -p1234 bank -e "SHOW TABLES;"
   ```

   You should see 13 tables: account, branch, employee, fixed_deposit, loan_basic_detail, loan_installment, manager, normal_loan, online_portal_loan, saving_account, transfer, user, withdrawal

#### Option B: Using Local MySQL Installation

If you have MySQL installed locally:

1. **Create the database:**
   ```sql
   CREATE DATABASE bank;
   ```

2. **Import the dump:**
   ```sh
   mysql -u root -p bank < assets/Data/Dump20240216.sql
   ```

3. **Update database credentials** in `config/config.js`:
   ```javascript
   const config = {
       db: {
         host: "localhost",
         user: "your_username",
         password: "your_password",
         database: "bank"
       }
   };
   ```

### Step 2: Start the Backend Server

1. **Install dependencies** (if not already done):
   ```sh
   npm install
   ```

2. **Start the server:**
   ```sh
   npm start
   ```

3. **Verify the server is running:**
   - You should see: `Bank app listening at http://localhost:3000`
   - The API will be available at: `http://localhost:3000/api/v1/`

### Step 3: Test Login Credentials

The database dump includes pre-configured test accounts for all three user types:

#### Customer Account
- **Email:** damikaanupama@gmail.com
- **Password:** 1234
- **Access:** Account management, transfers, withdrawals, online loan applications, fixed deposits

#### Employee Account
- **Email:** nimalnimal@gmail.com
- **Password:** 4567
- **Access:** Register new customers, create manual loans, process withdrawals

#### Manager Account
- **Email:** jkesoni@alexa.com
- **Password:** Jewelle
- **Access:** Approve/reject loans, add employees, view branch statistics

### Database Contents

The imported database includes:
- **39 Users** (Customers, Employees, Managers)
- **5 Branches**
- **30 Accounts** (Personal and Organization)
- **15 Saving Accounts** (Child, Teen, Adult, Senior types)
- **35 Loans** (Personal and Business)
- **9 Fixed Deposits**
- **29 Transfers**
- **20 Withdrawals**

### API Endpoints

Base URL: `http://localhost:3000/api/v1/`

- `/user` - User authentication and management
- `/employee` - Employee operations
- `/manager` - Manager operations
- `/account` - Account management
- `/loan` - Loan operations
- `/fd` - Fixed deposit operations
- `/branch` - Branch management
- `/transaction` - Transaction history

### Stopping the Application

**Stop the server:** Press `Ctrl+C` in the terminal

**Stop and remove Docker container:**
```sh
docker stop bank-mysql
docker rm bank-mysql
```

**Stop but keep container (to restart later):**
```sh
docker stop bank-mysql
# To restart: docker start bank-mysql
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/customBranch`)
3. Commit your Changes (`git commit -m 'Add some item'`)
4. Push to the Branch (`git push origin feature/customBranch`)
5. Open a Pull Request
6. Buying a Coffee <br>
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-black?style=for-the-badge&logo=buy-me-a-coffee)](https://www.buymeacoffee.com/damiBauY)


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
* [Malven's Grid Cheatsheet](https://grid.malven.co/)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [Node Icons](https://Node-icons.github.io/Node-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/Damika-Anupama/Bank-Transaction-And-Loan-Processing-System-Backend.svg?style=for-the-badge
[contributors-url]: https://github.com/Damika-Anupama/Bank-Transaction-And-Loan-Processing-System-Backend/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Damika-Anupama/Bank-Transaction-And-Loan-Processing-System-Backend.svg?style=for-the-badge
[forks-url]: https://github.com/Damika-Anupama/Bank-Transaction-And-Loan-Processing-System-Backend/network/members
[stars-shield]: https://img.shields.io/github/stars/Damika-Anupama/Bank-Transaction-And-Loan-Processing-System-Backend.svg?style=for-the-badge
[stars-url]: https://github.com/Damika-Anupama/Bank-Transaction-And-Loan-Processing-System-Backend/stargazers
[issues-shield]: https://img.shields.io/github/issues/Damika-Anupama/Bank-Transaction-And-Loan-Processing-System-Backend.svg?style=for-the-badge
[issues-url]: https://github.com/Damika-Anupama/Bank-Transaction-And-Loan-Processing-System-Backend/issues
[license-shield]: https://img.shields.io/github/license/Damika-Anupama/Bank-Transaction-And-Loan-Processing-System-Backend.svg?style=for-the-badge
[license-url]: https://github.com/Damika-Anupama/Bank-Transaction-And-Loan-Processing-System-Backend/LICENSE
