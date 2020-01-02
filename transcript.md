Hi. I want talking about Database SQL. And first of all I would like to start with basic concepts.
The first question: What is it Database? Database is a collection of related information that can
be stored in different ways. Computers are great at keeping track of large amounts of
information. Database Management Systems is a special software program that helps users create
and maintain database. We can interact a Database Management Systems to Create, Read,
Update and Delete information.

There are two types of Database: Relation and Non-Relation. The main difference between them
are: Relation database is organize data into one of more tables (each tables has columns and rows
and a unique key identify each row). Non-Relation database is organize data in anything but a
traditional table (key-value stores, Documents(JSON, XML), Graphs, Flexible Tables).

In more detail I want talking about relation database. And the second question: What is SQL?
SQL is a structured query language used for interacting with Relational Database Management
Systems which helps users create and maintain a relational database.

And the third question: What is query?
Now we look at an example, where we create a table called ‘student’. Main parameters of this
table are student_id, name and major. Student_id set the Primary key. Primary key is parameter
that set to uniquely identify a particular record. Name and major, as you can note, have
VARCHAR parameter. Varchar is a variable length data type. And you can see the result at the
bottom.

And here the question appears: What can we do with our table? We can delete a table using
command DROP TABLE our table (student), add a column to table using command Alter table
student Add column (gpa) Decimal (3 – precision is number of digits and 2 – scale is the number
of decimal places. Must be less than or equal to precision), Delete a column using Alter table
student Drop gpa and Delete a row using Delete from student where (indicate which row)
student_id = 1.

If you want to add data in table you need to use command Insert Into student Values(and in
brackets the necessary values) . We added three rows and can result with command Select *
From student.

And next question: What if we don’t know a student’s major? We add fourth row with
student_id and name, but without major. And we see NULL in the column major. We can set a
default value to fix this.

If there is no subject in the field instead of NULL we have Undecided.

What can we do with our table student else?
We can delete several rows indicatating student_id. This example show removal of row on 4 to
8.
Following example demonstrate how to change value. Here we change Biology on Bio.
This examples show that we can to change any major indicating any values after WHERE. First
example we set major “Graph design” where stud_id = 9 and second example, where we set
major ‘mis’ where major ‘soc’ or ‘graph des’.

Now we consider basic queries. Query ‘Select name from tutorial.students’ show us list of
names. Next query show list of names and sort this list in alphabetical order using keywordOrder by. If we add keyword Desc after Order by we can get list of data returned in descending
order.

Consider following example. Select all values from table student and order by major (we note
that column ‘major’ sort in alphabetical order). If we have identical major (in our example two
identical value - MIS), so sorting occur between this values by student_id DESC (see on
example student_id – 9 major MIS and student_id 2 – major MIS).

Next example show how to get first two elements using operator LIMIT.

Also we can get values from table using operator Where (as show in example). We get values
where major ‘MIS ’ and name ‘Julia’.

And last example show using operator Where In that show us values where several values in the
field ‘name’.

Thanks for attention! Have a good day