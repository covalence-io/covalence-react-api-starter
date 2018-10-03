/*
use blog;
drop table AccessTokens;
drop table Blogs;
drop table Users;
*/

create table Users (
	id int not null auto_increment primary key,
    email varchar(100) not null,
    UNIQUE KEY UK_Users_Email (email),
    password text,
    firstname varchar(100),
    lastname varchar(100),
    role varchar(25) default 'guest',
    __created datetime default current_timestamp
);

create table Blogs (
	id int not null auto_increment primary key,
    authorid int not null,
    INDEX IX_Users_Blogs (authorid),
	FOREIGN KEY (authorid)
		REFERENCES Users(id),
	title varchar(255) not null,
    body text not null,
    publishedts datetime,
    __created datetime default current_timestamp
);

create table AccessTokens (
	id int not null auto_increment primary key,
    userid int not null,
    INDEX IX_Users_AccessTokens (userid),
    FOREIGN KEY (userid)
		REFERENCES Users(id),
	token text,
    expires datetime,
    __created datetime default current_timestamp
);

insert into users (email, role, password, firstname, lastname)
values ('test@test.com', 'admin', '$2b$10$qZa6Uxx948juxiJ1GJHbnOA7oPAk.eV5Rc0EjtUXsXEmLblKumX2a', 'Luke', 'Codewalker');

set @userid = last_insert_id();

insert into blogs (authorid, title, publishedts, body)
values(@userid, 'Covalence is Life!', current_timestamp ,"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.");

insert into blogs (authorid, title, publishedts, body)
values(@userid, 'A New Code', current_timestamp ,"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.");

insert into blogs (authorid, title, publishedts, body)
values(@userid, 'The Codewalker Strikes Back', current_timestamp ,"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.");

insert into blogs (authorid, title, publishedts, body)
values(@userid, 'Return of the Codewalker', current_timestamp ,"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.");
