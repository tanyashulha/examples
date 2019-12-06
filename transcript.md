Intro:

Database is a collection of related information that can be stored in different ways.
Computers are great at keeping track of large amounts of information.
Database Management Systems (DBMS) is a special software program that helps users create & maintain a database.
We can interact with a Database Management Systems to Create, Read, Update, and Delete information.

There are two types of databases:
1) Relational Databases (SQL);
2) Non-Relational Databases (No SQL).

The main difference between them are: relation - Organize data into one or more tables (Each table has columns & rows, A unique key identifies each row) and Non-Relational Databases (No SQL) - Organize data in anything but a traditional table (Key-Value stores, Documents (JSON, XML), Graphs, Flexible tables).


Slides:

In more detail I want to tell and relational database – SQL.
SQL is a Structured Query Language used for interacting with a RDBMS.
RDBMS (Relational Database Management Systems) - helps users create & maintain a relational database.

It is actually a hybrid language. It’s basically 4 types of languages in one.
•	Data Query Language (DQL) : Used to query the database for information. Can get information that’s already stored in the database.
•	Data Definition Language (DDL) : Used for defining database schemas.
•	Data Control Language (DCL) : Used for controlling access to data in the database. Handles user & permissions management.
•	Data Manipulation Language (DML) : Used for inserting, updating, and deleting data from the database.
In short, we can do the following things with SQL:
•	Create, Read, Update, and Delete data
•	Create & Manage databases
•	Design & Create database tables
•	Perform administrative tasks (security, user management, import/export, etc)

A Query is a set of instructions given to the RDMBS (written in SQL) that tell the RDMBS what information a developer wants it to retrieve for the developer.

Create and view a table called “student”. With our table we can do the following: 
•  Delete a table;
•  Add a table;
•  Delete a column;
•  Delete a row.

We can also insert the necessary data into the table using this command: Insert from student values (our values).

If you want to see the final table, use the command: Select * from student.

At this stage the question arises: What if we don’t know a student’s major?
We see that there are NULL in unfilled cells.

If we want to get rid of this, set the default value. We see that instead NULL is now UNDECADED.
If you need to remove unnecessary rows, use the command: Delete from … where … .

Often we need to change the old values for new values. Then we use this command. Here we can apply various requests. 

Further we consider basic queries. For example, select name from the table. And we see, column of names. 

There is still very good quality – sorting with ORDER BY. 
If you want to sort the entries in descending order, you can use the DESC keyword.
The SQL LIMIT statement displays the specified number of rows from a table.


We can also create our own specific query for data sampling.
With command where … in, we can specify multiple entries. 

