# capstone-project-9900h16aareyouhungry
capstone-project-9900h16aareyouhungry created by GitHub Classroom

Note: The swagger library is not suitable for Django 4. x and django-restframework>=3.11, so we need to configure as follows:
Django              3.1
djangorestframework 3.12.0

We also need to install a library 
`pip install drf-yasg2`
`pip install drf-writable-nested`
`pip install django-filter`

If there is something wrong like this:

`no such column: xxxx`  

![751687303147_ pic](https://github.com/unsw-cse-comp3900-9900-23T2/capstone-project-9900h16aareyouhungry/assets/16446059/c096eddf-9fa2-42cd-8310-93dda8c77ce1)

Please do the following commands:
1. `rm db.sqlite3`  
2. `python manage.py makemigrations`  
3. `python manage.py migrate --run-syncdb`  
4. `python manage.py createsuperuser `

## 1. Backend Configuration
(a)Install some required Python libraries:  
`pip install django==3.1`  

`pip install djangorestframework==3.12.0`  

`pip install django-cors-headers`

(b)Update the model:  
`python manage.py makemigrations`

(c)Migrate settings:  
`python manage.py migrate`

(d)Create superuser
`python manage.py createsuperuser`

(e)Run server:  
`python manage.py runserver`

read backend in Swagger: http://127.0.0.1:8000/doc/

## 2.Fontend Configuration
(a) Enter frontend folder:  
`cd frontend`
    
(b) Install npm package:  
`npm install`

(d) Add other libraries (updating):  
`npm install react-router-dom`

(d) Start server:  
`npm start`

