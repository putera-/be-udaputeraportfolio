-- user -> for administration / login
-- user_detail
-- skills -> list kemampuan
-- educations -> riwayat pendidikan

-- projects -> riwayat pekerjaan
-- project_images -> relation with project


-- user -> for administration / login
id (INT, PRIMARY KEY AUTO_INCREMENT)
email (VARCHAR(255), UNIQUE)
password (VARCHAR(255))


-- user_detail
firstname (VARCHAR(255), NOT NULL)
lastname (VARCHAR(255), NOT NULL)
email (VARCHAR(255), NOT NULL)
bio (TEXT)
github (VARCHAR(255))
gitlab (VARCHAR(255))
linkedin (VARCHAR(255))
instagram (VARCHAR(255))
facebook (VARCHAR(255))
twitter (VARCHAR(255))


-- skills -> list kemampuan
id (INT, PRIMARY KEY AUTO INCREMENT)
title (VARCHAR(255), NOT NULL)
category_id (INT, NOT NULL)
CONSTRAINT fk_skill_category FOREIGN KEY (category_id) REFERENCES skill_categories(id)

-- skill_categories -> relation with skill
-- backend, front end, libraries, deployment
id (INT, PRIMARY KEY AUTO INCREMENT)
title (VARCHAR(255), NOT NULL)

-- educations -> riwayat pendidikan
id (INT, PRIMARY KEY AUTO_INCREMENT)
name (VARCHAR(255), NOT NULL)
major (VARCHAR(255), NOT NULL)
degree (VARCHAR(255))
graduation_year (INT)

-- projects -> riwayat projects
id (INT, PRIMARY KEY AUTO_INCREMENT)
title (VARCHAR(255), NOT NULL)
description (TEXT)
url (VARCHAR(255))
github (VARCHAR(255))
gitlab (VARCHAR(255))
start_date (DATE, NOT NULL)
end_date (DATE)
INDEX (title)
INDEX (description)

-- project_images -> relation with project
id (INT, PRIMARY KEY AUTO_INCREMENT)
project_id (INT, NOT NULL)
url (VARCHAR(255), NOT NULL)
CONSTRAIN fk_project_images FOREIGN KEY (project_id) REFERENCES project(id)
