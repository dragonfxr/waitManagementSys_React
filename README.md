# Wait Management System for cafe/restaurants
created by GitHub Classroom

Note: The swagger library is not suitable for Django 4. x and django-restframework>=3.11, so we need to configure as follows:
Django              3.2
djangorestframework 3.12.0

# How to run/contribute
## 1. Backend Configuration
(a)Install some required Python libraries:  
`pip install django==3.2`  

`pip install djangorestframework==3.12.0`  

`pip install django-cors-headers`  

`pip install drf-yasg2`  

`pip install drf-writable-nested`  

`pip install django-filter` (installing this step would update django version to 4.0, we need to install django==3.2 again and ignore error)  

so do the following
`pip install django==3.2`  

(b)Update the model:  
`cd backend`

`python manage.py makemigrations` or
`python3 manage.py makemigrations`

(c)Migrate settings:  
`python manage.py migrate` or
`python3 manage.py migrate`

(d)Create superuser
`python manage.py createsuperuser` or
`python3 manage.py createsuperuser`

Then just follow the instruction provided by the command line to create a user.

(e)Run server:  
`python manage.py runserver` or
`python3 manage.py runserver`

read backend doc in Swagger: http://127.0.0.1:8000/doc/

## 2.Fontend Configuration
(a) cd frontend folder:  
`cd frontend`
    
(b) Install npm package:  
`npm install`

(d) Add other libraries (updating):  
`npm install react-router-dom`  

`npm install antd` (2023.06.26)  

(d) Start frontend:  
`npm start`

