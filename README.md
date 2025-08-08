## **Donate Cart** 🛒💙

A modern donation platform inspired by **[DonateKart.com](https://donatekart.com/)** — enabling individuals and organizations to create donation campaigns, manage inventory, and connect donors directly with verified causes.

---

## **🚀 Features**

* **Campaign Creation** – Easily set up donation campaigns with title, description, images, and required items.
* **Live Inventory Management** – Track available stock and automatically update quantities after each donation.
* **Multiple Payment Options** – Supports Razorpay, Paytm, and PhonePe for seamless transactions.
* **Real-Time Updates** – Donors can see campaign progress instantly.
* **Campaign Approval System** – Admin can approve or reject campaigns before they go live.
* **User Authentication** – Secure sign-up and login using JWT authentication.
* **Mobile-Responsive Design** – Fully optimized for desktop, tablet, and mobile devices.
* **Secure Backend** – Built with Node.js, Express, MySQL, and Sequelize ORM.

---

## **🛠 Tech Stack**

**Frontend**

* HTML5 (UI Components)
* CSS / (Styling)
* JavaScript

**Backend**


* Node.js + Express.js (API Server)
* MySQL + Sequelize ORM (Database)
* Axios
  

**Payments**

* Razorpay API


**Other Tools**

* JWT (Authentication)
* AWS S3 (Image/File Storage)
* Git & GitHub (Version Control)

---

## **📦 Installation & Setup**

1. **Clone the Repository**

   ```bash
   git clone https://github.com/anujkumar-1/Donate-cart.git
   cd Donate-cart
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root folder and add:

   ```env
   DB_HOST=your_mysql_host
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=donate_cart_db
   RAZORPAY_KEY=your_razorpay_key
   RAZORPAY_SECRET=your_razorpay_secret
   PAYTM_MERCHANT_ID=your_paytm_merchant_id
   PHONEPE_MERCHANT_ID=your_phonepe_merchant_id
   JWT_SECRET=your_jwt_secret
   AWS_ACCESS_KEY=your_aws_access_key
   AWS_SECRET_KEY=your_aws_secret_key
   ```

4. **Run Database Migrations**

   ```bash
   npx sequelize db:migrate
   ```

5. **Start the App**

   ```bash
   npm start
   ```

   or for development:

   ```bash
   npm run dev
   ```

---

## **📸 Screenshots**

*(Add screenshots or GIFs of your app here)*

---

## **🤝 Contributing**

We welcome contributions!

1. Fork the repo
2. Create your feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to branch (`git push origin feature-name`)
5. Open a Pull Request

---

## **📜 License**

This project is licensed under the **MIT License** — feel free to use and modify it.

---

## **📬 Contact**

For any queries or collaboration opportunities:
📧 **[anuj39263@gmail.com](mailto:anuj39263@gmail.com)**
🔗 [GitHub Profile](https://github.com/anujkumar-1)

---

If you want, I can **enhance this README** with a **flow diagram** showing how donations move from donors to campaigns in your app, which will make it more professional and appealing on GitHub.
Do you want me to add that?
