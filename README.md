# Wait Management System for cafe/restaurants
created by GitHub Classroom

# Project Description:
The project is a cutting-edge waiting management system tailored for the restaurant industry, designed to enhance service efficiency, reduce labor costs, and increase customer satisfaction. It offers a new dining experience by allowing customers to select tables, browse menus, and receive personalized dish recommendations through a self-service terminal. Customers can order directly, request waiter assistance, and pay without waiting, streamlining the dining process. For restaurants, it optimizes order management, improves efficiency, provides valuable data insights for refining operations, and reduces miscommunication in the kitchen. The system stands out for its user-friendly interface, efficient service, and continuous innovation, aiming to help the restaurant industry.

## UI Overview:
Here's a screenshot of the customer interface. Customers can add dishes to the cart or change quantities by clicking on the buttons that each dish belongs to.

![image](https://github.com/dragonfxr/waitManagementSys_React/assets/112178497/4ec0ee4b-99ec-4009-850e-511b12e4647d)

Here's a screenshot of the manager interface.

![image](https://github.com/dragonfxr/waitManagementSys_React/assets/112178497/68059893-18d7-4c4c-a5f5-4f8a5cef8316)

We also have kitchen interface and waiter interface.

## Project Features:
- Offers a new dining experience with self-service table selection and menu browsing.
- Allows customers to order food, get their bill, and pay without waiter assistance, saving time.
- Optimizes order management and delivery processes for restaurants.
- Improves kitchen staff efficiency by providing detailed order information, reducing miscommunication.
- Features a user-friendly interface, popular menu recommendations, and efficient order management.

## Project Features:
- HTML/CSS
- JavaScript
- Python
- React
- React Router
- Ant Design
- Django
- Django Rest Framework
- Django-scols-headers
- Drf-yasg2
- Drf-writable nested
- Django-filter
  
# Installation and Running

Note: The swagger library is not suitable for Django 4. x and django-restframework>=3.11, so we need to configure as follows:
Django              3.2
djangorestframework 3.12.0

## 1. Backend Configuration

**Assuming python has been installed:**

**(a)Install some required Python libraries:**  
`pip install django==3.2`  

`pip install djangorestframework==3.12.0`  

`pip install django-cors-headers`  

`pip install drf-yasg2`  

`pip install drf-writable-nested`  

`pip install django-filter` (installing this step would update django version to 4.0, we need to install django==3.2 again and ignore error)  

so do the following
`pip install django==3.2`  

**(b)Update the model:**  
`cd backend`

`python manage.py makemigrations` or
`python3 manage.py makemigrations`

**(c)Migrate settings:**  

`python manage.py migrate` or
`python3 manage.py migrate`

**(d)Create superuser**

`python manage.py createsuperuser` or
`python3 manage.py createsuperuser`

Then just follow the instruction provided by the command line to create a user.

**(e)Run server:**  

`python manage.py runserver` or
`python3 manage.py runserver`

read backend doc in Swagger: http://127.0.0.1:8000/doc/

## 2.Fontend Configuration
**(a) cd frontend folder:**  
`cd frontend`
    
**(b) Install npm package:**  
`npm install`

**(c) Add other libraries (updating):**  
`npm install react-router-dom`  

`npm install antd` (2023.06.26)  

**(d) Start frontend:**  
`npm start`


# How to contribute

The project is still at a starting stage, so contributions are always welcome.  

**Fork and clone the repo**

`https://github.com/dragonfxr/waitManagementSys_React.git`

**Create a new branch**

`git checkout -b name-of-your-branch`

**Modify**

Implemented your changes and improve or fix

**Commit and push your changes**

`git commit -m "Yeah"`
`git push name-of-your-branch`

**Open a pull request**

Navigate to the original project repository on GitHub and submit a pull request. Ensure you have detailed explanations of the change you've made.

Thanks in advance for your help and contribution!

## Contact Me
If you have more advice on the project or you want to give a new developer like me some hints, please contact me.

- Email:russell.feng.au@gmail.com

I'm always open to feedback and collaboration. Looking forward to hearing and learning from you!
